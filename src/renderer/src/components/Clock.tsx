import { Title } from '@mantine/core'
import { useEffect, useState } from 'react'

function Clock() {
  const [date, setDate] = useState(new Date())
  let intervalMs
  useEffect(() => {
    intervalMs = setInterval(() => {
      tick()
    }, 1000)
    return () => {
      clearInterval(intervalMs)
    }
  }, [])

  const tick = () => {
    setDate(new Date())
  }

  const format = (val) => {
    if (val < 10) {
      val = '0' + val
    }
    return val
  }

  return (
    <Title order={5}>
      {date.getHours()}:{format(date.getMinutes())}:{format(date.getSeconds())}
    </Title>
  )
}

export default Clock
