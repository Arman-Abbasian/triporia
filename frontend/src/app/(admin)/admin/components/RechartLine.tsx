'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

type ChartData<T extends string> = {
  month: string
} & {
  [key in T]: number
}

type RechartLine<T extends string> = {
  chartTitle: string
  chartHeight: number
  xAxisdataKey: string
  lineDataKey: string
  data: ChartData<T>[]
}

export default function RechartLine<T extends string>(props: RechartLine<T>) {
  const { chartHeight, chartTitle, lineDataKey, xAxisdataKey, data } = props
  return (
    <div className="">
      {/* User Trend Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">{chartTitle}</h2>
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisdataKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={lineDataKey} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
