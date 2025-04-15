import type { SettingsSchema } from '@/lib/schemas'
import { SettingsForm } from '@/components/settings-form'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Textarea } from '@/components/ui/textarea'
import { DownloadIcon, SettingsIcon } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { Transformer } from './lib/transformer'

function download(data: string) {
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'variables.json'
  link.click()
}

function App() {
  const [data, setData] = useState<Plugin.Data | null>(null)
  const [areSettingsOpen, setAreSettingsOpen] = useState(false)
  const [settings, setSettings] = useState<SettingsSchema>({
    resolveAliases: false,
    excludeHidden: false,
  })
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const loadData = useCallback(() => {
    parent.postMessage({ pluginMessage: { type: 'get-data' } }, '*')
  }, [])

  // Initial load
  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data.pluginMessage

      switch (message.type) {
        case 'data':
          setData(message.data as Plugin.Data)
          break
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  const { data: transformedData = '' } = useSWR([data, settings], async () => {
    if (!data) {
      return ''
    }

    const transformer = new Transformer(data, settings)
    const result = await transformer.transform()

    return JSON.stringify(result, null, 2)
  }, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    revalidateOnMount: false,
  })

  return (
    <div className="p-4 h-full grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-4">
      <div className="flex justify-end gap-3 items-center">
        <Button size="sm" onClick={() => data && download(transformedData)} disabled={!data}>
          <DownloadIcon />
          Download
        </Button>

        <Drawer
          shouldScaleBackground
          noBodyStyles
          open={Boolean(data) && areSettingsOpen}
          onOpenChange={setAreSettingsOpen}
        >
          <DrawerTrigger asChild>
            <Button
              size="sm"
              square
              variant="ghost"
              disabled={!data}
            >
              <SettingsIcon />
            </Button>
          </DrawerTrigger>

          <DrawerContent hideHandle>
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
            </DrawerHeader>
            <SettingsForm
              defaultValues={settings}
              onSubmit={(data) => {
                setAreSettingsOpen(false)
                setSettings(data)
              }}
            />
          </DrawerContent>
        </Drawer>
      </div>
      <Textarea
        ref={textareaRef}
        className="resize-none font-mono text-sm bg-accent overflow-x-scroll wrap-normal whitespace-pre"
        placeholder="Loading variables..."
        value={transformedData}
        // readOnly
        onClick={() => {
          textareaRef.current?.select()
        }}
      >
      </Textarea>
    </div>
  )
}

export default App
