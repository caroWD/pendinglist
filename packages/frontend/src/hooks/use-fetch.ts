import { useEffect, useState } from 'react'

type Data<T> = T | null

type FetchError = Error | null

interface Response<T> {
  result: Data<T>
  loading: boolean
  error: FetchError
}

export const useFetch = <T>(url: string): Response<T> => {
  const [result, setResult] = useState<Data<T>>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<FetchError>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)

        if (!response.ok) {
          const responseError = (await response.json()) as {
            message: string
            state: boolean
          }

          throw new Error(responseError.message)
        }

        const data: T = await response.json()

        setResult(data)
      } catch (error) {
        setError(error as Error)
      } finally {
        setLoading(!loading)
      }
    }

    fetchData()
  }, [url])

  return { result, loading, error }
}
