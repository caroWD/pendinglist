export type MessageReponse = {
  message: string
  state: boolean
}

type Method =
  | 'GET'
  | 'PUT'
  | 'POST'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS'
  | 'QUERY'
  | 'HEAD'

interface Options<R> {
  method: Method
  request: R
}

export const fetchData = async <T, R>(
  url: string,
  options?: Options<R>
): Promise<T> => {
  const response = !options
    ? await fetch(url)
    : await fetch(url, {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options.request),
      })

  if (!response.ok) throw new Error('!Algo salio mal!')

  return response.json() as T
}
