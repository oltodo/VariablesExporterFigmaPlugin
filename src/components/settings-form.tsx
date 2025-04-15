import type { SettingsSchema } from '@/lib/schemas'
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
import { settingsSchema } from '@/lib/schemas'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import clsx from 'clsx'
import { InfoIcon, TriangleAlertIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
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
                        <p>If an alias points to another alias, the resolution will continue recursively until a non-alias value is found.</p>
                        <p>
                          When resolving an alias, if the target variable belongs to a different collection,
                          the plugin attempts to resolve the value using the mode that matches the source variable’s mode (based on its
                          {' '}
                          <i>slugified</i>
                          {' '}
                          name).
                          If no such mode exists in the target collection, the collection’s default mode will be used instead.
                        </p>
                        <p><b>Example:</b></p>
                        <p>
                          Let’s say variable
                          {' '}
                          <InlineCode>Primary</InlineCode>
                          {' '}
                          (in mode
                          {' '}
                          <InlineCode>Dark</InlineCode>
                          ) of the collection
                          {' '}
                          <InlineCode>Semantic Colors</InlineCode>
                          {' '}
                          is an alias of variable
                          {' '}
                          <InlineCode>Blue</InlineCode>
                          {' '}
                          from the collection
                          {' '}
                          <InlineCode>Primitve Colors</InlineCode>
                          .
                        </p>
                        <p>
                          If the
                          <InlineCode>Primitve Colors</InlineCode>
                          {' '}
                          collection has a mode named
                          {' '}
                          <InlineCode>Dark</InlineCode>
                          , its value will be used.
                        </p>
                        <p>If it doesn’t, the plugin will fall back to the theme collection’s default mode.</p>
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
                        <p>If an alias points to another alias, the resolution will continue recursively until a non-alias value is found.</p>
                        <p>
                          When resolving an alias, if the target variable belongs to a different collection,
                          the plugin attempts to resolve the value using the mode that matches the source variable’s mode (based on its
                          {' '}
                          <i>slugified</i>
                          {' '}
                          name).
                          If no such mode exists in the target collection, the collection’s default mode will be used instead.
                        </p>
                        <p><b>Example:</b></p>
                        <p>
                          Let’s say variable
                          {' '}
                          <InlineCode>Primary</InlineCode>
                          {' '}
                          (in mode
                          {' '}
                          <InlineCode>Dark</InlineCode>
                          ) of the collection
                          {' '}
                          <InlineCode>Semantic Colors</InlineCode>
                          {' '}
                          is an alias of variable
                          {' '}
                          <InlineCode>Blue</InlineCode>
                          {' '}
                          from the collection
                          {' '}
                          <InlineCode>Primitve Colors</InlineCode>
                          .
                        </p>
                        <p>
                          If the
                          <InlineCode>Primitve Colors</InlineCode>
                          {' '}
                          collection has a mode named
                          {' '}
                          <InlineCode>Dark</InlineCode>
                          , its value will be used.
                        </p>
                        <p>If it doesn’t, the plugin will fall back to the theme collection’s default mode.</p>
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
