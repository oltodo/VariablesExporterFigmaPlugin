import * as v from 'valibot'

export const settingsSchema = v.object({
  excludeHidden: v.boolean(),
  resolveAliases: v.boolean(),
})

export type SettingsSchema = v.InferOutput<typeof settingsSchema>
