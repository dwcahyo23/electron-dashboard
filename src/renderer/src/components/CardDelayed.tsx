import { Badge, Box, Card, Flex, Grid, Group, Text } from '@mantine/core'
import { DelayedToday } from '@renderer/types/Api'
import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import classes from '../styles/CardGradient.module.css'

function CardDelayed(prop: DelayedToday) {
  const {
    cust_nm,
    cust_no,
    part_no,
    part_nm,
    date,
    pltg,
    delay_td,
    delay_tm,
    delay_yd,
    dwg_no,
    to_user,
    memo_estimasi,
    status
  } = prop

  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    setUrl(`http://192.168.192.7:3006/update/${cust_no}/${part_no}/${dwg_no}/${date}`)
  }, [])

  return (
    <Card shadow="sm" padding="md" radius="md" className={classes.card} withBorder>
      <Card.Section withBorder py="xs">
        <Group justify="space-between">
          <Text fw={500}>{cust_nm}</Text>

          <Flex gap="md" justify="flex-start" align="center" direction="row" wrap="wrap">
            <Badge color="red" variant="light">
              {to_user}
            </Badge>
            <Badge color="red">{cust_no}</Badge>
          </Flex>
        </Group>
      </Card.Section>
      <Grid>
        <Grid.Col mt="xs" span={10}>
          <Grid>
            <Grid.Col span={3}>
              <Text size="sm">Dwg No</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text size="sm">:</Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Text size="sm">{dwg_no}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={3}>
              <Text size="sm">Pdc No</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text size="sm">:</Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Text size="sm">{part_no}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={3}>
              <Text size="sm">Pdc Name</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text size="sm">:</Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Text size="sm">{part_nm}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={3}>
              <Text size="sm">Plating</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text size="sm">:</Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Text size="sm">{pltg}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={3}>
              <Text size="sm">Memo Est.</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text size="sm">:</Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Text size="sm"> {memo_estimasi ?? ' _'}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={3}>
              <Text size="sm">Status</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text size="sm">:</Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Text size="sm"> {status ?? ' _'}</Text>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={2}>
          <Box mt="xs">
            <QRCode style={{ height: 'auto', maxWidth: '100%' }} value={url} />
          </Box>
        </Grid.Col>
      </Grid>
      <Group justify="space-between" mt="sm">
        <div>
          <Text
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: 'pink', to: 'grape', deg: 90 }}
          >
            {delay_yd}
          </Text>
          <Text size="sm">Yesterday</Text>
        </div>
        <div>
          <Text
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: 'pink', to: 'grape', deg: 90 }}
          >
            {delay_td}
          </Text>
          <Text size="sm">Today</Text>
        </div>
        <div>
          <Text
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: 'pink', to: 'grape', deg: 90 }}
          >
            {delay_tm}
          </Text>
          <Text size="sm">Tomorrow</Text>
        </div>
      </Group>
    </Card>
  )
}

export default CardDelayed
