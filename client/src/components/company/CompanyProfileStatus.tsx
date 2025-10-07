import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Building2, 
  Clock, 
  XCircle, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Upload
} from 'lucide-react'
import { companyApi } from '@/api/company.api'

type ProfileStatus = 'not_created' | 'pending' | 'verified' | 'rejected'

interface CompanyProfileStatusProps {
  onStatusChange?: (status: ProfileStatus) => void
}

const CompanyProfileStatus = ({ onStatusChange }: CompanyProfileStatusProps) => {
  const navigate = useNavigate()
  const [status, setStatus] = useState<ProfileStatus>('not_created')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const checkProfileStatus = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const res = await companyApi.getDashboard()
      
      if (res.success && res.data) {
        const profileStatus = (res.data.profileStatus || res.data.verificationStatus || 'not_created') as ProfileStatus
        setStatus(profileStatus)
        onStatusChange?.(profileStatus)
      } else {
        if (res.message && res.data?.verificationStatus) {
          const profileStatus = res.data.verificationStatus as ProfileStatus
          setStatus(profileStatus)
          onStatusChange?.(profileStatus)
        } else {
          setError(res.message || 'Failed to check profile status')
          setStatus('not_created')
        }
      }
    } catch (err: any) {
      console.error('Error checking profile status:', err)
      
      if (err.response?.data?.data?.verificationStatus) {
        const profileStatus = err.response.data.data.verificationStatus as ProfileStatus
        setStatus(profileStatus)
        onStatusChange?.(profileStatus)
      } else {
        setError(err.response?.data?.message || 'Failed to check profile status')
        setStatus('not_created')
      }
    } finally {
      setLoading(false)
    }
  }, [onStatusChange])

  useEffect(() => {
    checkProfileStatus()
  }, [checkProfileStatus])

  useEffect(() => {
    if (status === 'pending') {
      intervalRef.current = setInterval(() => {
        checkProfileStatus()
      }, 30000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [status, checkProfileStatus])

  const handleRefresh = () => {
    checkProfileStatus()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Checking profile status...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Error</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === 'not_created') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Complete Your Company Profile</CardTitle>
            <p className="text-muted-foreground mt-2">
              Set up your company profile to start attracting top talent and posting jobs
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm">Company information</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm">Verification documents</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm">Admin approval</span>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/company/profile-setup')} 
              className="w-full"
              size="lg"
            >
              Start Setup
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-yellow-100 rounded-full animate-pulse">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-yellow-800 mb-3">Profile Under Review</h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Your company profile is currently being reviewed by our admin team.
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full">
              <Clock className="h-4 w-4 text-yellow-600" />
              <span className="text-yellow-800 font-medium text-sm">Under Review</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-2xl mx-auto">
            {/* Review Process */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">Review Process</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-xs">1</div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Document Verification</h3>
                    <p className="text-gray-600 text-sm">Reviewing business license and tax ID documents.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-xs">2</div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Company Information</h3>
                    <p className="text-gray-600 text-sm">Verifying company details and business information.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-xs">3</div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Final Approval</h3>
                    <p className="text-gray-600 text-sm">Profile approval and job posting access.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-xs">4</div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Notification</h3>
                    <p className="text-gray-600 text-sm">Email notification once review is complete.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <Button variant="outline" onClick={handleRefresh} size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Status
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')} 
                  size="sm"
                >
                  Back to Home
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Status automatically refreshes every 30 seconds
              </p>
            </div>

            {/* Support */}
            <div className="mt-8 text-center">
              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-600 text-sm">
                  Need help? Contact{' '}
                  <a href="mailto:support@zeeknet.com" className="text-blue-600 hover:underline">
                    support@zeeknet.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'rejected') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-100 rounded-full">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-red-800 mb-3">Profile Rejected</h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Your company profile has been rejected. Please review and resubmit your documents.
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-red-100 px-4 py-2 rounded-full">
              <XCircle className="h-4 w-4 text-red-600" />
              <span className="text-red-800 font-medium text-sm">Rejected</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-2xl mx-auto">
            {/* Rejection Reasons */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">Common Rejection Reasons</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600 text-sm">Business license is unclear or expired</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600 text-sm">Tax ID format is incorrect</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600 text-sm">Company information doesn't match documents</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600 text-sm">Missing required information</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <Button 
                  onClick={() => navigate('/company/profile-setup')} 
                  size="sm"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Re-upload Documents
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleRefresh} 
                  size="sm"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Check Status
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')} 
                  size="sm"
                >
                  Back to Home
                </Button>
              </div>
            </div>

            {/* Support */}
            <div className="mt-8 text-center">
              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-600 text-sm">
                  Need help? Contact{' '}
                  <a href="mailto:support@zeeknet.com" className="text-blue-600 hover:underline">
                    support@zeeknet.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return null
}

export default CompanyProfileStatus
