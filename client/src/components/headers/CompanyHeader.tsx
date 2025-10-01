import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Bell, 
  Plus,
  ChevronDown
} from 'lucide-react'
import { useAppSelector } from '@/hooks/useRedux'
import { companyApi } from '@/api/company.api'

const CompanyHeader = () => {
  const { name } = useAppSelector((state) => state.auth)
  const [companyName, setCompanyName] = useState(name || 'ZeekNet')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCompanyProfile()
  }, [])

  const fetchCompanyProfile = async () => {
    try {
      setLoading(true)
      const response = await companyApi.getProfile()
      if (response.success && response.data) {
        setCompanyName(response.data.company_name)
      }
    } catch (error) {
      console.error('Failed to fetch company profile:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200" style={{ boxShadow: 'inset 0px -1px 0px 0px rgba(214, 221, 235, 1)' }}>
      <div className="flex items-center justify-between px-7 py-3" style={{ gap: '545px' }}>
        {/* Left side - Company Selector */}
        <div className="flex items-center" style={{ gap: '14px' }}>
          {/* Company Logo */}
          <div className="relative" style={{ width: '41px', height: '41px' }}>
            <div className="absolute inset-0 rounded-full bg-gray-200"></div>
            <div className="absolute inset-0 flex items-center justify-center rounded-full" style={{ backgroundColor: '#1ED760' }}>
              <span className="text-white text-base font-bold">
                {loading ? 'L' : (companyName || 'Z').charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Company Info */}
          <div className="flex flex-col">
            <span className="text-xs font-normal" style={{ color: '#515B6F', fontSize: '14px', lineHeight: '1.6' }}>Company</span>
            <div className="flex items-center" style={{ gap: '7px' }}>
              <span className="font-bold" style={{ color: '#25324B', fontSize: '17px', lineHeight: '1.2' }}>
                {loading ? 'Loading...' : (companyName || 'ZeekNet')}
              </span>
              <ChevronDown className="h-5 w-5" style={{ color: '#25324B' }} />
            </div>
          </div>
        </div>

        {/* Right side - Notifications and Actions */}
        <div className="flex items-center justify-center" style={{ gap: '27px' }}>
          {/* Notifications */}
          <div className="relative" style={{ width: '34px', height: '34px' }}>
            <div className="absolute inset-0 rounded-full bg-white"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Bell className="h-5 w-5" style={{ color: '#25324B' }} />
            </div>
            {/* Notification dot */}
            <div className="absolute top-2.5 right-2.5 w-1 h-1 rounded-full" style={{ backgroundColor: '#FF6550' }}></div>
          </div>

          {/* Post a job button */}
          <Button 
            className="flex items-center justify-center text-white rounded-lg font-bold"
            style={{ 
              backgroundColor: '#4640DE',
              padding: '10px 20px',
              gap: '8px',
              fontSize: '14px',
              lineHeight: '1.6'
            }}
          >
            <Plus className="h-5 w-5" />
            Post a job
          </Button>
        </div>
      </div>
    </header>
  )
}

export default CompanyHeader
