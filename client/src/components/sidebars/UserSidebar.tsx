import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  User, 
  Home, 
  Settings,
  HelpCircle,
  LogOut,
  FileText
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { logoutThunk } from '@/store/slices/auth.slice'

const UserSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { name, email } = useAppSelector((state) => state.auth)

  const navigationItems = [
    {
      path: '/seeker/dashboard',
      label: 'Dashboard',
      icon: Home,
      badge: null
    },
    {
      path: '/seeker/applications',
      label: 'My Applications',
      icon: FileText,
      badge: null
    },
    {
      path: '/seeker/profile',
      label: 'My Public Profile',
      icon: User,
      badge: null
    }
  ]

  const settingsItems = [
    {
      path: '/seeker/settings',
      label: 'Settings',
      icon: Settings,
      badge: null
    },
    {
      path: '/seeker/help',
      label: 'Help Center',
      icon: HelpCircle,
      badge: null
    }
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap()
      navigate('/auth/login')
    } catch {
      navigate('/auth/login')
    }
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 shadow-sm h-[100vh] relative">
      {}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg">
            <img src="/blue.png" alt="ZeekNet Logo" className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">ZeekNet</h2>
          </div>
        </div>
      </div>
      
      {}
      <nav className="p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            
            return (
              <Button
                key={item.path}
                variant="ghost"
                className={`w-full justify-start h-11 text-gray-700 hover:bg-purple-50 hover:text-purple-700 ${
                  isActive 
                    ? "bg-purple-100 text-purple-700" 
                    : ""
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <Icon className="h-4 w-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
              </Button>
            )
          })}
        </div>
      </nav>

      {}
      <div className="px-4 pb-4">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">SETTINGS</p>
        <div className="space-y-1">
          {settingsItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            
            return (
              <Button
                key={item.path}
                variant="ghost"
                className={`w-full justify-start h-11 text-gray-700 hover:bg-purple-50 hover:text-purple-700 ${
                  isActive 
                    ? "bg-purple-100 text-purple-700" 
                    : ""
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <Icon className="h-4 w-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
              </Button>
            )
          })}
        </div>
      </div>
      
      {}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{name || 'User'}</p>
            <p className="text-xs text-gray-500">{email || 'user@email.com'}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start h-8 text-gray-700 hover:bg-red-50 hover:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          <span>Log out</span>
        </Button>
      </div>
    </div>
  )
}

export default UserSidebar
