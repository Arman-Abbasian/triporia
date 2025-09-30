import Link from 'next/link'
import React, { ReactNode } from 'react'

interface LinkTextPropsType {
  text: string
  icon: ReactNode
}

function LinkText(props: LinkTextPropsType) {
  const { text, icon } = props
  return (
    <Link href="/auth/login" className="flex items-center gap-2 p-2 rounded-lg">
      <p>{text}</p>
      {icon}
    </Link>
  )
}

export default LinkText
