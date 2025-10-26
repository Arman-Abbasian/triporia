'use client'
import FormInput from '@/components/FormInput'
import ButtonComp from '@/ui/ButtonComp'
import LinkText from '@/ui/LinkText'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { BsPersonAdd } from 'react-icons/bs'
import { SignupInterface } from '@/@types/services/auth'
import { useSignupMutation } from '@/services/auth'

export const signupSchema = yup.object({
  name: yup
    .string()
    .required('name field is required')
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name must be maximum 30 characters'),

  email: yup
    .string()
    .required('email field is required')
    .email('Email must be valid'),

  password: yup
    .string()
    .required('password field is required')
    .min(8, 'Password must be at least 8 characters')
    .max(30, 'Password must be maximum 30 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character'
    ),
})

function FormSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  })

  //API
  const [
    SignupMutation,
    { isLoading: SignupMutationDataLoading, isError: SignupMutationError },
  ] = useSignupMutation()

  const sendDataHandler = async (data: SignupInterface) => {
    await SignupMutation(data)
    console.log(data)
  }
  return (
    <form
      onSubmit={handleSubmit(sendDataHandler)}
      className="authFormsContainer"
    >
      <BsPersonAdd className="w-36 h-36 text-primary" />
      <FormInput
        register={register}
        name="name"
        type="text"
        placeholder="enter your name..."
        error={errors.name}
      />
      <FormInput
        register={register}
        name="email"
        type="email"
        placeholder="enter your email..."
        error={errors.email}
      />
      <FormInput
        register={register}
        name="password"
        type="password"
        placeholder="enter your password..."
        error={errors.password}
      />
      <ButtonComp
        text="sign up"
        type="submit"
        className="bg-primary w-full mt-10"
      />
      <div className="flex justify-end w-full">
        <LinkText href="/auth/login" text="login" />
      </div>
    </form>
  )
}

export default FormSection
