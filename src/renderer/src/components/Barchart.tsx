import { Flex, Paper, Text } from '@mantine/core'
import { DelayApiInfoCustResponse } from '@renderer/types/Api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import dayjs from 'dayjs'
import { useState } from 'react'
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import Loading from './Loading'

const CustomizeDot = (prop) => {
  const { x, y, value } = prop
  return (
    <text x={x} y={y} dy={-4} fill="#0C1844" fontSize={18} fontWeight={500} textAnchor="middle">
      {value}
    </text>
  )
}

function Barchart() {
  const [intervalMs] = useState<number>(60000)

  const { isLoading, data: { data: CustInfo } = {} } = useQuery<DelayApiInfoCustResponse>({
    queryKey: ['delayApiInfoCust'],
    queryFn: async () =>
      await axios({
        method: 'GET',
        url: '/api/v1/pd/delayed/info/cust'
      }).then((response) => response.data),
    refetchInterval: intervalMs
  })

  if (isLoading) return <Loading />

  return (
    <Paper shadow="sm" radius="md" withBorder p="md" style={{ height: 575 }}>
      <Flex justify="center" mb="md" align="center" direction="row">
        <Text c="dimmed" style={{ fontWeight: 700, textTransform: 'uppercase' }}>
          Dashboard Delivery Minus From Production ( {dayjs().format('DD-MMM-YYYY')} )
        </Text>
      </Flex>
      <ResponsiveContainer width="100%" height="90%">
        <ComposedChart data={CustInfo}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cust_no" />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#0C1844"
            tickCount={3}
            tickFormatter={(val) => val.toLocaleString()}
          />
          <YAxis yAxisId="right" orientation="right" stroke="#E4003A" />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="sum_delay_yd"
            name="Total Quantity Yesterday (Pcs)"
            fill="#ff9800"
            label={{
              position: 'inside',
              angle: -90,
              fill: '#0C1844',
              fontSize: 18,
              formatter: (val) => `${val.toLocaleString()}`
            }}
          />
          <Bar
            yAxisId="left"
            dataKey="sum_delay_td"
            name="Total Quantity Today (Pcs)"
            fill="#2196f3"
            label={{
              position: 'inside',
              angle: -90,
              fill: '#0C1844',
              fontSize: 18,
              formatter: (val) => val.toLocaleString()
            }}
          />
          <Bar
            yAxisId="left"
            dataKey="sum_delay_tm"
            name="Total Quantity Today (Pcs)"
            fill="#36BA98"
            label={{
              position: 'inside',
              angle: -90,
              fill: '#0C1844',
              fontSize: 18,
              formatter: (val) => val.toLocaleString()
            }}
          />

          <Line
            yAxisId="right"
            label={<CustomizeDot />}
            type="monotone"
            dataKey="count"
            name="Total Part Number"
            stroke="#E4003A"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Paper>
  )
}

export default Barchart
