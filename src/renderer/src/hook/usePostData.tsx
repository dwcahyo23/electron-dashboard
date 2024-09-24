import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRef } from 'react'

// Fungsi untuk melakukan mutasi dengan axios
const postData = async <TResponse, TData>(
  endpoint: string,
  data: TData,
  signal: AbortSignal
): Promise<TResponse> => {
  try {
    const response = await axios.post<TResponse>(endpoint, data, {
      signal // Mengaitkan signal ke request
    })
    return response.data
  } catch (error) {
    // Handle abort error explicitly
    if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') {
      console.log('Request was aborted by the user')
      throw error // Ensure to throw the error to be caught by mutation
    } else {
      throw error // Re-throw if not an abort error
    }
  }
}

// Membuat tipe kustom yang menggabungkan UseMutationResult dan fungsi cancel
type UsePostDataResult<TResponse, TData> = UseMutationResult<TResponse, Error, TData> & {
  cancel: () => void
}

const usePostData = <TResponse, TData>(
  endpoint: string,
  options?: Omit<UseMutationOptions<TResponse, Error, TData, unknown>, 'mutationFn'>
): UsePostDataResult<TResponse, TData> => {
  const controllerRef = useRef<AbortController | null>(null)

  const mutationFn = async (data: TData): Promise<TResponse> => {
    if (!data) {
      throw new Error('Data is null or undefined')
    }

    // Membuat instance AbortController baru
    controllerRef.current = new AbortController()
    const { signal } = controllerRef.current

    // Mengirimkan signal dan endpoint ke fungsi postData
    return postData<TResponse, TData>(endpoint, data, signal)
  }

  const mutation = useMutation<TResponse, Error, TData>({
    mutationFn,
    ...options, // Menyediakan opsi tambahan jika ada
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        console.error('Terjadi kesalahan saat mengupload data:', error.message)
      } else if (error instanceof Error) {
        console.error('Terjadi kesalahan saat mengupload data:', error.message)
      } else {
        console.error('Terjadi kesalahan saat mengupload data: Unknown error')
      }
    },
    onSettled: () => {
      // Reset controller setelah request selesai
      controllerRef.current = null
    }
  })

  // Fungsi untuk membatalkan request
  const cancel = () => {
    if (controllerRef.current) {
      controllerRef.current.abort()
      console.log('Request dibatalkan')
    }
  }

  // Mengembalikan hasil mutasi bersama dengan fungsi cancel
  return { ...mutation, cancel }
}

export default usePostData
