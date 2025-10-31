import CompanyLayout from '../../components/layouts/CompanyLayout'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/ui/loading'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { companyApi } from '@/api/company.api'
import { toast } from 'sonner'
import { 
  ArrowLeft,
  ChevronDown,
  Plus,
  CircleCheck,
  Heart,
  Coffee,
  Car,
  Users,
  GraduationCap,
  Mountain,
  Globe,
  AlertTriangle
} from 'lucide-react'

const JobDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [jobData, setJobData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!id) {
        toast.error('Job ID not found')
        navigate('/company/job-listing')
        return
      }

      try {
        setLoading(true)
        const response = await companyApi.getJobPosting(id)
        
        if (response.success && response.data) {
          setJobData(response.data)
        } else {
          toast.error('Failed to load job details')
          navigate('/company/job-listing')
        }
      } catch {
        toast.error('Failed to load job details')
        navigate('/company/job-listing')
      } finally {
        setLoading(false)
      }
    }

    fetchJobDetails()
  }, [id, navigate])

  if (loading) {
    return (
      <CompanyLayout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <Loading />
        </div>
      </CompanyLayout>
    )
  }

  if (!jobData) {
    return (
      <CompanyLayout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Job not found</h2>
            <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/company/job-listing')}>
              Back to Job Listings
            </Button>
          </div>
        </div>
      </CompanyLayout>
    )
  }

  const responsibilities = jobData.responsibilities || []
  const whoYouAre = jobData.qualifications || []
  const niceToHaves = jobData.nice_to_haves || []
  const requiredSkills = jobData.skills_required || []
  const benefits = jobData.benefits || []

  const benefitsList = [
    {
      icon: Heart,
      title: 'Full Healthcare',
      description: 'We believe in thriving communities and that starts with our team being happy and healthy.'
    },
    {
      icon: Mountain,
      title: 'Unlimited Vacation',
      description: 'We believe you should have a flexible schedule that makes space for family, wellness, and fun.'
    },
    {
      icon: GraduationCap,
      title: 'Skill Development',
      description: 'We believe in always learning and leveling up our skills. Whether it\'s a conference or online course.'
    },
    {
      icon: Users,
      title: 'Team Summits',
      description: 'Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.'
    },
    {
      icon: Coffee,
      title: 'Remote Working',
      description: 'You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it.'
    },
    {
      icon: Car,
      title: 'Commuter Benefits',
      description: 'We\'re grateful for all the time and energy each team member puts into getting to work every day.'
    },
    {
      icon: Globe,
      title: 'We give back.',
      description: 'We anonymously match any donation our employees make (up to ₹50,000) so they can support the organizations they care about most—times two.'
    }
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatSalary = () => {
    if (jobData.salary?.min && jobData.salary?.max) {
      return `₹${jobData.salary.min.toLocaleString()}-₹${jobData.salary.max.toLocaleString()}`
    }
    return 'Salary not specified'
  }

  const getEmploymentType = () => {
    return jobData.employment_types?.[0] || 'Not specified'
  }

  return (
    <CompanyLayout>
      <div className="min-h-screen bg-white">
        {}
        <div className="border-b border-[#D6DDEB]">
          <div className="px-2 py-2 ">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1.5"
                  onClick={() => navigate('/company/job-listing')}
                >
                  <ArrowLeft className="w-4 h-4 text-[#25324B]" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-[#25324B] mb-1.5">{jobData.title}</h1>
                  <div className="flex items-center gap-1.5 text-base text-[#25324B]">
                    <span>{jobData.location || 'Location not specified'}</span>
                    <div className="w-0.5 h-0.5 bg-[#25324B] rounded-full"></div>
                    <span>{getEmploymentType()}</span>
                    <div className="w-0.5 h-0.5 bg-[#25324B] rounded-full"></div>
                    <span>{jobData.application_count || 0} applied</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="border-[#CCCCF5] text-[#4640DE] text-sm px-3 py-1.5">
                <ChevronDown className="w-4 h-4 mr-1.5" />
                More Action
              </Button>
            </div>
          </div>
        </div>

        {}
        <div className="border-b border-[#D6DDEB]">
          <div className="px-7">
            <div className="flex gap-9">
              <button className="py-3.5 text-sm font-medium text-[#7C8493] border-b-2 border-transparent">
                Applicants
              </button>
              <button className="py-3.5 text-sm font-semibold text-[#25324B] border-b-2 border-[#4640DE]">
                Job Details
              </button>
              <button className="py-3.5 text-sm font-medium text-[#7C8493] border-b-2 border-transparent">
                Analytics
              </button>
            </div>
          </div>
        </div>

        {}
        {jobData.admin_blocked && (
          <div className="px-7 py-4 bg-yellow-50 border-b border-yellow-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-yellow-800 mb-1">
                  This job has been blocked by admin
                </h3>
                {jobData.unpublish_reason && (
                  <p className="text-sm text-yellow-700">
                    Reason: {jobData.unpublish_reason}
                  </p>
                )}
                <p className="text-xs text-yellow-600 mt-1">
                  The job is not visible to job seekers. Please review and update the job details or contact admin for more information.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="px-7 py-7">
          {}
          <Card className="border border-[#D6DDEB] rounded-lg mb-7">
            <CardContent className="p-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-[#C4C4C4] rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-[#1ED760] rounded-full"></div>
                  </div>
                  <h2 className="text-2xl font-semibold text-[#25324B]">{jobData.title}</h2>
                </div>
                <Button variant="outline" className="border-[#CCCCF5] text-[#4640DE] text-sm px-3 py-1.5">
                  <Plus className="w-4 h-4 mr-1.5" />
                  Edit Job Details
                </Button>
              </div>
            </CardContent>
          </Card>

          {}
          <div className="grid grid-cols-3 gap-7">
            {}
            <div className="col-span-2 space-y-9">
              {}
              <div>
                <h3 className="text-xl font-semibold text-[#25324B] mb-3.5">Description</h3>
                <p className="text-sm text-[#515B6F] leading-relaxed">{jobData.description || 'No description provided'}</p>
              </div>

              {}
              <div>
                <h3 className="text-xl font-semibold text-[#25324B] mb-3.5">Responsibilities</h3>
                <div className="space-y-3.5">
                  {responsibilities.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <CircleCheck className="w-5 h-5 text-[#56CDAD] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-[#515B6F]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {}
              <div>
                <h3 className="text-xl font-semibold text-[#25324B] mb-3.5">Who You Are</h3>
                <div className="space-y-3.5">
                  {whoYouAre.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <CircleCheck className="w-5 h-5 text-[#56CDAD] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-[#515B6F]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {}
              <div>
                <h3 className="text-xl font-semibold text-[#25324B] mb-3.5">Nice-To-Haves</h3>
                <div className="space-y-3.5">
                  {niceToHaves.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <CircleCheck className="w-5 h-5 text-[#56CDAD] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-[#515B6F]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {}
            <div className="space-y-7">
              {}
              <Card className="border border-[#D6DDEB] rounded-lg">
                <CardContent className="p-3.5">
                  <h3 className="text-xl font-semibold text-[#25324B] mb-5">About this role</h3>
                  
                  {}
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-semibold text-[#25324B]">{jobData.application_count || 0} applied</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#F8F8FD] rounded-lg overflow-hidden">
                      <div className="h-full bg-[#56CDAD] rounded-l-lg" style={{ width: '50%' }}></div>
                    </div>
                  </div>

                  {}
                  <div className="space-y-3.5">
                    <div className="flex justify-between">
                      <span className="text-sm text-[#515B6F]">Job Posted On</span>
                      <span className="text-sm font-semibold text-[#25324B]">{formatDate(jobData.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#515B6F]">Last Updated</span>
                      <span className="text-sm font-semibold text-[#25324B]">{formatDate(jobData.updatedAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#515B6F]">Job Type</span>
                      <span className="text-sm font-semibold text-[#25324B]">{getEmploymentType()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#515B6F]">Salary</span>
                      <span className="text-sm font-semibold text-[#202430]">{formatSalary()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#515B6F]">Location</span>
                      <span className="text-sm font-semibold text-[#25324B]">{jobData.location || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#515B6F]">Status</span>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-sm font-semibold text-[#25324B]">{jobData.is_active ? 'Active' : 'Inactive'}</span>
                        {jobData.admin_blocked && (
                          <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">
                            Admin Blocked
                          </Badge>
                        )}
                      </div>
                    </div>
                    {jobData.admin_blocked && jobData.unpublish_reason && (
                      <div className="flex justify-between pt-2 border-t border-[#D6DDEB]">
                        <span className="text-sm text-[#515B6F]">Block Reason</span>
                        <span className="text-sm font-semibold text-red-600 max-w-[60%] text-right">
                          {jobData.unpublish_reason}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {}
              <Card className="border border-[#D6DDEB] rounded-lg">
                <CardContent className="p-3.5">
                  <h3 className="text-xl font-semibold text-[#25324B] mb-5">Categories</h3>
                  <div className="flex gap-1.5">
                    {jobData.category_ids && jobData.category_ids.length > 0 ? (
                      jobData.category_ids.map((category: string, index: number) => (
                        <Badge key={index} className="bg-[#EB8533]/10 text-[#FFB836] border-0 px-2.5 py-1 rounded-full text-xs">
                          {category}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-[#515B6F]">No categories specified</span>
                    )}
                  </div>
                </CardContent>
              </Card>

              {}
              <Card className="border border-[#D6DDEB] rounded-lg">
                <CardContent className="p-3.5">
                  <h3 className="text-xl font-semibold text-[#25324B] mb-5">Required Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {requiredSkills.length > 0 ? (
                      requiredSkills.map((skill: string, index: number) => (
                        <Badge 
                          key={index}
                          variant="outline" 
                          className="bg-[#F8F8FD] text-[#4640DE] border-0 px-2.5 py-1 rounded-lg text-xs"
                        >
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-[#515B6F]">No skills specified</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {}
          <div className="w-full h-px bg-[#D6DDEB] my-7"></div>

          {}
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-semibold text-[#25324B] mb-1.5">Perks & Benefits</h3>
              <p className="text-sm text-[#515B6F]">This job comes with several perks and benefits</p>
            </div>

            {}
            {benefits.length > 0 ? (
              <div className="grid grid-cols-3 gap-7">
                {benefits.map((benefit: string, index: number) => (
                  <Card key={index} className="border border-[#D6DDEB] rounded-lg">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-5">
                        <div className="w-10 h-10 bg-[#4640DE]/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Heart className="w-5 h-5 text-[#4640DE]" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-[#25324B] mb-2.5">Benefit</h4>
                          <p className="text-sm text-[#515B6F] leading-relaxed">{benefit}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-7">
                {benefitsList.slice(0, 3).map((benefit, index) => (
                  <Card key={index} className="border border-[#D6DDEB] rounded-lg">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-5">
                        <div className="w-10 h-10 bg-[#4640DE]/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-5 h-5 text-[#4640DE]" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-[#25324B] mb-2.5">{benefit.title}</h4>
                          <p className="text-sm text-[#515B6F] leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </CompanyLayout>
  )
}

export default JobDetails