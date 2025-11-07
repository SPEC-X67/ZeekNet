import CompanyLayout from '../../components/layouts/CompanyLayout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loading } from '@/components/ui/loading'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { companyApi } from '@/api/company.api'
import { toast } from 'sonner'
import { 
  Search,
  Filter,
  Star,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  SortAsc
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Application {
  _id: string
  seeker_id: string
  seeker_name: string
  seeker_avatar?: string
  job_id: string
  job_title: string
  score?: number
  stage: 'applied' | 'shortlisted' | 'interview' | 'rejected' | 'hired'
  applied_date: string
  resume_url?: string
}

interface ApplicationsResponse {
  applications: Application[]
  total: number
  page: number
  limit: number
}

const AllApplications = () => {
  const navigate = useNavigate()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  const fetchApplications = async (page: number = 1, limit: number = 10, search: string = '') => {
    try {
      setLoading(true)
      
      // TODO: Replace with actual API call when backend endpoint is ready
      // const response = await companyApi.getApplications({ page, limit, search })
      
      // Mock data for now - replace with actual API response
      const mockApplications: Application[] = [
        {
          _id: '1',
          seeker_id: 's1',
          seeker_name: 'Jake Gyll',
          seeker_avatar: undefined,
          job_id: 'j1',
          job_title: 'Designer',
          score: 4.0,
          stage: 'shortlisted',
          applied_date: '2021-07-13',
        },
        {
          _id: '2',
          seeker_id: 's2',
          seeker_name: 'Guy Hawkins',
          seeker_avatar: undefined,
          job_id: 'j2',
          job_title: 'JavaScript Dev',
          score: 0.0,
          stage: 'shortlisted',
          applied_date: '2021-07-13',
        },
        {
          _id: '3',
          seeker_id: 's3',
          seeker_name: 'Cyndy Lillibridge',
          seeker_avatar: undefined,
          job_id: 'j3',
          job_title: 'Golang Dev',
          score: 4.5,
          stage: 'shortlisted',
          applied_date: '2021-07-12',
        },
      ]

      // Filter by search query
      const filtered = searchQuery 
        ? mockApplications.filter(app => 
            app.seeker_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.job_title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : mockApplications

      const total = filtered.length
      const startIndex = (page - 1) * limit
      const paginated = filtered.slice(startIndex, startIndex + limit)

      setApplications(paginated)
      setPagination({
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      })
    } catch (error) {
      toast.error('Failed to fetch applications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications(pagination.page, pagination.limit, searchQuery)
  }, [pagination.page])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    fetchApplications(1, pagination.limit, query)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(applications.map(app => app._id))
    } else {
      setSelectedApplications([])
    }
  }

  const handleSelectApplication = (applicationId: string, checked: boolean) => {
    if (checked) {
      setSelectedApplications([...selectedApplications, applicationId])
    } else {
      setSelectedApplications(selectedApplications.filter(id => id !== applicationId))
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  const getStageBadge = (stage: string) => {
    const stageMap: Record<string, { label: string; className: string }> = {
      applied: { label: 'Applied', className: 'border-[#4640DE] text-[#4640DE]' },
      shortlisted: { label: 'Shortlisted', className: 'border-[#4640DE] text-[#4640DE]' },
      interview: { label: 'Interview', className: 'border-[#FFB836] text-[#FFB836]' },
      rejected: { label: 'Rejected', className: 'border-red-500 text-red-500' },
      hired: { label: 'Hired', className: 'border-[#56CDAD] text-[#56CDAD]' },
    }
    
    const stageInfo = stageMap[stage] || stageMap.applied
    return (
      <Badge
        variant="outline"
        className={`${stageInfo.className} bg-transparent px-2.5 py-1 rounded-full text-xs font-semibold`}
      >
        {stageInfo.label}
      </Badge>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchApplications(newPage, pagination.limit, searchQuery)
    }
  }

  const handleSeeApplication = (applicationId: string) => {
    navigate(`/company/applicants/${applicationId}`)
  }

  const allSelected = applications.length > 0 && selectedApplications.length === applications.length
  const someSelected = selectedApplications.length > 0 && selectedApplications.length < applications.length

  return (
    <CompanyLayout>
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="px-7 py-7 border-b border-[#D6DDEB]">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-[#25324B]">
              Total Applicants : {pagination.total}
            </h1>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7C8493]" />
              <Input
                type="text"
                placeholder="Search Applicants"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 border-[#D6DDEB] rounded-lg"
              />
            </div>
            <Button
              variant="outline"
              className="border-[#D6DDEB] text-[#25324B] rounded-lg"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="px-7 py-5">
          <div className="border border-[#D6DDEB] rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-white border-b border-[#D6DDEB] px-5 py-4">
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={handleSelectAll}
                    className={someSelected ? 'opacity-50' : ''}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#7C8493]">Full Name</span>
                    <SortAsc className="w-4 h-4 text-[#7C8493]" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#7C8493]">Score</span>
                  <SortAsc className="w-4 h-4 text-[#7C8493]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#7C8493]">Hiring Stage</span>
                  <SortAsc className="w-4 h-4 text-[#7C8493]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#7C8493]">Applied Date</span>
                  <SortAsc className="w-4 h-4 text-[#7C8493]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#7C8493]">Job Role</span>
                  <SortAsc className="w-4 h-4 text-[#7C8493]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#7C8493]">Action</span>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[#D6DDEB]">
              {loading ? (
                <div className="px-5 py-10 flex justify-center">
                  <Loading />
                </div>
              ) : applications.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-[#7C8493]">No applications found</p>
                </div>
              ) : (
                applications.map((application, index) => (
                  <div
                    key={application._id}
                    className={`px-5 py-4 grid grid-cols-6 gap-4 items-center ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#F8F8FD]'
                    }`}
                  >
                    {/* Full Name */}
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedApplications.includes(application._id)}
                        onCheckedChange={(checked) => handleSelectApplication(application._id, checked as boolean)}
                      />
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          {application.seeker_avatar ? (
                            <AvatarImage src={application.seeker_avatar} alt={application.seeker_name} />
                          ) : null}
                          <AvatarFallback className="bg-[#4640DE]/10 text-[#4640DE] text-sm font-semibold">
                            {getInitials(application.seeker_name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-[#25324B]">
                          {application.seeker_name}
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-[#FFB836] fill-[#FFB836]" />
                      <span className="text-sm font-medium text-[#25324B]">
                        {application.score?.toFixed(1) || '0.0'}
                      </span>
                    </div>

                    {/* Hiring Stage */}
                    <div>
                      {getStageBadge(application.stage)}
                    </div>

                    {/* Applied Date */}
                    <span className="text-sm font-medium text-[#25324B]">
                      {formatDate(application.applied_date)}
                    </span>

                    {/* Job Role */}
                    <span className="text-sm font-medium text-[#25324B]">
                      {application.job_title}
                    </span>

                    {/* Action */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#4640DE] text-[#4640DE] bg-[#CCCCF5] hover:bg-[#4640DE] hover:text-white rounded-lg text-xs px-3 py-1.5"
                        onClick={() => handleSeeApplication(application._id)}
                      >
                        See Application
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4 text-[#25324B]" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleSeeApplication(application._id)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pagination */}
          {!loading && applications.length > 0 && (
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#7C8493]">View</span>
                <div className="flex items-center gap-1 px-3 py-2 border border-[#D6DDEB] rounded-lg bg-white">
                  <Filter className="w-4 h-4 text-[#25324B]" />
                  <span className="text-xs font-medium text-[#25324B]">{pagination.limit}</span>
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
                    const pageNum = i + 1
                    const isActive = pageNum === pagination.page
                    
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
                    )
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
          )}
        </div>
      </div>
    </CompanyLayout>
  )
}

export default AllApplications

