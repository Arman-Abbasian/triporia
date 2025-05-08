import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
const sideBarMenu = [
  { id: 1, name: 'new trip', logo: 'newTrip' },
  { id: 2, name: 'photos', logo: 'photos' },
  { id: 3, name: 'delete trips', logo: 'deleteTrips' },
  { id: 4, name: 'delete trips', logo: 'deleteTrips' },
  { id: 5, name: 'edit trips', logo: 'editTrips' },
  { id: 6, name: 'comments', logo: 'comments' },
  { id: 7, name: 'trip analysis', logo: 'tripAnalysis' },
]

const Layout = (props: Props) => {
  const { children } = props
  return (
    <div className="grid grid-cols-12 h-full">
      <div className="hidden md:block md:col-span-3 lg:col-span-2 overflow-auto bg-secondary">
        <ul className="p-2 text-light flex flex-col gap-5">
          {sideBarMenu.map((item) => {
            return (
              <li key={item.id}>
                <Link href={'#'}>{item.name}</Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="col-span-12 md:col-span-9 lg:col-span-10 overflow-auto bg-primary">
        <div className="md:hidden">hmburger menu </div>
        {children}
      </div>
    </div>
  )
}
export default Layout
