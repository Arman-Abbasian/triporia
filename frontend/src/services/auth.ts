import { createApi } from '@reduxjs/toolkit/query/react'
import { LoginInterface, SignupInterface } from '@/@types/services/auth'
import baseQuery from './baseQuery'

export const Authenticate = createApi({
  reducerPath: 'Authenticate',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (signupFormData: LoginInterface) => ({
        url: 'auth/login',
        method: 'POST',
        body: signupFormData,
      }),
    }),

    signup: builder.mutation({
      query: (signupFormData: SignupInterface) => ({
        url: 'auth/signup',
        method: 'POST',
        body: signupFormData,
      }),
    }),
  }),
})

export const { useLoginMutation, useSignupMutation } = Authenticate
