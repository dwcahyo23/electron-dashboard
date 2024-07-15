import { Flex } from '@mantine/core'
import { DelayApiInfoUserArg, DelayedApiInfoUserResponse } from '@renderer/types/Api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import dayjs from 'dayjs'
import { useState } from 'react'
import CardReponsible from './CardReponsible'
import Loading from './Loading'

function Responsible() {
  const [apiArg, setApiArg] = useState<DelayApiInfoUserArg>({
    year: dayjs().get('year'),
    month: dayjs().get('month') + 1
  })

  const [intervalMs, setIntervalMs] = useState<number>(60000)

  const { isLoading, data: { data: CustUser } = {} } = useQuery<DelayedApiInfoUserResponse>({
    queryKey: ['delayApiInfoUser', apiArg],
    queryFn: async () =>
      await axios({
        method: 'GET',
        url: '/api/v1/pd/delayed/info/user',
        params: {
          year: apiArg.year,
          month: apiArg.month
        }
      }).then((response) => response.data),
    refetchInterval: intervalMs
  })

  if (isLoading) return <Loading />

  return (
    <Flex gap="md" justify="flex-start" align="flex-start" direction="column" wrap="wrap">
      {CustUser &&
        CustUser.map((n, i) => (
          <CardReponsible key={i} count={n.count} user={n.user} close={n.close} open={n.open} />
        ))}
    </Flex>
  )
}

export default Responsible
