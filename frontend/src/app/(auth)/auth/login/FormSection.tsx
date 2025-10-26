'use client'
import FormInput from '@/components/FormInput'
import ButtonComp from '@/ui/ButtonComp'
import LinkText from '@/ui/LinkText'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { BsPersonAdd } from 'react-icons/bs'
import { LoginInterface, SignupInterface } from '@/@types/services/auth'

export const signupSchema = yup.object({
  email: yup
    .string()
    .required('email field is required')
    .email('Email must be valid'),

  password: yup.string().required('password field is required'),
})

function FormSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  })

  const sendDataHandler = (data: LoginInterface) => {
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
        text="login"
        type="submit"
        className="bg-primary w-full mt-10"
      />
      <div className="flex justify-end w-full">
        <LinkText href="/auth/signup" text="sign up" />
      </div>
    </form>
  )
}

export default FormSection
