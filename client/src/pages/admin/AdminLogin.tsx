import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { adminLoginThunk, clearError } from '@/store/slices/auth.slice'
import { UserRole } from '@/constants/enums'
import { 
  ArrowLeft, 
  Briefcase, 
  Sparkles, 
  Mail, 
  Lock, 
  Shield, 
  Eye, 
  EyeOff,
  AlertCircle,
  Loader2
} from 'lucide-react'

const AdminLogin = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { loading, error, isAuthenticated, role } = useAppSelector(state => state.auth)
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      if (role === UserRole.ADMIN) {
        navigate('/admin/dashboard')
      } else {
        navigate('/')
      }
    }
  }, [isAuthenticated, role, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all required fields')
      return
    }

    const resultAction = await dispatch(adminLoginThunk({
      email: formData.email,
      password: formData.password
    }))

    if (adminLoginThunk.fulfilled.match(resultAction)) {
      const res = resultAction.payload
      if (res?.data && !res.data.isVerified) {
        toast.info('Verification Required', { 
          description: 'Please verify your email to continue. A verification code has been sent to your email.',
          duration: 5000,
        })
        navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`)
      } else {
        toast.success('Login successful')
      }
    } else if (adminLoginThunk.rejected.match(resultAction)) {
      toast.error(resultAction.payload || 'Login failed')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">ZeekNet</h1>
              <Badge variant="secondary" className="ml-2">
                <Sparkles className="mr-1 h-3 w-3" />
                Job Portal
              </Badge>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')} 
              disabled={loading}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-md">
          {error && (
            <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive flex items-center space-x-2">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
          <Card className="shadow-xl">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
              <CardDescription className="text-center">
                Access the administrative dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="pl-10"
                      placeholder="Enter admin email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="pl-10 pr-10"
                      placeholder="Enter admin password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Login as Admin</span>
                    </div>
                  )}
                </Button>
              </form>
              
              <div className="text-center space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> This login is restricted to authorized administrators only.
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Need help? Contact the system administrator.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default AdminLogin
