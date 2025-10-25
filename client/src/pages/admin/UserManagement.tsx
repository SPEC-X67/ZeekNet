import { useState, useEffect } from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { 
  Search, 
  Eye,
  Download,
  Edit,
  UserX,
  ChevronDown,
  Loader2
} from 'lucide-react'
import { adminApi, type User, type GetAllUsersParams } from '@/api/admin.api'
import { toast } from 'sonner'

interface UserWithDisplayData extends User {
  name: string
  appliedJobs: number
  accountStatus: 'Active' | 'Blocked'
  emailVerification: 'Verified' | 'Unverified'
  joinedDate: string
  avatar: string
}

const UserManagement = () => {
  const [blockDialogOpen, setBlockDialogOpen] = useState(false)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [users, setUsers] = useState<UserWithDisplayData[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })
  const [filters, setFilters] = useState<GetAllUsersParams>({
    page: 1,
    limit: 10,
    search: '',
    role: 'seeker', 
    isBlocked: undefined
  })

  const fetchUsers = async (params: GetAllUsersParams = { page: 1, limit: 10 }) => {
    try {
      setLoading(true)
      const response = await adminApi.getAllUsers({
        ...params,
        isBlocked: typeof params.isBlocked === 'string' ? params.isBlocked === 'true' : params.isBlocked
      })

      if (response && response.data && response.data.users) {
        const transformedUsers: UserWithDisplayData[] = response.data.users.map((user: User) => ({
          ...user,
          name: user.name || user.email.split('@')[0], 
          appliedJobs: Math.floor(Math.random() * 15), 
          accountStatus: user.isBlocked ? 'Blocked' : 'Active',
          emailVerification: user.isVerified ? 'Verified' : 'Unverified',
          joinedDate: new Date(user.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }),
          avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(user.name || user.email.split('@')[0])}`
        }))
        
        setUsers(transformedUsers)
        setPagination({
          page: response.data.page || 1,
          limit: response.data.limit || 10,
          total: response.data.total || 0,
          totalPages: response.data.totalPages || 0,
          hasNext: (response.data.page || 1) < (response.data.totalPages || 0),
          hasPrev: (response.data.page || 1) > 1
        })
      }
    } catch (error) {
      console.error('Error fetching users:', error); 
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(filters)
  }, [filters])

  const filteredUsers = users


  const handleBlockClick = (user: User) => {
    setSelectedUser(user)
    setBlockDialogOpen(true)
  }

  const handleEmailClick = (user: User) => {
    setSelectedUser(user)
    setEmailDialogOpen(true)
  }

  const handleBlockConfirm = async () => {
    if (!selectedUser) return
    
    try {
      const response = await adminApi.blockUser(selectedUser.id, !selectedUser.isBlocked)  // Changed from is_blocked
      
      if (response && response.message) {
        toast.success(response.message)
        
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === selectedUser.id 
              ? { 
                  ...user, 
                  isBlocked: !selectedUser.isBlocked,  
                  accountStatus: !selectedUser.isBlocked ? 'Blocked' : 'Active'
                }
              : user
          )
        )
      }
    } catch {
      toast.error('Failed to update user status')
    } finally {
      setBlockDialogOpen(false)
      setSelectedUser(null)
    }
  }

  const handleEmailConfirm = () => {
    toast.info('Email verification toggle not implemented yet')
    setEmailDialogOpen(false)
    setSelectedUser(null)
  }

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm,
      page: 1,
      role: 'seeker' 
    }))
  }

  const handleFilterChange = (key: keyof GetAllUsersParams, value: unknown) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1, 
      role: 'seeker'
    }))
  }

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({
      ...prev,
      page: newPage,
      role: 'seeker'
    }))
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Job Seekers Management</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by email"
              className="pl-10"
              value={filters.search || ''}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Account Status</label>
            <select 
              className="px-3 py-2 border border-border rounded-md bg-background text-sm"
              value={filters.isBlocked === undefined ? 'all' : filters.isBlocked ? 'blocked' : 'active'}
              onChange={(e) => {
                const value = e.target.value
                handleFilterChange('isBlocked', value === 'all' ? undefined : value === 'blocked')
              }}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>

        {}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">Job Seeker</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Applied Jobs</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Account Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Email Verification</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Joined Date</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Loading job seekers...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-muted-foreground">
                        No job seekers found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={user.avatar} 
                              alt={user.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{user.appliedJobs} Applied Jobs</span>
                        </td>
                        <td className="p-4">
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            user.accountStatus === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {user.accountStatus}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div 
                              className={`w-10 h-5 rounded-full relative cursor-pointer ${
                                user.emailVerification === 'Verified' ? 'bg-green-500' : 'bg-gray-300'
                              }`}
                              onClick={() => handleEmailClick(user)}
                            >
                              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                                user.emailVerification === 'Verified' ? 'right-0.5' : 'left-0.5'
                              }`}></div>
                            </div>
                            <span className="text-sm text-gray-700">{user.emailVerification}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{user.joinedDate}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                              onClick={() => handleBlockClick(user)}
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {}
        {!loading && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} job seekers
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={!pagination.hasPrev}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.hasNext}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {}
        <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Block User</DialogTitle>
              <DialogDescription>
                Are you sure you want to {selectedUser?.isBlocked ? 'unblock' : 'block'} {selectedUser?.email}? 
                {selectedUser?.isBlocked 
                  ? ' This will restore their account access.' 
                  : ' This will prevent them from accessing their account.'
                }
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setBlockDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleBlockConfirm}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {selectedUser?.isBlocked ? 'Unblock' : 'Block'} User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {}
        <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Email Verification</DialogTitle>
              <DialogDescription>
                Are you sure you want to {selectedUser?.isVerified ? 'unverify' : 'verify'} the email for {selectedUser?.email}? 
                {selectedUser?.isVerified 
                  ? ' This will mark their email as unverified.' 
                  : ' This will mark their email as verified.'
                }
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleEmailConfirm}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                {selectedUser?.isVerified ? 'Unverify' : 'Verify'} Email
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

export default UserManagement