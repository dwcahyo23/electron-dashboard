import { Grid, Group, Select } from '@mantine/core'
import CardList from '@renderer/components/CardList'
import Chart from '@renderer/components/Chart'
import Loading from '@renderer/components/Loading'
import UserCarouselVirtualized from '@renderer/components/UserCarouselVritualized'
import { BaseResponse } from '@renderer/types/base/response.type'
import { EntityPdApqLeaderDailyProgresInterface } from '@renderer/types/pdApqLeaderDailyProgres/entities/pdApqLeaderDailyProgres.entity'
import { EntityPdApqLeaderMonthlyProgresInterface } from '@renderer/types/pdApqLeaderMonthlyProgres/entities/pdApqLeaderMonthlyProgres.entity'
import { EntityPdApqLeaderWeeklyProgresInterface } from '@renderer/types/pdApqLeaderWeeklyProgres/entities/pdApqLeaderWeeklyProgres.entity'
import { EntityPdApqSectionMonthlyInterface } from '@renderer/types/pdApqSectionMonthly/entities/pdApqSectionMonthly.entity'
import { EntityPdApqSectionWeeklyInterface } from '@renderer/types/pdApqSectionWeekly/entities/pdApqSectionWeekly.entity'
import { EntityPdApqUserDailyProgresInterface } from '@renderer/types/pdApqUserDailyProgres/entities/pdApqUserDailyProgres.entity'
import { EntityPdApqUserDailyWorstAndBestInterface } from '@renderer/types/pdApqUserDailyWorstAndBest/entities/pdApqUserDailyWorstAndBest.entity'
import { EntityPdApqUserMonthlyProgresInterface } from '@renderer/types/pdApqUserMonthlyProgres/entities/pdApqUserMonthlyProgres.entity'
import { EntityPdApqUserMonthlyWorstAndBestInterface } from '@renderer/types/pdApqUserMonthlyWorstAndBest/entities/pdApqUserMonthlyWorstAndBest.entity'
import { EntityPdApqUserWeeklyProgresInterface } from '@renderer/types/pdApqUserWeeklyProgres/entities/pdApqUserWeeklyProgres.entity'
import { EntityPdApqUserWeeklyWorstAndBestInterface } from '@renderer/types/pdApqUserWeeklyWorstAndBest/entities/pdApqUserWeeklyWorstAndBest.entity'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'

