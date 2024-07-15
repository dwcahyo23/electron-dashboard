import { Button } from '@mantine/core'
import Loading from '@renderer/components/Loading'
import { DelayApiResponse, DelayedToday } from '@renderer/types/Api'
import { IconDownload } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import dayjs from 'dayjs'
import * as XLSX from 'xlsx'

function DownloadFile() {
  const { isLoading, data: { data: delayToday } = {} } = useQuery<DelayApiResponse>({
    queryKey: ['delayTodayToDownload'],
    queryFn: async () =>
      await axios({
        method: 'GET',
        url: '/api/v1/pd/delayed/today'
      }).then((response) => response.data)
  })

  if (isLoading) return <Loading />

  const donwloadExcel = (data: DelayedToday[]): void => {
    const mapData = data.map(({ date, createdAt, updatedAt, createdBy, updatedBy, ...rest }) => ({
      // date: dayjs(date).format('MM/DD/YYYY'),
      date,
      ...rest
    }))

    const worksheet = XLSX.utils.json_to_sheet(mapData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, `PD_MINUS_DELIVERY_${dayjs().format('DD_MMMM_YYYY_HH_mm_ss')}.xlsx`)
  }

  return (
    <>
      <Button
        rightSection={<IconDownload size={20} />}
        onClick={() => delayToday && donwloadExcel(delayToday)}
      >
        Download
      </Button>
    </>
  )
}

export default DownloadFile
