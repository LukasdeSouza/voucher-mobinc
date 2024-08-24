import { Outlet } from 'react-router-dom'
import HeaderNavigation from '../../header'

const RootLayout = () => {
  return (
    <div className='w-screen h-screen'>
        <HeaderNavigation/>
        <Outlet/>
    </div>
  )
}

export default RootLayout