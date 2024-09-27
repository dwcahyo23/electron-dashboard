import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef, useState } from 'react'

import '@mantine/carousel/styles.css'
import { Text } from '@mantine/core'
import CardDelayed from '@renderer/components/CardDelayed'
import { DelayApiResponse } from '@renderer/types/Api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import classes from '../styles/Carousel.module.css'
import Loading from './Loading'

function CarouselDelayed() {
  const autoplay = useRef(Autoplay({ delay: 5000 }))
  const [intervalMs] = useState<number>(60000)

  const { isLoading, data: { data: delayToday } = {} } = useQuery<DelayApiResponse>({
    queryKey: ['delayToday'],
    queryFn: async () =>
      await axios({
        method: 'GET',
        url: '/pd/delayed/today'
      }).then((response) => response.data),
    refetchInterval: intervalMs
  })

  if (isLoading) return <Loading />

  if (delayToday && delayToday.length === 0)
    return <Text size="md">No delay today or data has not been uploaded!</Text>

  return (
    <>
      <Carousel
        slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
        slideGap={{ base: 0, sm: 'md' }}
        align="start"
        classNames={classes}
        loop
        height={400}
        plugins={[autoplay.current]}
        controlsOffset="xs"
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {delayToday &&
          delayToday.map((n, i) => (
            <Carousel.Slide key={i}>
              <CardDelayed
                dwg_no={n.dwg_no}
                cust_nm={n.cust_nm}
                cust_no={n.cust_no}
                part_no={n.part_no}
                part_nm={n.part_nm}
                date={n.date}
                pltg={n.pltg}
                delay_td={n.delay_td}
                delay_tm={n.delay_tm}
                delay_yd={n.delay_yd}
                to_user={n.to_user}
                memo_estimasi={n.memo_estimasi}
                status={n.status}
              />
            </Carousel.Slide>
          ))}
      </Carousel>
    </>
  )
}

export default CarouselDelayed
