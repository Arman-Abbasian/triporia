'use client'
import FormInput from '@/components/FormInput'
import ButtonComp from '@/ui/ButtonComp'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { BsPersonAdd } from 'react-icons/bs'

function FormSection() {
  const { register } = useForm()
  return (
    <div className="flex flex-col justify-center items-center w-full gap-10 bg-white/50 backdrop-blur-2xl rounded-lg p-4">
      <BsPersonAdd className="w-36 h-36 text-primary" />
      <FormInput
        register={register}
        name="name"
        type="text"
        placeholder="enter your name..."
      />
      <FormInput
        register={register}
        name="email"
        type="email"
        placeholder="enter your email..."
      />
      <FormInput
        register={register}
        name="password"
        type="password"
        placeholder="enter your password..."
      />
      <ButtonComp text="sign up" className="bg-primary w-full mt-10" />
      <div className="flex justify-end w-full">
        <Link href="/auth/login" className="p-2 roun">
          login
        </Link>
      </div>
    </div>
  )
}

export default FormSection
