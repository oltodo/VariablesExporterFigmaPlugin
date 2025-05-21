import type { SettingsSchema } from '@/lib/schemas'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import clsx from 'clsx'
import { InfoIcon, TriangleAlertIcon } from 'lucide-react'
import { toggle } from 'radash'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { settingsSchema, variableTypes } from '@/lib/schemas'
import { Checkbox } from './ui/checkbox'
import { InlineCode } from './ui/inline-code'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface Props {
  defaultValues?: SettingsSchema
  onSubmit: (data: SettingsSchema) => void
}

export function SettingsForm({ defaultValues, onSubmit }: Props) {
  const form = useForm<SettingsSchema>({
    resolver: standardSchemaResolver(settingsSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    control,
    watch,
  } = form

  const excludeHidden = watch('excludeHidden')
  const resolveAliases = watch('resolveAliases')

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 p-4">
          <FormField
            control={control}
            name="resolveAliases"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>
                    Resolve aliases
                    <Popover>
                      <PopoverTrigger asChild>
                        <button type="button">
                          <InfoIcon className="size-4" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-96 space-y-2 text-sm" collisionPadding={16}>
                        <p>The plugin supports cascading resolution, meaning it can follow chains of aliases until it reaches a concrete value.</p>
                        <p>A key feature here is the smart handling of multi-mode variable collections. If variables are connected through multi-mode collections, the plugin attempts to match modes based on slugified mode names. If no match is found, the target collection’s default mode is used instead.</p>
                        <p>Importantly, the resolution is always based on the original mode name—not the fallback.</p>
                        <p><b>Example:</b></p>
                        <p>
                          The variable
                          <InlineCode>primary</InlineCode>
                          {' '}
                          in the
                          <InlineCode>light</InlineCode>
                          {' '}
                          mode of the
                          <InlineCode>semantics</InlineCode>
                          {' '}
                          collection points to the variable
                          <InlineCode>blue</InlineCode>
                          {' '}
                          in the
                          <InlineCode>primitives</InlineCode>
                          {' '}
                          collection (which only contains the
                          <InlineCode>dark</InlineCode>
                          {' '}
                          mode). That variable in turn points to
                          <InlineCode>blue-500</InlineCode>
                          {' '}
                          in the
                          <InlineCode>palettes</InlineCode>
                          {' '}
                          collection, which contains both
                          <InlineCode>light</InlineCode>
                          {' '}
                          and
                          <InlineCode>dark</InlineCode>
                          {' '}
                          modes. In this case, resolution ultimately lands on
                          <InlineCode>blue-500</InlineCode>
                          {' '}
                          in the
                          <InlineCode>light</InlineCode>
                          {' '}
                          mode, even though the intermediate
                          <InlineCode>blue</InlineCode>
                          {' '}
                          variable belongs to a
                          <InlineCode>dark</InlineCode>
                          -only collection.
                        </p>
                      </PopoverContent>
                    </Popover>
                  </FormLabel>
                  <FormDescription>
                    Alias values will be resolved to their targe value.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="excludeHidden"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>
                    Exclude hidden variables

                    <Popover>
                      <PopoverTrigger asChild>
                        <button type="button" className={clsx(excludeHidden && !resolveAliases ? 'visible' : 'invisible')}>
                          <TriangleAlertIcon className="size-4 text-amber-300" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-96 space-y-2 text-sm" collisionPadding={16}>
                        <p>When aliases are involved, any variable that references a hidden variable will be resolved. This ensures the exported JSON always contains valid and usable resolved values—even if some of the original variables are hidden in the Figma UI.</p>
                      </PopoverContent>
                    </Popover>
                  </FormLabel>
                  <FormDescription>
                    Variables marked as "Hidden from publishing" will be excluded from export.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="excludeTypes"
            render={({ field }) => (
              <FormItem className="rounded-lg border p-3 shadow-sm space-y-2">
                <div className="space-y-0.5">
                  <FormLabel>
                    Types
                  </FormLabel>
                  <FormDescription>
                    Types of variables to include.
                  </FormDescription>
                </div>
                <FormControl>
                  <div className="flex gap-8">
                    {variableTypes.map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={!field.value.includes(type)}
                          onClick={() => {
                            field.onChange(toggle(field.value, type))
                          }}
                        />
                        <label
                          htmlFor={type}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {type}
                        </label>
                      </div>

                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

        </div>
        <DrawerFooter>
          <div className="flex gap-2">
            <Button type="submit">Submit</Button>
            <DrawerClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </form>
    </Form>
  )
}
