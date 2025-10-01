import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Eye, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  Building2,
  IndianRupee
} from 'lucide-react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import { toast } from 'sonner'
import { adminApi } from '@/api/admin.api'
import type { JobPostingResponse, PaginatedJobPostings } from '@/types/job'

const JobManagement = () => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState<JobPostingResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean
    jobId: string | null
    jobTitle: string
  }>({
    isOpen: false,
    jobId: null,
    jobTitle: ''
  })

  const mockJobs: JobPostingResponse[] = [
    {
      id: '1',
      company_id: 'comp1',
      title: 'Senior React Developer',
      description: 'We are looking for a senior React developer...',
      responsibilities: ['Develop React applications', 'Code review'],
      qualifications: ['5+ years experience', 'React expertise'],
      nice_to_haves: ['TypeScript', 'Next.js'],
      benefits: ['Health insurance', 'Remote work'],
      salary: { min: 80000, max: 120000 },
      employment_types: ['Full-time'],
      location: 'New York, NY',
      skills_required: ['React', 'JavaScript', 'CSS'],
      category_ids: ['tech'],
      is_active: true,
      view_count: 150,
      application_count: 25,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      company: {
        companyName: 'TechCorp Inc',
        logo: '/logo.png'
      }
    },
    {
      id: '2',
      company_id: 'comp2',
      title: 'Product Manager',
      description: 'Lead product development initiatives...',
      responsibilities: ['Product strategy', 'Team management'],
      qualifications: ['MBA preferred', '3+ years PM experience'],
      nice_to_haves: ['Technical background'],
      benefits: ['Stock options', 'Flexible hours'],
      salary: { min: 100000, max: 150000 },
      employment_types: ['Full-time'],
      location: 'San Francisco, CA',
      skills_required: ['Product Management', 'Analytics'],
      category_ids: ['product'],
      is_active: false,
      view_count: 89,
      application_count: 12,
      createdAt: '2024-01-10T14:30:00Z',
      updatedAt: '2024-01-12T09:15:00Z',
      company: {
        companyName: 'StartupXYZ',
        logo: '/logo2.png'
      }
    }
  ]

  useEffect(() => {
    fetchJobs()
  }, [pagination.page, filters])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const response = await adminApi.jobs.getAllJobs({
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
        status: filters.status as 'all' | 'active' | 'inactive',
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder as 'asc' | 'desc'
      })
      
      if (response.success && response.data) {
        setJobs(response.data.jobs)
        setPagination(prev => ({
          ...prev,
          total: response.data!.pagination.total,
          totalPages: response.data!.pagination.totalPages
        }))
      } else {
        toast.error(response.message || 'Failed to fetch jobs')
      }
    } catch (error) {
      toast.error('Failed to fetch jobs')
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewJob = (jobId: string) => {
    navigate(`/admin/jobs/${jobId}`)
  }

  const handleToggleStatus = async (jobId: string, currentStatus: boolean) => {
    try {
      const response = await adminApi.jobs.updateJobStatus(jobId, !currentStatus)
      
      if (response.success) {
        setJobs(jobs.map(job => 
          job.id === jobId 
            ? { ...job, is_active: !currentStatus }
            : job
        ))
        toast.success(`Job ${!currentStatus ? 'activated' : 'deactivated'} successfully`)
      } else {
        toast.error(response.message || 'Failed to update job status')
      }
    } catch (error) {
      toast.error('Failed to update job status')
      console.error('Error updating job status:', error)
    }
  }

  const handleDeleteJob = async () => {
    if (!deleteDialog.jobId) return

    try {
      const response = await adminApi.jobs.deleteJob(deleteDialog.jobId)
      
      if (response.success) {
        setJobs(jobs.filter(job => job.id !== deleteDialog.jobId))
        setDeleteDialog({ isOpen: false, jobId: null, jobTitle: '' })
        toast.success('Job deleted successfully')
      } else {
        toast.error(response.message || 'Failed to delete job')
      }
    } catch (error) {
      toast.error('Failed to delete job')
      console.error('Error deleting job:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatSalary = (salary: { min: number; max: number }) => {
    return `₹${salary.min.toLocaleString()} - ₹${salary.max.toLocaleString()}`
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Job Management</h1>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              Total: {pagination.total}
            </Badge>
            <Badge variant="outline" className="text-green-600 border-green-200">
              Active: {jobs.filter(job => job.is_active).length}
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search jobs by title..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Created Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="application_count">Applications</SelectItem>
                  <SelectItem value="view_count">Views</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">{job.title}</div>
                            <div className="text-sm text-gray-500">
                              {job.employment_types.join(', ')}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{job.company?.companyName || 'Unknown'}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{job.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <IndianRupee className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{formatSalary(job.salary)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={job.is_active ? "default" : "secondary"}
                            className={job.is_active 
                              ? "bg-green-100 text-green-800 border-green-200" 
                              : "bg-gray-100 text-gray-800 border-gray-200"
                            }
                          >
                            {job.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{job.application_count} applications</div>
                            <div className="text-gray-500">{job.view_count} views</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{formatDate(job.createdAt)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewJob(job.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleToggleStatus(job.id, job.is_active)}
                              >
                                {job.is_active ? (
                                  <>
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => setDeleteDialog({
                                  isOpen: true,
                                  jobId: job.id,
                                  jobTitle: job.title
                                })}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {jobs.length === 0 && !loading && (
              <div className="text-center py-8">
                <p className="text-gray-500">No jobs found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
              {pagination.total} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, jobId: null, jobTitle: '' })}
        onConfirm={handleDeleteJob}
        title="Delete Job"
        description={`Are you sure you want to delete "${deleteDialog.jobTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </AdminLayout>
  )
}

export default JobManagement
