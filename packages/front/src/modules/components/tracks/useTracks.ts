import { useEffect, useState } from 'react'
import store from '@store'

export const useTracks = () => {
  const { lanesInfo } = store
  const [showButtonPanel, setShowButtonPanel] = useState<number | false>(0)
  useEffect(() => {
    const event = () => {
      if (showButtonPanel !== false) {
        console.log('evnetBody')
        setShowButtonPanel(false)
      }
    }

    if (document.body) {
      document.body.addEventListener('click', event)
    }

    return () => {
      document.body.removeEventListener('click', event)
    }
  }, [showButtonPanel])

  const eventStart = (func: Function) => {
    return (e: MouseEvent) => {
      func()
      e.stopPropagation()
    }
  }

  return {
    lanesInfo,
    showButtonPanel,
    setShowButtonPanel,
    eventStart,
  }
}
