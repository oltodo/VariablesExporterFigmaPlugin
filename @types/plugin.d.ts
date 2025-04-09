namespace Plugin {
  export interface Mode {
    id: string
    name: string
  }

  export interface Variable {
    id: string
    name: string
    description: string
    type: VariableResolvedDataType
    hiddenFromPublishing: boolean
    valuesByMode: Record<string, Exclude<VariableValue, VariableAlias>>
  }

  export interface Collection {
    id: string
    name: string
    modes: Mode[]
    variables: Variable[]
  }
}