// Komponen DashboardAPQ
const DashboardAPQ = () => {
  const [timeRange, setTimeRange] = useState('monthly') // Default to 'monthly'
  const [section, setSection] = useState<'Machining' | 'Forming' | 'Heat Treatment' | 'All'>('All') // Default to 'all'

  // URL berdasarkan timeRange

  const fetchUsersProgres = async (
    timeRange: string
  ): Promise<
    | EntityPdApqUserDailyProgresInterface[]
    | EntityPdApqUserWeeklyProgresInterface[]
    | EntityPdApqUserMonthlyProgresInterface[]
  > => {
    try {
      const urlMap = {
        daily: '/pdapq/user/daily',
        weekly: '/pdapq/user/weekly',
        monthly: '/pdapq/user/monthly'
      }

      let url = urlMap[timeRange]

      // Add section filter to the query if section is not 'all'
      if (section !== 'All') {
        url += `?section=${section}`
      }

      const { data } =
        await axios.get<
          BaseResponse<
            | EntityPdApqUserDailyProgresInterface[]
            | EntityPdApqUserWeeklyProgresInterface[]
            | EntityPdApqUserMonthlyProgresInterface[]
          >
        >(url)

      // Format the fetched data
      return data.data.map((item) => ({
        ...item,
        avaibility: Math.round(item.avaibility * 100),
        performance: Math.round(item.performance * 100),
        quality: Math.round(item.quality * 100),
        oee: Math.round(item.oee * 100)
      }))
    } catch (error) {
      console.error(`Error fetching ${timeRange} progress:`, error)
      throw error
    }
  }

  // Fetch users worst and best based on timeRange
  const fetchUsersWorstAndBest = async (
    timeRange: string
  ): Promise<
    | EntityPdApqUserDailyWorstAndBestInterface[]
    | EntityPdApqUserMonthlyWorstAndBestInterface[]
    | EntityPdApqUserWeeklyWorstAndBestInterface[]
  > => {
    try {
      const urlMap = {
        daily: '/pdapq/user/daily/worst-and-best',
        weekly: '/pdapq/user/weekly/worst-and-best',
        monthly: '/pdapq/user/monthly/worst-and-best'
      }

      let url = urlMap[timeRange]

      // Add section filter to the query if section is not 'all'
      if (section !== 'All') {
        url += `?section=${section}`
      }

      const { data } =
        await axios.get<
          BaseResponse<
            | EntityPdApqUserDailyWorstAndBestInterface[]
            | EntityPdApqUserMonthlyWorstAndBestInterface[]
            | EntityPdApqUserWeeklyWorstAndBestInterface[]
          >
        >(url)

      // Format the fetched data
      return data.data.map((item) => ({
        ...item,
        avaibility: Math.round(item.avaibility * 100),
        performance: Math.round(item.performance * 100),
        quality: Math.round(item.quality * 100),
        oee: Math.round(item.oee * 100)
      }))
    } catch (error) {
      console.error(`Error fetching ${timeRange} worst and best:`, error)
      throw error
    }
  }

  // Fetch leaders progress based on timeRange
  const fetchLeadersProgres = async (
    timeRange: string
  ): Promise<
    | EntityPdApqLeaderDailyProgresInterface[]
    | EntityPdApqLeaderMonthlyProgresInterface[]
    | EntityPdApqLeaderWeeklyProgresInterface[]
  > => {
    try {
      const urlMap = {
        daily: '/pdapq/leader/daily',
        weekly: '/pdapq/leader/weekly',
        monthly: '/pdapq/leader/monthly'
      }

      let url = urlMap[timeRange]

      // Add section filter to the query if section is not 'all'
      if (section !== 'All') {
        url += `?section=${section}`
      }

      const { data } =
        await axios.get<
          BaseResponse<
            | EntityPdApqLeaderDailyProgresInterface[]
            | EntityPdApqLeaderMonthlyProgresInterface[]
            | EntityPdApqLeaderWeeklyProgresInterface[]
          >
        >(url)

      // Format the fetched data
      return data.data.map((item) => ({
        ...item,
        avaibility: Math.round(item.avaibility * 100),
        performance: Math.round(item.performance * 100),
        quality: Math.round(item.quality * 100),
        oee: Math.round(item.oee * 100)
      }))
    } catch (error) {
      console.error(`Error fetching ${timeRange} progress:`, error)
      throw error
    }
  }

  const fetchChartData = async (
    timeRange: string
  ): Promise<EntityPdApqSectionMonthlyInterface[] | EntityPdApqSectionWeeklyInterface[]> => {
    try {
      const urlMap = {
        weekly: '/pdapq/section/weekly',
        monthly: '/pdapq/section/monthly'
      }

      let url = timeRange !== 'daily' ? urlMap[timeRange] : urlMap.monthly

      // Add section filter to the query if section is not 'all' and timeRange is not 'daily'
      if (section !== 'All' && timeRange !== 'daily') {
        url += `?section=${section}`
      }

      const { data } =
        await axios.get<
          BaseResponse<EntityPdApqSectionMonthlyInterface[] | EntityPdApqSectionWeeklyInterface[]>
        >(url)

      // Format the fetched data
      return data.data.map((item) => {
        const cleanedName = item.name.replace(/\s+/g, '')

        // Memangkas 3 karakter pertama jika tidak mengandung 'Avg'
        const finalName =
          cleanedName.includes('Avg') || cleanedName.length < 6
            ? cleanedName
            : cleanedName.slice(0, 3)

        return {
          ...item,
          avaibility: Math.round(item.avaibility * 100),
          performance: Math.round(item.performance * 100),
          quality: Math.round(item.quality * 100),
          oee: Math.round(item.oee * 100),
          name: finalName
        }
      })
    } catch (error) {
      console.error(`Error fetching ${timeRange} progress:`, error)
      throw new Error(`Error fetching ${timeRange} progress: ${error}`)
    }
  }

  const {
    data: users = [],
    isLoading: isLoadingUsers,
    refetch: refetchUsers
  } = useQuery<EntityPdApqUserDailyProgresInterface[]>({
    queryKey: ['users', timeRange], // Include timeRange in queryKey to refetch based on this value
    queryFn: () => fetchUsersProgres(timeRange), // Pass timeRange to the fetch function
    refetchInterval: 60000 // Refetch every 60 seconds
  })

  const {
    data: usersWorstAndBest = [],
    isLoading: isLoadingWorstAndBest,
    refetch: refetchWorstAndBest
  } = useQuery<EntityPdApqUserDailyWorstAndBestInterface[]>({
    queryKey: ['usersWorstAndBest', timeRange], // Include timeRange in queryKey to refetch based on this value
    queryFn: () => fetchUsersWorstAndBest(timeRange), // Pass timeRange to the fetch function
    refetchInterval: 60000 // Refetch every 60 seconds
  })

  const {
    data: leaders = [],
    isLoading: isLoadingLeader,
    refetch: refetchLeaders
  } = useQuery<EntityPdApqLeaderDailyProgresInterface[]>({
    queryKey: ['leaders', timeRange], // Include timeRange in queryKey to refetch based on this value
    queryFn: () => fetchLeadersProgres(timeRange), // Pass timeRange to the fetch function
    refetchInterval: 60000 // Refetch every 60 seconds
  })

  const {
    data: chartData = [],
    isLoading: isLoadingChartData,
    refetch: refetchChartData
  } = useQuery<EntityPdApqSectionMonthlyInterface[] | EntityPdApqSectionWeeklyInterface[]>({
    queryKey: ['chartData', timeRange],
    queryFn: () => fetchChartData(timeRange), // Pass timeRange to the fetch function
    refetchInterval: 60000 // Refetch every 60 seconds
  })

  const bars = [
    {
      dataKey: 'avaibility',
      name: 'Avaibility',
      fill: '#2196f3',
      label: true,
      yAxisId: 'left'
    },
    {
      dataKey: 'performance',
      name: 'Performance',
      fill: '#36BA98',
      label: true,
      yAxisId: 'left'
    },
    {
      dataKey: 'quality',
      name: 'Quality',
      fill: '#ff9800',
      label: true,
      yAxisId: 'left'
    }
  ]

  const lines = [
    {
      dataKey: 'oee',
      name: 'OEE',
      stroke: '#E4003A',
      type: 'monotone' as const,
      yAxisId: 'right',
      strokeWidth: 3
    }
  ]

  const yAxes = [
    {
      yAxisId: 'left',
      orientation: 'left' as const,
      stroke: '#0C1844',
      domain: [0, 100]
    },
    {
      yAxisId: 'right',
      orientation: 'right' as const,
      stroke: '#E4003A',
      domain: [0, 100]
    }
  ]

  useEffect(() => {
    refetchUsers()
    refetchWorstAndBest()
    refetchLeaders()
    if (timeRange !== 'daily') refetchChartData()
  }, [section, timeRange])

  if (isLoadingUsers || isLoadingWorstAndBest || isLoadingLeader || isLoadingChartData) {
    return <Loading />
  }

  return (
    <div style={{ padding: '8px' }}>
      <Group align="center" justify="flex-start" mb="lg">
        <Select
          label="Time Range"
          placeholder="Select time range"
          data={['daily', 'weekly', 'monthly']}
          value={timeRange}
          onChange={(value) => setTimeRange(value || 'daily')}
        />
        <Select
          label="Section Name"
          placeholder="Select section"
          data={['Machining', 'Forming', 'Heat Treatment', 'All']}
          value={section}
          onChange={(value) =>
            setSection(value as 'Machining' | 'Forming' | 'Heat Treatment' | 'All')
          }
        />
      </Group>

      <Grid>
        <Grid.Col span={2}>
          <CardList data={leaders} title="Overview Leader" />
        </Grid.Col>

        <Grid.Col span={7}>
          <Chart
            data={chartData}
            bars={bars}
            lines={lines}
            xAxisKey="name"
            chartTitle={`${section} Dashboard`}
            yAxes={yAxes}
          />
        </Grid.Col>

        <Grid.Col span={3}>
          <CardList data={usersWorstAndBest} title="Operator Worst And Best" />
        </Grid.Col>

        <Grid.Col span={12}>
          <UserCarouselVirtualized users={users} />
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default DashboardAPQ
