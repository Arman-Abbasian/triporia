import Link from 'next/link'
import React, { ReactNode } from 'react'
import { FaArrowRight } from 'react-icons/fa'

interface LinkTextPropsType {
  text: string
  href: string
}

function LinkText(props: LinkTextPropsType) {
  const { text, href } = props
  return (
    <Link
      href={href}
      className="flex items-center gap-2 p-2 rounded-lg bg-indigo-500 text-white"
    >
      <p>{text}</p>
      <FaArrowRight />
    </Link>
  )
}

export default LinkText
