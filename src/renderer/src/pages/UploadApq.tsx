import { Button, Group, Paper, Text } from '@mantine/core'
import { Dropzone, FileWithPath } from '@mantine/dropzone'
import '@mantine/dropzone/styles.css'
import usePostData from '@renderer/hook/usePostData'
import { ExcelApq } from '@renderer/types/File'
import { CreatePdApqInterface } from '@renderer/types/pdApq/dto/create-pdApq.dto'
import { useEffect, useState } from 'react'
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
    const dateAdjusted = new Date(date.getTime() + 7 * 60 * 60 * 1000)

    const parseNumber = (value: any): number => (value == null || value === ' ' ? 0 : Number(value))

    const avaibility = parseNumber(excelApq.avaibility)
    const performance = parseNumber(excelApq.performance)
    const quality = parseNumber(excelApq.quality)

    return {
      nik: nikOperator.toString(),
      user: {
        create: {
          nik: nikOperator.toString(),
          firstName,
          lastName,
          password: nikOperator.toString()
        }
      },
      sectionHead: nikTl.toString(),
      sectionHeadUser: {
        create: {
          nik: nikTl.toString(),
          firstName: sectionHeadFirstName,
          lastName: sectionHeadLastName,
          password: nikTl.toString()
        }
      },
      comId: comId,
      com: {
        connect: {
          comId
        }
      },
      section: excelApq.section ?? '',
      avaibility,
      performance,
      quality,
      date: dateAdjusted
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
  >('/pdapq/upsert', {
    mutationKey: ['postExcel']
  })

  const [processedCount, setProcessedCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [createdCount, setCreatedCount] = useState(0)
  const [updatedCount, setUpdatedCount] = useState(0)
  const [skippedCount, setSkippedCount] = useState(0)
  const [failedCount, setFailedCount] = useState(0)

  useEffect(() => {
    const initializeEventSource = async () => {
      try {
        const baseUrl = await window.api.getBaseUrl() // Get the base URL dynamically
        const eventSource = new EventSource(`${baseUrl}/sse/events`)

        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data)
          console.log('New message from server:', data)

          // Update counts based on the incoming data
          if (data.batchIndex !== undefined) {
            setProcessedCount(data.batchIndex) // Represents the current batch being processed
          }
          if (data.totalBatches !== undefined) {
            setTotalCount(data.totalBatches) // Total number of batches
          }
          if (data.created !== undefined) {
            setCreatedCount((prev) => prev + data.created) // Increment the created count
          }
          if (data.updated !== undefined) {
            setUpdatedCount((prev) => prev + data.updated) // Increment the updated count
          }
          if (data.skipped !== undefined) {
            setSkippedCount((prev) => prev + data.skipped) // Increment the updated count
          }
          if (data.failed !== undefined) {
            setFailedCount((prev) => prev + data.failed) // Increment the failed count
          }

          // Additional handling can be done here based on specific statuses if needed
        }

        eventSource.onerror = (error) => {
          console.error('EventSource failed:', error)
          eventSource.close() // Close the connection on error
        }
      } catch (error) {
        console.error('Failed to initialize EventSource:', error)
      }
    }

    initializeEventSource() // Call this function to start listening
  }, []) // Empty dependency array means this effect runs once on mount

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
          <>
            <Text size="sm">{`Processed: ${processedCount} / Total: ${totalCount}`}</Text>
            <Button onClick={() => cancel()} color="red">
              Cancel
            </Button>

            <Paper p="md" withBorder>
              <Group gap="xs">
                <Text size="sm" c="green.5">
                  Created: {createdCount}
                </Text>
                <Text size="sm" c="blue.5">
                  Updated: {updatedCount}
                </Text>
                <Text size="sm" c="yellow.5">
                  Skipped: {skippedCount}
                </Text>
                <Text size="sm" c="red.5">
                  Failed: {failedCount}
                </Text>
              </Group>
            </Paper>
          </>
        )}
      </Group>
    </>
  )
}

export default UploadApq
