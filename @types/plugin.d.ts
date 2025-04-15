declare namespace Plugin {
  export interface Mode {
    id: string
    name: string
  }

  export interface Variable<CollectionId = string> {
    key: string
    id: string
    name: string
    description: string
    remote: boolean
    type: VariableResolvedDataType
    hiddenFromPublishing: boolean
    variableCollectionId: CollectionId
    scopes: VariableScope[]
    valuesByMode: { [modeId: string]: VariableValue }
  }

  export interface Collection<CollectionId = string> {
    key: string
    id: CollectionId
    name: string
    hiddenFromPublishing: boolean
    modes: Mode[]
    variableIds: string[]
    defaultModeId: string
  }

  export interface Settings {
    excludeHidden: boolean
    resolveAliases: boolean
  }

  export interface Data<CollectionId = string> {
    collections: Collection<CollectionId>[]
    variables: Variable<CollectionId>[]
  }
}
