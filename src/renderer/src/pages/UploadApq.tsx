import { Button, Group, Text } from '@mantine/core'
import { Dropzone, FileWithPath } from '@mantine/dropzone'
import '@mantine/dropzone/styles.css'
import usePostData from '@renderer/hook/usePostData'
import { ExcelApq } from '@renderer/types/File'
import { CreatePdApqInterface } from '@renderer/types/pdApq/dto/create-pdApq.dto'
import * as XLSX from 'xlsx'

const convertExcelApqToCreatePdApq = (data: ExcelApq[]): CreatePdApqInterface[] => {
  return data.map((excelApq) => {
    const operator = excelApq.operator ?? ''
    const tl = excelApq.tl ?? ''
    const com = excelApq.com ?? 0
    const nikOperator = excelApq.nik_operator ?? 0
    const nikTl = excelApq.nik_tl ?? 0

    const firstName = operator.split(' ')[0] ?? ''
    const lastName = operator.split(' ').slice(1).join(' ') ?? ''
    const sectionHeadFirstName = tl.split(' ')[0] ?? ''
    const sectionHeadLastName = tl.split(' ').slice(1).join(' ') ?? ''
    const comId = com === 1 ? '01' : '02'

    const date = excelApq.date ? excelApq.date : new Date()

    const parseNumber = (value: any): number => (value == null || value === ' ' ? 0 : Number(value))

    const avaibility = parseNumber(excelApq.avaibility)
    const performance = parseNumber(excelApq.performance)
    const quality = parseNumber(excelApq.quality)

    return {
      user: {
        create: {
          nik: nikOperator.toString(),
          firstName,
          lastName,
          password: nikOperator.toString()
        }
      },
      sectionHeadUser: {
        create: {
          nik: nikTl.toString(),
          firstName: sectionHeadFirstName,
          lastName: sectionHeadLastName,
          password: nikTl.toString()
        }
      },
      com: {
        connect: {
          comId
        }
      },
      section: excelApq.section ?? '',
      avaibility,
      performance,
      quality,
      date
    }
  })
}

/**
 * Renders a dropzone component that accepts Excel files and posts the
 * converted data to the server upon successful upload.
 */
function UploadApq(): JSX.Element {
  const { mutate, isPending, isError, isSuccess, error, cancel } = usePostData<
    CreatePdApqInterface[],
    CreatePdApqInterface[]
  >('/api/v1/pdapq/many', {
    mutationKey: ['postExcel']
  })

  const handleFileDrop = (files: FileWithPath[]): void => {
    if (isError) return

    const fileReader = new FileReader()
    fileReader.onload = (event): void => {
      const workbook = XLSX.read(event.target?.result, {
        type: 'binary',
        cellDates: true
      })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const excelData = XLSX.utils.sheet_to_json(sheet, { dateNF: 'yyyy-mm-dd hh:mm:ss' })

      const createPdApqData = convertExcelApqToCreatePdApq(excelData as ExcelApq[])
      mutate(createPdApqData)
    }

    fileReader.readAsArrayBuffer(files[0])
  }

  return (
    <>
      <Dropzone
        accept={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
        onDrop={handleFileDrop}
        loading={isPending}
        onReject={(rejected) => console.log(rejected)}
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
          <div>
            <Text size="xl" inline>
              Drag file here or click to select files
            </Text>
            {isSuccess && (
              <Text size="sm" c="green.5">
                Berhasil mengupload data
              </Text>
            )}
            {isError && (
              <Text size="sm" c="red.5">
                Gagal mengupload data: {error instanceof Error ? error.message : 'Unknown error'}
              </Text>
            )}
          </div>
        </Group>
      </Dropzone>
      <Group justify="center" mt="md">
        {isPending && (
          <Button onClick={() => cancel()} color="red">
            Cancel
          </Button>
        )}
      </Group>
    </>
  )
}

export default UploadApq
