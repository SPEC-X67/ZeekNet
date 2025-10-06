import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft,
  Building2,
  MapPin,
  IndianRupee,
  Calendar,
  Users,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  Clock,
  Briefcase,
  Target,
  Award,
  Heart,
  Code,
  Globe
} from 'lucide-react'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import { toast } from 'sonner'
import { adminApi } from '@/api/admin.api'
import type { JobPostingResponse } from '@/types/job'

const JobView = () => {
  const { jobId } = useParams<{ jobId: string }>()
  const navigate = useNavigate()
  const [job, setJob] = useState<JobPostingResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialog, setDeleteDialog] = useState(false)

  const mockJob: JobPostingResponse = {
    id: jobId || '1',
    company_id: 'comp1',
    title: 'Senior React Developer',
    description: `We are looking for a passionate Senior React Developer to join our dynamic team. 
    You will be responsible for developing user interface components and implementing them following 
    well-known React.js workflows. You will ensure that these components and the overall application 
    are robust and easy to maintain. You will coordinate with the rest of the team working on different 
    layers of the infrastructure. Therefore, a commitment to collaborative problem solving, sophisticated 
    design, and quality products is important.`,
    responsibilities: [
      'Develop new user-facing features using React.js',
      'Build reusable components and front-end libraries for future use',
      'Translate designs and wireframes into high quality code',
      'Optimize components for maximum performance across a vast array of web-capable devices and browsers',
      'Coordinate with various teams working on different layers of the infrastructure',
      'Participate in code reviews and maintain high code quality standards'
    ],
    qualifications: [
      '5+ years of experience in React.js development',
      'Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model',
      'Thorough understanding of React.js and its core principles',
      'Experience with popular React.js workflows (such as Flux or Redux)',
      'Familiarity with newer specifications of EcmaScript',
      'Experience with data structure libraries (e.g., Immutable.js)',
      'Knowledge of isomorphic React is a plus',
      'Familiarity with RESTful APIs',
      'Knowledge of modern authorization mechanisms, such as JSON Web Token',
      'Familiarity with modern front-end build pipelines and tools'
    ],
    nice_to_haves: [
      'Experience with TypeScript',
      'Knowledge of Next.js framework',
      'Experience with testing frameworks (Jest, React Testing Library)',
      'Familiarity with GraphQL',
      'Experience with CI/CD pipelines',
      'Knowledge of accessibility standards (WCAG)'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      'Flexible work hours and remote work options',
      'Professional development budget',
      '401(k) with company matching',
      'Unlimited paid time off',
      'Top-tier equipment and home office setup',
      'Team building events and company retreats'
    ],
    salary: { min: 80000, max: 120000 },
    employment_types: ['Full-time', 'Remote'],
    location: 'New York, NY',
    skills_required: ['React', 'JavaScript', 'CSS', 'HTML', 'Redux', 'TypeScript'],
    category_ids: ['tech', 'frontend'],
    is_active: true,
    view_count: 150,
    application_count: 25,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    company: {
      companyName: 'TechCorp Inc',
      logo: '/logo.png',
      workplacePictures: [
        { pictureUrl: '/office1.jpg', caption: 'Modern office space' },
        { pictureUrl: '/office2.jpg', caption: 'Collaboration area' }
      ]
    }
  }

  useEffect(() => {
    fetchJob()
  }, [jobId])

  const fetchJob = async () => {
    if (!jobId) return
    
    setLoading(true)
    try {
      const response = await adminApi.jobs.getJobById(jobId)
      
      if (response.success && response.data) {
        setJob(response.data)
      } else {
        toast.error(response.message || 'Failed to fetch job details')
      }
    } catch (error) {
      toast.error('Failed to fetch job details')
      console.error('Error fetching job:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async () => {
    if (!job) return

    try {
      const response = await adminApi.jobs.updateJobStatus(job.id, !job.is_active)
      
      if (response.success) {
        setJob({ ...job, is_active: !job.is_active })
        toast.success(`Job ${!job.is_active ? 'activated' : 'deactivated'} successfully`)
      } else {
        toast.error(response.message || 'Failed to update job status')
      }
    } catch (error) {
      toast.error('Failed to update job status')
      console.error('Error updating job status:', error)
    }
  }

  const handleDeleteJob = async () => {
    if (!job) return

    try {
      const response = await adminApi.jobs.deleteJob(job.id)
      
      if (response.success) {
        toast.success('Job deleted successfully')
        navigate('/admin/jobs')
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatSalary = (salary: { min: number; max: number }) => {
    return `₹${salary.min.toLocaleString()} - ₹${salary.max.toLocaleString()}`
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  if (!job) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <p className="text-gray-500">Job not found</p>
          <Button onClick={() => navigate('/admin/jobs')} className="mt-4">
            Back to Jobs
          </Button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin/jobs')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{job.title}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <Badge 
                  variant={job.is_active ? "default" : "secondary"}
                  className={job.is_active 
                    ? "bg-green-100 text-green-800 border-green-200" 
                    : "bg-gray-100 text-gray-800 border-gray-200"
                  }
                >
                  {job.is_active ? 'Active' : 'Inactive'}
                </Badge>
                <span className="text-sm text-gray-500">
                  Posted {formatDate(job.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={handleToggleStatus}
              className={job.is_active ? "text-red-600 border-red-200" : "text-green-600 border-green-200"}
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
            </Button>
            <Button
              variant="destructive"
              onClick={() => setDeleteDialog(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Job Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">Company:</span>
                    <span className="text-sm">{job.company?.companyName || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">Location:</span>
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">Salary:</span>
                    <span className="text-sm">{formatSalary(job.salary)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">Type:</span>
                    <span className="text-sm">{job.employment_types.join(', ')}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Job Description</h3>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{job.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Responsibilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Qualifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Required Qualifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.qualifications.map((qualification, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{qualification}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Nice to Haves */}
            {job.nice_to_haves.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Nice to Have</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.nice_to_haves.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Benefits & Perks</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Job Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Views</span>
                  </div>
                  <span className="font-medium">{job.view_count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Applications</span>
                  </div>
                  <span className="font-medium">{job.application_count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Created</span>
                  </div>
                  <span className="font-medium text-sm">{formatDate(job.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Updated</span>
                  </div>
                  <span className="font-medium text-sm">{formatDate(job.updatedAt)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Skills Required */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Skills Required</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills_required.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-blue-600 border-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Company</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  {job.company?.logo && (
                    <img 
                      src={job.company.logo} 
                      alt={job.company.companyName}
                      className="w-16 h-16 mx-auto rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-medium">{job.company?.companyName || 'Unknown Company'}</h3>
                    <p className="text-sm text-gray-500">Company ID: {job.company_id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        onConfirm={handleDeleteJob}
        title="Delete Job"
        description={`Are you sure you want to delete "${job.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </AdminLayout>
  )
}

export default JobView
