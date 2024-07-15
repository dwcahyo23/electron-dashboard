import { Container, Grid, Stack } from '@mantine/core'

import '@mantine/carousel/styles.css'
import Barchart from '@renderer/components/Barchart'
import CarouselDelayed from '@renderer/components/CarouselDelayed'
import Responsible from '@renderer/components/Responsible'

function Dashboard() {
  return (
    <Container fluid>
      <Stack align="stretch" justify="center" gap="md">
        <Grid grow gutter="md">
          <Grid.Col span={10}>
            <Barchart />
          </Grid.Col>
          <Grid.Col span={2}>
            <Responsible />
          </Grid.Col>
        </Grid>
        <CarouselDelayed />
      </Stack>
    </Container>
  )
}

export default Dashboard
