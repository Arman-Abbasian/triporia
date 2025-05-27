import StatCard from '@/ui/StatCard'
import { UsersIcon } from '@heroicons/react/24/outline'
import RechartLine from './components/RechartLine'

const usersData = [
  { month: 'Jan 2025', users: 120 },
  { month: 'Feb 2025', users: 180 },
  { month: 'Mar 2025', users: 250 },
  { month: 'Apr 2025', users: 310 },
  { month: 'May 2025', users: 400 },
]
const placesData = [
  { month: 'Jan 2025', places: 200 },
  { month: 'Feb 2025', places: 250 },
  { month: 'Mar 2025', places: 280 },
  { month: 'Apr 2025', places: 360 },
  { month: 'May 2025', places: 700 },
]

export default function Admin() {
  return (
    <div className="py-10">
      <div className="flex justify-center items-center gap-16 flex-wrap mb-10">
        <StatCard
          logo={<UsersIcon className="text-white size-8" />}
          logoBG="bg-purple-500"
          title="users"
          value="14,547,410"
        />
        <StatCard
          logo={<UsersIcon className="text-white size-8" />}
          logoBG="bg-amber-500"
          title="places"
          value="1,250"
        />
        <StatCard
          logo={<UsersIcon className="text-white size-8" />}
          logoBG="bg-teal-500"
          title="comments"
          value="14,547"
        />
        <StatCard
          logo={<UsersIcon className="text-white size-8" />}
          logoBG="bg-rose-500"
          title="likes"
          value="13,400,710"
        />
        <StatCard
          logo={<UsersIcon className="text-white size-8" />}
          logoBG="bg-cyan-500"
          title="Since Launch"
          value="890 days"
        />
        <StatCard
          logo={<UsersIcon className="text-white size-8" />}
          logoBG="bg-slate-500"
          title="Fan Favorite Location"
          value="savashi"
        />
      </div>
      <div className="flex flex-col gap-10">
        <RechartLine<'users'>
          data={usersData}
          chartHeight={300}
          chartTitle="users"
          lineDataKey="users"
          xAxisdataKey="month"
        />
        <RechartLine<'places'>
          data={placesData}
          chartHeight={300}
          chartTitle="places"
          lineDataKey="places"
          xAxisdataKey="month"
        />
      </div>
    </div>
  )
}
