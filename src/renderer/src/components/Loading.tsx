import { Skeleton } from '@mantine/core'

function Loading() {
  return (
    <>
      <Skeleton height={20} mt={6} radius="xl" />
      <Skeleton height={20} mt={6} radius="xl" />
    </>
  )
}

export default Loading
