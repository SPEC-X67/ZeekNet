import CompanyLayout from '../../components/layouts/CompanyLayout'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { companyApi } from '@/api/company.api'
import type { JobPostingResponse, JobPostingQuery } from '@/types/job'
import { Loading } from '@/components/ui/loading'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import { toast } from 'sonner'
import { 
  Calendar,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  EyeOff,
  List
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
};

const getStatusBadge = (isActive: boolean) => {
  return isActive ? 'Live' : 'Unlisted';
};

const formatEmploymentTypes = (types: string[]) => {
  if (types.length === 0) return 'Fulltime';
  return types.map(type => 
    type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')
  ).join(', ');
};

const CompanyJobListing = () => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState<JobPostingResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean
    jobId: string | null
    jobTitle: string
    isLoading: boolean
  }>({
    isOpen: false,
    jobId: null,
    jobTitle: '',
    isLoading: false
  })

  const fetchJobs = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true)
      setError(null)
      
      const query: JobPostingQuery = {
        page,
        limit
      }
      
      const response = await companyApi.getJobPostings(query)
      
      if (response.success && response.data) {
        setJobs(response.data.jobs)
        setPagination({
          page: response.data.page,
          limit: response.data.limit,
          total: response.data.total,
          totalPages: Math.ceil(response.data.total / response.data.limit)
        })
      } else {
        setError(response.message || 'Failed to fetch jobs')
      }
    } catch {
      setError('Failed to fetch jobs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleJobClick = (jobId: string) => {
    navigate(`/company/job-details/${jobId}`)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchJobs(newPage, pagination.limit)
    }
  }

  const handleViewJob = (jobId: string) => {
    navigate(`/company/job-details/${jobId}`)
  }

  const handleEditJob = (jobId: string) => {
    navigate(`/company/edit-job/${jobId}`)
  }

  const handleDeleteJob = (jobId: string, jobTitle: string) => {
    setDeleteDialog({
      isOpen: true,
      jobId,
      jobTitle,
      isLoading: false
    })
  }

  const confirmDeleteJob = async () => {
    if (!deleteDialog.jobId) return

    try {
      setDeleteDialog(prev => ({ ...prev, isLoading: true }))

      const previousJobs = [...jobs]
      setJobs(prevJobs => prevJobs.filter(job => job._id !== deleteDialog.jobId))
      setPagination(prev => ({ ...prev, total: prev.total - 1 }))
      
      const response = await companyApi.deleteJobPosting(deleteDialog.jobId)
      
      if (response.success) {
        toast.success('Job deleted successfully', {
          description: `"${deleteDialog.jobTitle}" has been deleted.`
        })
        setDeleteDialog({
          isOpen: false,
          jobId: null,
          jobTitle: '',
          isLoading: false
        })
      } else {
        setJobs(previousJobs)
        setPagination(prev => ({ ...prev, total: prev.total + 1 }))
        toast.error('Failed to delete job', {
          description: response.message || 'Please try again later.'
        })
      }
    } catch {
      toast.error('Failed to delete job', {
        description: 'An unexpected error occurred. Please try again.'
      })
      await fetchJobs(pagination.page, pagination.limit) 
    } finally {
      setDeleteDialog(prev => ({ ...prev, isLoading: false }))
    }
  }

  const cancelDeleteJob = () => {
    setDeleteDialog({
      isOpen: false,
      jobId: null,
      jobTitle: '',
      isLoading: false
    })
  }

  const handleToggleJobStatus = async (jobId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus
    const statusText = newStatus ? 'listed' : 'unlisted'
    
    try {
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job._id === jobId ? { ...job, is_active: newStatus } : job
        )
      )
      
      const response = await companyApi.updateJobStatus(jobId, newStatus)
      
      if (response.success) {
        toast.success(`Job ${statusText} successfully`, {
          description: `The job status has been updated.`
        })
      } else {
        setJobs(prevJobs => 
          prevJobs.map(job => 
            job._id === jobId ? { ...job, is_active: currentStatus } : job
          )
        )
        toast.error('Failed to update job status', {
          description: response.message || 'Please try again later.'
        })
      }
    } catch (error: any) {
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job._id === jobId ? { ...job, is_active: currentStatus } : job
        )
      )
      const errorMessage = error?.response?.data?.message || 'An unexpected error occurred. Please try again.'
      toast.error('Failed to update job status', {
        description: errorMessage
      })
    }
  }

  return (
    <CompanyLayout>
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-between px-7 py-7">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold text-[#25324B]">Job Listing</h1>
            <p className="text-sm font-medium text-[#7C8493]">
              Here is your jobs listing status from July 19 - July 25.
            </p>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 border border-[#D6DDEB] rounded-lg bg-white">
            <Calendar className="w-4 h-4 text-[#4640DE]" />
            <span className="text-sm text-[#25324B]">Jul 19 - Jul 25</span>
          </div>
        </div>

        <div className="px-5 pb-5">
          <Card className="border border-[#D6DDEB] rounded-lg">
            <CardHeader className="border-b border-[#D6DDEB]">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-[#25324B]">
                  Job List
                </CardTitle>
                <div className="flex items-center gap-1 px-5 py-3 border border-[#D6DDEB] rounded-lg bg-white">
                  <Filter className="w-4 h-4 text-[#25324B]" />
                  <span className="text-xs font-medium text-[#25324B]">Filters</span>
                </div>
              </div>
            </CardHeader>

            <div className="px-5 py-2 border-b border-[#D6DDEB]">
              <div className="grid grid-cols-6 gap-10 text-md font-medium text-[#202430] opacity-60">
                <div className="w-[248px]">Roles</div>
                <div className="w-[111px]">Status</div>
                <div className="w-[149px]">Date Posted</div>
                <div className="w-[128px]">Job Type</div>
                <div className="w-[114px]">Applicants</div>
                <div className="w-[98px]">Views</div>
              </div>
            </div>

            <div className="divide-y divide-[#D6DDEB]">
              {loading ? (
                <div className="px-5 py-10 flex justify-center">
                  <Loading />
                </div>
              ) : error ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-red-500">{error}</p>
                  <Button 
                    onClick={() => fetchJobs(pagination.page, pagination.limit)}
                    className="mt-2"
                    variant="outline"
                  >
                    Retry
                  </Button>
                </div>
              ) : jobs.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-gray-500">No jobs found</p>
                </div>
              ) : (
                jobs.map((job, index) => (
                  <div
                    key={job._id}
                    className={`px-5 py-5 grid grid-cols-6 gap-10 items-center ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#F8F8FD]'
                    }`}
                  >

                    <div className="w-[248px]">
                      <button 
                        onClick={() => handleJobClick(job._id)}
                        className="text-sm font-medium text-[#25324B] hover:text-[#4640DE] transition-colors text-left"
                      >
                        {job.title}
                      </button>
                    </div>

                    <div className="w-[111px]">
                      {job.admin_blocked ? (
                        <div className="space-y-1">
                          <Badge
                            variant="outline"
                            className="px-2 py-1 rounded-full text-xs font-semibold border-red-500 text-red-500 bg-transparent"
                          >
                            Blocked
                          </Badge>
                          {job.unpublish_reason && (
                            <div 
                              className="text-[10px] text-red-600 truncate max-w-[100px]" 
                              title={job.unpublish_reason}
                            >
                              {job.unpublish_reason.length > 20 
                                ? `${job.unpublish_reason.substring(0, 20)}...` 
                                : job.unpublish_reason}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Badge
                          variant="outline"
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            job.is_active 
                              ? 'border-[#56CDAD] text-[#56CDAD] bg-transparent' 
                              : 'border-[#FFB836] text-[#FFB836] bg-transparent'
                          }`}
                        >
                          {getStatusBadge(job.is_active)}
                        </Badge>
                      )}
                    </div>

                    <div className="w-[149px]">
                      <span className="text-xs text-[#25324B]">{formatDate(job.createdAt)}</span>
                    </div>

                    <div className="w-[128px]">
                      <Badge
                        variant="outline"
                        className="border-[#4640DE] text-[#4640DE] bg-transparent px-2 py-1 rounded-full text-xs font-semibold"
                      >
                        {formatEmploymentTypes(job.employment_types)}
                      </Badge>
                    </div>

                    <div className="w-[114px]">
                      <span className="text-xs text-[#25324B]">{(job.application_count || 0).toLocaleString()}</span>
                    </div>

                    <div className="w-[98px] flex items-center justify-between">
                      <span className="text-xs text-[#25324B]">{(job.view_count || 0).toLocaleString()}</span>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="w-4 h-4 text-[#25324B]" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleViewJob(job._id)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditJob(job._id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleToggleJobStatus(job._id, job.is_active)}
                            disabled={job.admin_blocked}
                            className={job.is_active ? 'text-orange-600' : 'text-green-600'}
                          >
                            {job.is_active ? (
                              <>
                                <EyeOff className="w-4 h-4 mr-2" />
                                Unlist
                              </>
                            ) : (
                              <>
                                <List className="w-4 h-4 mr-2" />
                                {job.admin_blocked ? 'List (Blocked)' : 'List'}
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteJob(job._id, job.title)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="px-3 py-3 border-t border-[#D6DDEB]">
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-[#7C8493]">View</span>
                  <div className="flex items-center gap-1 px-3 py-2 border border-[#D6DDEB] rounded-lg bg-white">
                    <Filter className="w-4 h-4 text-[#25324B]" />
                    <span className="text-xs font-medium text-[#25324B]">10</span>
                  </div>
                  <span className="text-xs font-medium text-[#7C8493]">Applicants per page</span>
                </div>

                <div className="flex items-center gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="p-1"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                  >
                    <ChevronLeft className="w-4 h-4 text-[#25324B]" />
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      const isActive = pageNum === pagination.page;
                      
                      return (
                        <Button 
                          key={pageNum}
                          variant="outline" 
                          size="sm" 
                          className={`px-2 py-1 ${
                            isActive 
                              ? 'bg-[#4640DE] text-white border-[#4640DE]' 
                              : 'text-[#515B6F] border-[#D6DDEB]'
                          }`}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="p-1"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages}
                  >
                    <ChevronRight className="w-4 h-4 text-[#25324B]" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <ConfirmationDialog
          isOpen={deleteDialog.isOpen}
          onClose={cancelDeleteJob}
          onConfirm={confirmDeleteJob}
          title="Delete Job Posting"
          description={`Are you sure you want to delete "${deleteDialog.jobTitle}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
          isLoading={deleteDialog.isLoading}
        />
      </div>
    </CompanyLayout>
  )
}

export default CompanyJobListing