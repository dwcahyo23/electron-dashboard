import { Button, Card, Grid, Group, Select, Text, TextInput, Textarea, Title } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'

// Define the initial values for the form
const initialValues = {
  woId: '',
  comId: '',
  mcCd: '',
  woDep: null,
  woShif: null,
  woPri: '',
  woAt: null,
  woStopAt: null,
  woAppendAt: null,
  woClose: 'OPEN', // Assuming default status
  woCloseAt: null,
  woUser: null,
  woAppr: 'PENDING', // Assuming default status
  woApprBy: null,
  woApprAt: null,
  mttf: null,
  mtbf: null,
  mttr: null,
  woMemo: null,
  woRemarks: null
}

// Define the form component
const MnWoForm = () => {
  const form = useForm({
    initialValues
  })

  // Mock function for mutation (replace with your API call)
  const mutation = useMutation({
    mutationFn: async (values: typeof initialValues) => {
      // API call logic here
      console.log(values)
    },
    onSuccess: () => {
      form.reset() // Reset form on success
    }
  })

  const handleSubmit = (values: typeof initialValues) => {
    mutation.mutate(values)
  }

  return (
    <Card padding="lg" shadow="sm" style={{ maxWidth: 600, margin: 'auto' }}>
      <Title order={2} mb="md">
        Work Order Form
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={6}>
            <TextInput label="Work Order ID" required {...form.getInputProps('woId')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Company ID" required {...form.getInputProps('comId')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Machine Code" required {...form.getInputProps('mcCd')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Department" {...form.getInputProps('woDep')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Shift" {...form.getInputProps('woShif')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Priority" required {...form.getInputProps('woPri')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Group align="center">
              <Text>Work Order At</Text>
              <DatePicker {...form.getInputProps('woAt')} />
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <Group align="center">
              <Text>Work Order Stop At</Text>
              <DatePicker {...form.getInputProps('woStopAt')} />
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <Group align="center">
              <Text>Append At</Text>
              <DatePicker {...form.getInputProps('woAppendAt')} />
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Close Status"
              data={['OPEN', 'CLOSED']}
              {...form.getInputProps('woClose')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Group align="center">
              <Text>Close At</Text>
              <DatePicker {...form.getInputProps('woCloseAt')} />
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="User" {...form.getInputProps('woUser')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Approval Status"
              data={['PENDING', 'APPROVED', 'REJECTED']}
              {...form.getInputProps('woAppr')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Approved By" {...form.getInputProps('woApprBy')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Group align="center">
              <Text>Approved At</Text>
              <DatePicker {...form.getInputProps('woApprAt')} />
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="MTTF" type="number" {...form.getInputProps('mttf')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="MTBF" type="number" {...form.getInputProps('mtbf')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="MTTR" type="number" {...form.getInputProps('mttr')} />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea label="Memo" {...form.getInputProps('woMemo')} />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea label="Remarks" {...form.getInputProps('woRemarks')} />
          </Grid.Col>
          <Grid.Col span={12}>
            <Button type="submit" fullWidth mt="md">
              Submit
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Card>
  )
}

export default MnWoForm
