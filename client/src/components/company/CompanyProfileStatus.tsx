import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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

  const checkProfileStatus = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const res = await companyApi.getDashboard()
      
      if (res.success && res.data) {
        const profileStatus = (res.data.profileStatus || 'not_created') as ProfileStatus
        setStatus(profileStatus)
        onStatusChange?.(profileStatus)
      } else {
        setError('Failed to check profile status')
        setStatus('not_created')
      }
    } catch {
      setError('Failed to check profile status')
      setStatus('not_created')
    } finally {
      setLoading(false)
    }
  }, [onStatusChange])

  useEffect(() => {
    checkProfileStatus()
  }, [checkProfileStatus])

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-yellow-800">Profile Under Review</CardTitle>
            <p className="text-muted-foreground mt-2">
              We are currently reviewing your company profile and documents
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">What happens next?</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Our team will review your company information</li>
                    <li>• We'll verify your business documents</li>
                    <li>• You'll receive an email once approved</li>
                    <li>• This process typically takes 1-3 business days</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <Clock className="h-3 w-3 mr-1" />
                  Under Review
                </Badge>
              </div>
              <Button variant="outline" onClick={handleRefresh} size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === 'rejected') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-red-800">Profile Rejected</CardTitle>
            <p className="text-muted-foreground mt-2">
              Your company profile has been rejected. Please review and resubmit your documents.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Common rejection reasons:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Business license is unclear or expired</li>
                    <li>• Tax ID format is incorrect</li>
                    <li>• Company information doesn't match documents</li>
                    <li>• Missing required information</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/company/profile-setup')} 
                className="w-full"
                size="lg"
              >
                <Upload className="h-4 w-4 mr-2" />
                Re-upload Documents
              </Button>
              <Button 
                variant="outline" 
                onClick={handleRefresh} 
                className="w-full"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Check Status Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return null
}

export default CompanyProfileStatus
