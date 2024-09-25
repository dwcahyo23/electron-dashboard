import { Title } from '@mantine/core'
import { useEffect, useRef } from 'react'

function Clock() {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date()
      const date = now.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
      const hours = `0${now.getHours()}`.slice(-2)
      const minutes = `0${now.getMinutes()}`.slice(-2)
      const seconds = `0${now.getSeconds()}`.slice(-2)
      ref.current!.innerHTML = `${date} ${hours}:${minutes}:${seconds}`
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return <Title order={5} ref={ref} />
}

export default Clock
