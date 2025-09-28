import React, { useState } from 'react'
import type { FieldError, UseFormRegister } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

type InputType = 'text' | 'number' | 'password' | 'email' | 'tel'

interface FormInputProps {
  name: string
  label?: string
  placeholder?: string
  type?: InputType
  icon?: React.ReactNode
  register: UseFormRegister<any>
  error?: FieldError
  className?: string
  showTogglePassword?: boolean
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
  icon,
  register,
  error,
  className = '',
  showTogglePassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  return (
    <div className={`!w-full ${className}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-secondary-500">
          {label}
        </label>
      )}

      <div
        className={`flex justify-between items-center gap-2 w-full px-5 py-3  border rounded-full ${
          error ? 'border-error' : 'border-success'
        }`}
      >
        <input
          {...register(name)}
          type={
            isPassword && showTogglePassword
              ? showPassword
                ? 'text'
                : 'password'
              : type
          }
          placeholder={placeholder}
          dir={'rtl'}
          className={`flex-1 focus:outline-none placeholder:text-xs`}
        />

        {icon && <span className="text-primary-700 text-lg">{icon}</span>}

        {isPassword && showTogglePassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-rose-500">{error.message}</p>}
    </div>
  )
}

export default FormInput
