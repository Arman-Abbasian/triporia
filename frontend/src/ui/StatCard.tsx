import React from 'react'

type StatCardProps = {
  logoBG: string
  logo: React.ReactNode
  title: string
  value: string
}

function StatCard(props: StatCardProps) {
  const { logo, logoBG, title, value } = props
  return (
    <div className="bg-white rounded-md p-4 flex justify-between items-center gap-4 w-72 shadow-2xl">
      <div
        className={`w-16 h-16 rounded-lg flex justify-center items-center -mt-16 shadow-2xl ${logoBG}`}
      >
        {logo}
      </div>

      <div className="flex flex-col gap-1">
        <p>{title}</p>
        <p className="font-bold">{value}</p>
      </div>
    </div>
  )
}

export default StatCard
