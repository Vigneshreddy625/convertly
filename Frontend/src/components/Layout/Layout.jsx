import { useState } from 'react'
import Navbar from './Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import ModeToggle from '../Darkmode/ToggleMode'
import { ArrowLeft } from 'lucide-react'

function Layout() {
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const location = useLocation();

  const handleNavbarToggle = (isCollapsed) => {
    setNavbarCollapsed(isCollapsed)
  }

  const isDocumentsRoute = location.pathname.endsWith('/documents');

  return (
    <div className='flex h-screen p-4 overflow-hidden bg-white dark:bg-black'>
      <div className='h-full'>
        <Navbar onToggleCollapse={handleNavbarToggle} />
      </div>
      <div
        className='flex-1 transition-all duration-300'
        style={{
          marginLeft: '1rem',
          width: `calc(100% - ${navbarCollapsed ? '5rem' : '14rem'} - 2rem)`
        }}
      >
        <div
          className={`relative rounded-lg bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 shadow-md border border-gray-300 dark:border-gray-800 h-full overflow-auto flex justify-center ${!isDocumentsRoute ? 'items-center' : ''}`}
        >
          <Outlet />
          <div className="absolute right-2 top-2 cursor-pointer"><ModeToggle /></div>
          {location.pathname !== '/home' && (
            <div className="absolute left-4 top-4 cursor-pointer" onClick={() => window.history.back()}><ArrowLeft /></div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Layout