'use client'
import FormInput from '@/components/FormInput'
import ButtonComp from '@/ui/ButtonComp'
import React from 'react'
import { useForm } from 'react-hook-form'

function FormSection() {
  const { register } = useForm()
  return (
    <div className="flex flex-col gap-10 bg-white/50 backdrop-blur-2xl rounded-lg p-4">
      <FormInput register={register} name="name" type="text" />
      <FormInput register={register} name="email" type="email" />
      <FormInput register={register} name="password" type="password" />
      <ButtonComp text="sign up" className="bg-primary" />
    </div>
  )
}

export default FormSection
