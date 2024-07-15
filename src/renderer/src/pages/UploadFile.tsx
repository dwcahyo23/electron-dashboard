import { Group, Text } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import '@mantine/dropzone/styles.css'
import { FileExcel } from '@renderer/types/File'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import * as XLSX from 'xlsx'

function UploadFile() {
  const [fileUpload, setFileUpload] = useState<FileExcel[]>([])

  console.log(fileUpload)

  const mutation = useMutation({
    mutationKey: ['postExcel'],
    mutationFn: (data: FileExcel[]) =>
      axios({ method: 'POST', url: '/api/v1/pd/delayed', data: data })
  })

  //   console.log(mutation.isError, mutation.error)

  const handleExcel = (file) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target?.result, {
        type: 'binary',
        cellDates: true
      })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const sheetData = XLSX.utils.sheet_to_json(sheet, { dateNF: 'yyyy-mm-dd' })

      let fileExcel: FileExcel[] = []

      if (Array.isArray(sheetData)) {
        fileExcel = sheetData as FileExcel[]
        mutation.mutate(fileExcel)
        setFileUpload(fileExcel)
      }
    }

    reader.readAsArrayBuffer(file[0])
  }

  return (
    <>
      <Dropzone
        accept={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
        onDrop={(files) => handleExcel(files)}
        loading={mutation.isPending}
        onReject={(rejected) => console.log(rejected)}
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
          <div>
            <Text size="xl" inline>
              Drag file here or click to select files
            </Text>
          </div>
        </Group>
      </Dropzone>
    </>
  )
}

export default UploadFile
