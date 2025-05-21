import * as v from 'valibot'

export const variableTypes = ['COLOR', 'STRING', 'FLOAT', 'BOOLEAN'] as const

export type VariableType = typeof variableTypes[number]

export const settingsSchema = v.object({
  excludeHidden: v.boolean(),
  resolveAliases: v.boolean(),
  excludeTypes: v.array(v.picklist(variableTypes)),
})

export type SettingsSchema = v.InferOutput<typeof settingsSchema>
