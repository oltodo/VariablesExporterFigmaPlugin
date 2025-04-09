function isEmpty(obj: object) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false
    }
  }

  return true
}

async function resolveValue(mode: string, value: VariableValue) {
  if (typeof value !== 'object' || !('type' in value)) {
    return value
  }

  const variable = await figma.variables.getVariableByIdAsync(value.id)

  if (!variable) {
    throw new Error(`Variable ${value.id} not found`)
  }

  if (variable.valuesByMode[mode]) {
    return resolveValue(mode, variable.valuesByMode[mode])
  }

  const defaultMode = Object.keys(variable.valuesByMode)[0]

  if (!defaultMode) {
    throw new Error(`No modes found for variable '${variable.name}'`)
  }

  const defaultValue = variable.valuesByMode[defaultMode]

  if (!defaultValue) {
    throw new Error(`No values found for mode '${defaultMode}'`)
  }

  return resolveValue(mode, defaultValue)
}

async function getResolvedVariables(collection: VariableCollection) {
  const variables: Plugin.Variable[] = []

  for (const id of collection.variableIds) {
    const variable = await figma.variables.getVariableByIdAsync(id)

    if (!variable || variable.hiddenFromPublishing) {
      continue
    }

    const valuesByMode: Plugin.Variable['valuesByMode'] = {}
    for (const [mode, value] of Object.entries(variable.valuesByMode)) {
      // Looks a variable can be associated to modes that doesn't exist in the collection
      if (collection.modes.some(item => item.modeId === mode)) {
        valuesByMode[mode] = await resolveValue(mode, value)
      }
    }

    if (isEmpty(valuesByMode)) {
      return variables
    }

    variables.push ({
      id: variable.id,
      name: variable.name,
      description: variable.description,
      type: variable.resolvedType,
      hiddenFromPublishing: variable.hiddenFromPublishing,
      valuesByMode,
    })
  }

  return variables
}

async function getData(): Promise<Plugin.Collection[]> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync()

  const data = await Promise.all(
    collections.map(async collection => ({
      id: collection.id,
      name: collection.name,
      modes: collection.modes.map(mode => ({
        id: mode.modeId,
        name: mode.name,
      })),
      variables: await getResolvedVariables(collection),
    })),
  )

  return data.filter(collection => collection.variables.length > 0)
}

figma.ui.onmessage = async (message) => {
  switch (message.type) {
    case 'get-data':{
      const data = await getData()
      figma.ui.postMessage({ type: 'data', data })
      break }
    default:
  }
}

figma.showUI(__html__)
