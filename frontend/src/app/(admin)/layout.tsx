import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface MenuItem {
  id: number
  name: string
  logo: string
}

interface MenuListProps {
  sideBarMenu: MenuItem[]
}

const sideBarMenu = [
  { id: 1, name: 'Add Place', logo: 'newTrip' },
  { id: 2, name: 'Remove Place', logo: 'photos' },
  { id: 3, name: 'Edit Place', logo: 'deleteTrips' },
  { id: 4, name: 'Add Images', logo: 'deleteTrips' },
  { id: 6, name: 'comments', logo: 'comments' },
  { id: 7, name: 'Status', logo: 'tripAnalysis' },
]

const Layout = (props: Props) => {
  const { children } = props
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="hidden md:block md:col-span-3 lg:col-span-2 overflow-auto bg-secondary">
        <MenuList sideBarMenu={sideBarMenu} />
      </div>
      <div className="col-span-12 md:col-span-9 lg:col-span-10 overflow-auto bg-primary">
        <div className="md:hidden">
          <MenuList sideBarMenu={sideBarMenu} />
        </div>
        <main className="p-4 h-full">{children}</main>
      </div>
    </div>
  )
}
export default Layout

const MenuList = (props: MenuListProps) => {
  const { sideBarMenu } = props
  return (
    <ul className="p-2 text-light flex flex-col gap-5">
      {sideBarMenu.map((item: MenuItem) => {
        return (
          <li key={item.id}>
            <Link href={'#'}>{item.name}</Link>
          </li>
        )
      })}
    </ul>
  )
}
