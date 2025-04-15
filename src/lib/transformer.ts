import type { SettingsSchema } from './schemas'
import * as _ from 'radashi'

function isAlias(value: VariableValue): value is VariableAlias {
  return typeof value === 'object' && ('type' in value)
}

export class Transformer {
  private hiddenVariableIds: Set<string>

  protected modes: Record<string, string>

  constructor(
    private data: Plugin.Data,
    private settings: SettingsSchema = {
      excludeHidden: false,
      resolveAliases: false,
    },
  ) {
    this.modes = {}

    this.hiddenVariableIds = new Set<string>()
    for (const variable of data.variables) {
      if (variable.hiddenFromPublishing) {
        this.hiddenVariableIds.add(variable.id)
        continue
      }
    }
  }

  private getVariableById(id: string) {
    const variable = this.data.variables.find(item => item.id === id)

    if (!variable) {
      throw new Error(`Variable '${id}' not found`)
    }

    return variable
  }

  private getCollectionById(id: string) {
    const collection = this.data.collections.find(item => item.id === id)

    if (!collection) {
      throw new Error(`Collection '${id}' not found`)
    }

    return collection
  }

  private async resolveAlias(alias: VariableAlias, modeId: string, hiddenOnly = false): Promise<VariableValue> {
    const variable = this.getVariableById(alias.id)
    const collection = this.getCollectionById(variable.variableCollectionId)
    const modeName = this.modes[modeId]

    if (hiddenOnly && !variable.hiddenFromPublishing) {
      return alias
    }

    const targetModeId = collection.modes.find(item => this.modes[item.id] === modeName)?.id || collection.defaultModeId
    const value = variable.valuesByMode[targetModeId]

    if (isAlias(value)) {
      return this.resolveAlias(value, modeId, hiddenOnly)
    }

    return value
  }

  private async resolveVariableValues(variable: Plugin.Variable): Promise<Plugin.Variable['valuesByMode']> {
    const { excludeHidden, resolveAliases } = this.settings

    const valuesByMode: Plugin.Variable['valuesByMode'] = {}

    for (const [modeId, value] of Object.entries(variable.valuesByMode)) {
      if (!(modeId in this.modes)) {
        continue
      }

      if (!excludeHidden && !resolveAliases) {
        valuesByMode[modeId] = value
        continue
      }

      if (isAlias(value)) {
        valuesByMode[modeId] = await this.resolveAlias(value, modeId, !resolveAliases)
        continue
      }

      valuesByMode[modeId] = value
    }

    return valuesByMode
  }

  private registerMode({ id, name }: Plugin.Mode) {
    if (!this.modes[id]) {
      this.modes[id] = _.dash(name)
    }
  }

  async transform() {
    const { excludeHidden } = this.settings

    for (const collection of this.data.collections) {
      for (const mode of collection.modes) {
        this.registerMode(mode)
      }
    }

    let collections = this.data.collections
    let variables = this.data.variables

    if (excludeHidden) {
      collections = collections.filter(item => !item.hiddenFromPublishing)
      variables = variables.filter(item => !item.hiddenFromPublishing)
    }

    variables = await Promise.all(
      variables.map(async variable => ({
        ...variable,
        valuesByMode: await this.resolveVariableValues(variable),
      })),
    )

    // Cleanup collections
    collections = collections.reduce<Plugin.Collection[]>((acc, collection) => {
      const variablesId = variables
        .filter(variable => variable.variableCollectionId === collection.id)
        .map(variable => variable.id)

      if (variablesId.length === 0) {
        return acc
      }

      return acc.concat([{
        ...collection,
        variableIds: variablesId,
      }])
    }, [])

    return {
      collections,
      variables,
    }
  }
}
