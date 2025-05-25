import React from 'react'

function StatCard() {
  return (
    <div className="bg-white rounded-md p-4 flex justify-between items-center gap-4 w-60">
      <div className="w-20 h-20 rounded-lg flex justify-center items-center bg-purple-500 -mt-16">
        logo
      </div>

      <div className="flex flex-col gap-1">
        <p>title</p>
        <p>stats</p>
      </div>
    </div>
  )
}

export default StatCard
