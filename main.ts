/// <reference types="./@types/plugin" />

function isVariableAlias(value: VariableValue): value is VariableAlias {
  return typeof value === 'object' && ('type' in value)
}

function isRemoteAlias(alias: VariableAlias): boolean {
  return /^VariableID:[0-9a-f]{40}\/\d+:\d+$/.test(alias.id)
}

function serializeCollection(collection: VariableCollection): Plugin.Collection {
  return {
    id: collection.id,
    name: collection.name,
    hiddenFromPublishing: collection.hiddenFromPublishing,
    key: collection.key,
    modes: collection.modes.map(mode => ({
      id: mode.modeId,
      name: mode.name,
    })),
    variableIds: collection.variableIds,
    defaultModeId: collection.defaultModeId,
  }
}

function serializeVariable(variable: Variable): Plugin.Variable {
  return {
    id: variable.id,
    name: variable.name,
    description: variable.description,
    key: variable.key,
    remote: variable.remote,
    scopes: variable.scopes,
    type: variable.resolvedType,
    valuesByMode: variable.valuesByMode,
    hiddenFromPublishing: variable.hiddenFromPublishing,
    variableCollectionId: variable.variableCollectionId,
  }
}

async function getVariableCollection(id: string) {
  const variable = await figma.variables.getVariableCollectionByIdAsync(id)

  if (!variable) {
    throw new Error(`Collection '${id}' not found`)
  }

  return variable
}

async function getVariable(id: string) {
  const variable = await figma.variables.getVariableByIdAsync(id)

  if (!variable) {
    throw new Error(`Variable '${id}' not found`)
  }

  return variable
}

async function getData(): Promise<Plugin.Data> {
  const collections: Record<string, VariableCollection> = {}
  const variables = await figma.variables.getLocalVariablesAsync()

  for (const variable of variables) {
    for (const modeId in variable.valuesByMode) {
      const value = variable.valuesByMode[modeId]

      // Variables may have aliases that refer to variables coming from remote
      // libraries, so we need add these variables to the list.
      if (isVariableAlias(value) && isRemoteAlias(value)) {
        variables.push(await getVariable(value.id))
      }
    }

    if (variable.variableCollectionId in collections) {
      continue
    }

    const collection = await getVariableCollection(variable.variableCollectionId)
    collections[collection.id] = collection
  }

  return {
    collections: Object.values(collections).map(serializeCollection),
    variables: variables.map(serializeVariable),
  }
}

figma.ui.onmessage = async (message) => {
  switch (message.type) {
    case 'get-data': {
      const data = await getData()
      figma.ui.postMessage({ type: 'data', data })
      break
    }
    default:
  }
}

figma.showUI(__html__, {
  themeColors: true,
  width: 500,
  height: 700,
})
