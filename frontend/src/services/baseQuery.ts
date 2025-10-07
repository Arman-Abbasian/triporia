import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQueryCore = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL as string,
  timeout: 30000,
  credentials: 'include',
})

const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQueryCore(args, api, extraOptions)

  return result
}

export default retry(baseQuery, { maxRetries: 1 })
