import { Card, Grid, Group, RingProgress, Text, useMantineTheme } from '@mantine/core'
import { DelayedInfoUser } from '@renderer/types/Api'
import { IconTicket } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import classes from '../styles/StatsGridIcons.module.css'

function CardReponsible(props: DelayedInfoUser) {
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    setUrl(`http://192.168.192.7:3006/update/user/${props.user}`)
  }, [])

  const theme = useMantineTheme()
  return (
    <Card shadow="sm" radius="md" withBorder style={{ width: '100%' }}>
      <Group justify="space-between">
        <Text size="xs" c="dimmed" className={classes.title}>
          Responsible {props.user}
        </Text>
        <IconTicket className={classes.icon} size="1.4rem" stroke={1.5} />
      </Group>
      <Grid grow gutter="xs">
        <Grid.Col span={5}>
          <Group align="flex-end" gap="xs" mt={25}>
            <Text
              className={classes.value}
              variant="gradient"
              gradient={{ from: 'red', to: 'pink', deg: 152 }}
            >
              {props.count}
            </Text>
            <Text c="dimmed" className={classes.text}>
              Delay
            </Text>
          </Group>

          <Text fz="xs" c="dimmed" mt={7}>
            Open {props.open} Close {props.close}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <RingProgress
            roundCaps
            thickness={5}
            size={75}
            sections={[{ value: (props.close! / props.count!) * 100, color: theme.primaryColor }]}
            label={
              <div>
                <Text ta="center" fz="md" className={classes.label}>
                  {((props.close! / props.count!) * 100).toFixed(0)}%
                </Text>
              </div>
            }
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <QRCode style={{ height: '100%', maxWidth: '100%' }} value={url} />
        </Grid.Col>
      </Grid>
    </Card>
  )
}

export default CardReponsible
