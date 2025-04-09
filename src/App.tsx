import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from './components/ui/button'
import { Textarea } from './components/ui/textarea'

function download(data: string) {
  const blob = new Blob([data], { type: 'ap plication/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'variables.json'
  link.click()
}

function App() {
  const [data, setData] = useState<string>('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const loadData = useCallback(() => {
    setData('')
    parent.postMessage({ pluginMessage: { type: 'get-data' } }, '*')
  }, [])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data.pluginMessage

      switch (message.type) {
        case 'data':
          setData(JSON.stringify(message.data, null, 2))
          break
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <div className="p-4 h-full grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-4">
      <div>
        <Button size="sm" onClick={loadData} variant="outline">
          Refresh
        </Button>
      </div>
      <Textarea
        ref={textareaRef}
        className="resize-none font-mono text-sm bg-accent"
        placeholder="Loading variables..."
        value={data}
        readOnly
        onClick={() => {
          textareaRef.current?.select()
        }}
      >
      </Textarea>

      <Button size="sm" onClick={() => data && download(data)} disabled={!data}>
        Download
      </Button>
    </div>
  )
}

export default App
