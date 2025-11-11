import CompanyLayout from '../../components/layouts/CompanyLayout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loading } from '@/components/ui/loading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { jobApplicationApi } from '@/api'
import { toast } from 'sonner'
import { 
  ArrowLeft,
  ChevronDown,
  Star,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Globe,
  Calendar,
  MoreVertical,
  Download,
  Plus,
  MoreHorizontal,
  Clock,
  MapPin
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'

interface ApplicationDetails {
  _id: string
  seeker_id: string
  seeker_name: string
  seeker_avatar?: string
  seeker_headline?: string
  job_id: string
  job_title: string
  job_company?: string
  job_location?: string
  job_type?: string
  score?: number
  stage: 'applied' | 'shortlisted' | 'interview' | 'rejected' | 'hired'
  applied_date: string
  resume_url?: string
  // Personal Info
  full_name?: string
  date_of_birth?: string
  gender?: string
  languages?: string[]
  address?: string
  // Professional Info
  about_me?: string
  current_job?: string
  highest_qualification?: string
  experience_years?: number
  skills?: string[]
  // Contact
  email?: string
  phone?: string
  instagram?: string
  twitter?: string
  website?: string
  // Resume data
  resume_data?: {
    experience?: Array<{
      title: string
      company: string
      period: string
      location?: string
      description?: string
    }>
    education?: Array<{
      degree: string
      school: string
      period: string
      location?: string
    }>
    industry_knowledge?: string[]
    tools_technologies?: string[]
    other_skills?: string[]
  }
  // Hiring progress
  hiring_progress?: {
    interview_date?: string
    interview_location?: string
    interview_status?: string
    assigned_to?: {
      name: string
      avatar?: string
    }
    notes?: Array<{
      id: string
      author: string
      author_avatar?: string
      date: string
      time: string
      content: string
      replies?: number
    }>
  }
  // Interview schedule
  interview_schedule?: Array<{
    id: string
    date: string
    interviewer_name: string
    interviewer_avatar?: string
    interview_type: string
    time: string
    location: string
  }>
}

const ApplicationDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [application, setApplication] = useState<ApplicationDetails | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Modal states
  const [scheduleInterviewOpen, setScheduleInterviewOpen] = useState(false)
  const [giveRatingOpen, setGiveRatingOpen] = useState(false)
  const [addNotesOpen, setAddNotesOpen] = useState(false)
  const [addScheduleOpen, setAddScheduleOpen] = useState(false)
  const [addFeedbackOpen, setAddFeedbackOpen] = useState(false)
  const [moveToNextStepOpen, setMoveToNextStepOpen] = useState(false)
  const [rejectApplicationOpen, setRejectApplicationOpen] = useState(false)
  const [sendMessageOpen, setSendMessageOpen] = useState(false)
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(null)
  // Form states
  const [scheduleForm, setScheduleForm] = useState({
    date: '',
    time: '',
    location: '',
    interviewType: '',
    interviewer: '',
    notes: ''
  })
  const [ratingForm, setRatingForm] = useState({
    rating: '',
    comment: ''
  })
  const [noteForm, setNoteForm] = useState({
    content: ''
  })
  const [feedbackForm, setFeedbackForm] = useState({
    feedback: ''
  })
  const [messageForm, setMessageForm] = useState({
    subject: '',
    message: ''
  })
  const [rejectReason, setRejectReason] = useState('')

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      if (!id) {
        toast.error('Application ID not found')
        navigate('/company/applicants')
        return
      }

      try {
        setLoading(true)

        const res = await jobApplicationApi.getCompanyApplicationById(id)
        const a = res?.data?.data || res?.data

        const mapped: ApplicationDetails = {
          _id: a.id,
          seeker_id: a.seeker_id,
          seeker_name: a.seeker_name || 'Candidate',
          seeker_avatar: a.seeker_avatar,
          seeker_headline: a.seeker_headline,
          job_id: a.job_id,
          job_title: a.job_title,
          job_company: a.company_name,
          job_location: a.job_location,
          job_type: a.job_type,
          score: a.score,
          stage: a.stage,
          applied_date: a.applied_date,
          email: a.seeker_email,
          phone: a.seeker_phone,
          website: a.seeker_website,
          resume_data: undefined,
          interview_schedule: (a.interviews || []).map((iv: any) => ({
            id: iv.id,
            date: iv.date,
            interviewer_name: iv.interviewer_name || '',
            interviewer_avatar: undefined,
            interview_type: iv.interview_type,
            time: iv.time,
            location: iv.location,
          })),
        }

        setApplication(mapped)
      } catch (error) {
        toast.error('Failed to load application details')
        navigate('/company/applicants')
      } finally {
        setLoading(false)
      }
    }

    fetchApplicationDetails()
  }, [id, navigate])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    const age = new Date().getFullYear() - date.getFullYear()
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }) + ` (${age} y.o)`
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  const getStageBadge = (stage: string) => {
    const stageMap: Record<string, { label: string; className: string }> = {
      applied: { label: 'Applied', className: 'border-[#4640DE] text-[#4640DE]' },
      shortlisted: { label: 'Shortlisted', className: 'border-[#4640DE] text-[#4640DE]' },
      interview: { label: 'Interview', className: 'border-[#4640DE] text-[#4640DE]' },
      rejected: { label: 'Rejected', className: 'border-red-500 text-red-500' },
      hired: { label: 'Hired', className: 'border-[#56CDAD] text-[#56CDAD]' },
    }
    
    const stageInfo = stageMap[stage] || stageMap.applied
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#4640DE]"></div>
        <span className={`text-sm font-medium ${stageInfo.className}`}>
          {stageInfo.label}
        </span>
      </div>
    )
  }

  // Handler functions
  const handleScheduleInterview = () => {
    // TODO: Implement API call
    toast.success('Interview scheduled successfully')
    setScheduleInterviewOpen(false)
    setScheduleForm({ date: '', time: '', location: '', interviewType: '', interviewer: '', notes: '' })
  }

  const handleGiveRating = async () => {
    if (!id) return
    try {
      const score = Number(ratingForm.rating)
      await jobApplicationApi.updateApplicationScore(id, { score })
      toast.success('Rating submitted successfully')
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to update score')
    }
    setGiveRatingOpen(false)
    setRatingForm({ rating: '', comment: '' })
  }

  const handleAddNote = () => {
    // TODO: Implement API call
    toast.success('Note added successfully')
    setAddNotesOpen(false)
    setNoteForm({ content: '' })
  }

  const handleAddSchedule = async () => {
    if (!id) return
    try {
      await jobApplicationApi.addInterview(id, {
        date: scheduleForm.date,
        time: scheduleForm.time,
        location: scheduleForm.location,
        interview_type: scheduleForm.interviewType,
        interviewer_name: scheduleForm.interviewer,
      })
      toast.success('Interview schedule added successfully')
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to add interview')
    }
    setAddScheduleOpen(false)
    setScheduleForm({ date: '', time: '', location: '', interviewType: '', interviewer: '', notes: '' })
  }

  const handleAddFeedback = async () => {
    if (!id || !selectedInterviewId) return
    try {
      await jobApplicationApi.addInterviewFeedback(id, selectedInterviewId, {
        reviewer_name: 'Reviewer', // could be current user name if available
        comment: feedbackForm.feedback,
      })
      toast.success('Feedback added successfully')
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to add feedback')
    }
    setAddFeedbackOpen(false)
    setFeedbackForm({ feedback: '' })
    setSelectedInterviewId(null)
  }

  const handleMoveToNextStep = async () => {
    if (!id || !application) return
    const nextMap: Record<string, string> = {
      applied: 'shortlisted',
      shortlisted: 'interview',
      interview: 'hired',
      rejected: 'rejected',
      hired: 'hired',
    }
    const next = nextMap[application.stage] || 'shortlisted'
    try {
      await jobApplicationApi.updateApplicationStage(id, { stage: next as any })
      toast.success('Application moved to next step')
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to update stage')
    }
    setMoveToNextStepOpen(false)
  }

  const handleRejectApplication = async () => {
    if (!id) return
    try {
      await jobApplicationApi.updateApplicationStage(id, { stage: 'rejected', rejection_reason: rejectReason })
      toast.success('Application rejected')
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to reject application')
    }
    setRejectApplicationOpen(false)
    setRejectReason('')
  }

  const handleSendMessage = () => {
    // TODO: Implement API call
    toast.success('Message sent successfully')
    setSendMessageOpen(false)
    setMessageForm({ subject: '', message: '' })
  }

  if (loading) {
    return (
      <CompanyLayout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <Loading />
        </div>
      </CompanyLayout>
    )
  }

  if (!application) {
    return (
      <CompanyLayout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Application not found</h2>
            <p className="text-gray-600 mb-4">The application you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/company/applicants')}>
              Back to Applications
            </Button>
          </div>
        </div>
      </CompanyLayout>
    )
  }

  return (
    <CompanyLayout>
      <div className="min-h-screen bg-white">
        {/* Top Navigation */}
        <div className="border-b border-[#D6DDEB]">
          <div className="px-7 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1.5"
                  onClick={() => navigate('/company/applicants')}
                >
                  <ArrowLeft className="w-4 h-4 text-[#25324B]" />
                </Button>
                <h1 className="text-xl font-semibold text-[#25324B]">Applicant Details</h1>
              </div>
              <Button
                variant="outline"
                className="border-[#CCCCF5] text-[#4640DE] text-sm px-3 py-1.5"
              >
                <ChevronDown className="w-4 h-4 mr-1.5" />
                More Action
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-7 py-7">
          <div className="grid grid-cols-3 gap-7">
            {/* Left Sidebar - Applicant Data */}
            <div className="space-y-5">
              <Card className="border border-[#D6DDEB] rounded-lg">
                <CardContent className="p-5">
                  {/* Header with Avatar and Name */}
                  <div className="flex items-start gap-4 mb-5">
                    <Avatar className="w-16 h-16">
                      {application.seeker_avatar ? (
                        <AvatarImage src={application.seeker_avatar} alt={application.seeker_name} />
                      ) : null}
                      <AvatarFallback className="bg-[#4640DE]/10 text-[#4640DE] text-lg font-semibold">
                        {getInitials(application.seeker_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-[#25324B] mb-1">
                        {application.seeker_name}
                      </h2>
                      <p className="text-sm text-[#7C8493] mb-2">
                        {application.seeker_headline || application.job_title}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-[#FFB836] fill-[#FFB836]" />
                        <span className="text-sm font-medium text-[#25324B]">
                          {application.score?.toFixed(1) || '0.0'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Applied Jobs */}
                  <div className="bg-[#F8F8FD] rounded-lg p-4 mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-[#25324B]">Applied Jobs</span>
                      <span className="text-sm text-[#7C8493]">{getTimeAgo(application.applied_date)}</span>
                    </div>
                    <div className="h-px bg-[#D6DDEB] mb-3"></div>
                    <div>
                      <p className="text-sm font-semibold text-[#25324B] mb-1">
                        {application.job_title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[#7C8493]">
                        <span>{application.job_company}</span>
                        <span>•</span>
                        <span>{application.job_type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stage */}
                  <div className="bg-[#F8F8FD] rounded-lg p-4 mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-[#25324B]">Stage</span>
                    </div>
                    <div className="h-px bg-[#D6DDEB] mb-3"></div>
                    {getStageBadge(application.stage)}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 mb-5">
                    <Button
                      variant="outline"
                      className="flex-1 border-[#CCCCF5] text-[#4640DE] hover:bg-[#4640DE] hover:text-white"
                      onClick={() => setScheduleInterviewOpen(true)}
                    >
                      Schedule Interview
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="border-[#CCCCF5] text-[#4640DE]">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => application.resume_url && window.open(application.resume_url, '_blank')}>
                          View Resume
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSendMessageOpen(true)}>Send Message</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRejectApplicationOpen(true)} className="text-red-600">
                          Reject Application
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="h-px bg-[#D6DDEB] mb-5"></div>

                  {/* Contact Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#25324B] mb-4">Contact</h3>
                    <div className="space-y-4">
                      {application.email && (
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-[#7C8493] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-[#7C8493] mb-0.5">Email</p>
                            <p className="text-sm font-medium text-[#25324B]">{application.email}</p>
                          </div>
                        </div>
                      )}
                      {application.phone && (
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-[#7C8493] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-[#7C8493] mb-0.5">Phone</p>
                            <p className="text-sm font-medium text-[#25324B]">{application.phone}</p>
                          </div>
                        </div>
                      )}
                      {application.instagram && (
                        <div className="flex items-start gap-3">
                          <Instagram className="w-5 h-5 text-[#7C8493] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-[#7C8493] mb-0.5">Instagram</p>
                            <a 
                              href={`https://${application.instagram}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-[#4640DE] hover:underline"
                            >
                              {application.instagram}
                            </a>
                          </div>
                        </div>
                      )}
                      {application.twitter && (
                        <div className="flex items-start gap-3">
                          <Twitter className="w-5 h-5 text-[#7C8493] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-[#7C8493] mb-0.5">Twitter</p>
                            <a 
                              href={`https://${application.twitter}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-[#4640DE] hover:underline"
                            >
                              {application.twitter}
                            </a>
                          </div>
                        </div>
                      )}
                      {application.website && (
                        <div className="flex items-start gap-3">
                          <Globe className="w-5 h-5 text-[#7C8493] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-[#7C8493] mb-0.5">Website</p>
                            <a 
                              href={`https://${application.website}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-[#4640DE] hover:underline"
                            >
                              {application.website}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Content - Tabs */}
            <div className="col-span-2">
              <Card className="border border-[#D6DDEB] rounded-lg">
                <Tabs defaultValue="profile" className="w-full">
                  <div className="border-b border-[#D6DDEB] px-5">
                    <TabsList className="bg-transparent h-auto p-0">
                      <TabsTrigger 
                        value="profile" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-[#4640DE] data-[state=active]:text-[#25324B] rounded-none"
                      >
                        Applicant Profile
                      </TabsTrigger>
                      <TabsTrigger 
                        value="resume"
                        className="data-[state=active]:border-b-2 data-[state=active]:border-[#4640DE] data-[state=active]:text-[#25324B] rounded-none"
                      >
                        Resume
                      </TabsTrigger>
                      <TabsTrigger 
                        value="progress"
                        className="data-[state=active]:border-b-2 data-[state=active]:border-[#4640DE] data-[state=active]:text-[#25324B] rounded-none"
                      >
                        Hiring Progress
                      </TabsTrigger>
                      <TabsTrigger 
                        value="schedule"
                        className="data-[state=active]:border-b-2 data-[state=active]:border-[#4640DE] data-[state=active]:text-[#25324B] rounded-none"
                      >
                        Interview Schedule
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="profile" className="p-7 m-0">
                    {/* Personal Info */}
                    <div className="mb-7">
                      <h3 className="text-lg font-semibold text-[#25324B] mb-5">Personal Info</h3>
                      <div className="grid grid-cols-2 gap-6 mb-5">
                        <div>
                          <p className="text-sm text-[#7C8493] mb-1">Full Name</p>
                          <p className="text-sm font-medium text-[#25324B]">
                            {application.full_name || application.seeker_name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#7C8493] mb-1">Date of Birth</p>
                          <p className="text-sm font-medium text-[#25324B]">
                            {formatDate(application.date_of_birth || '')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#7C8493] mb-1">Gender</p>
                          <p className="text-sm font-medium text-[#25324B]">
                            {application.gender || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#7C8493] mb-1">Language</p>
                          <p className="text-sm font-medium text-[#25324B]">
                            {application.languages?.join(', ') || 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-[#7C8493] mb-1">Address</p>
                        <p className="text-sm font-medium text-[#25324B]">
                          {application.address || 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="h-px bg-[#D6DDEB] mb-7"></div>

                    {/* Professional Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#25324B] mb-5">Professional Info</h3>
                      
                      {/* About Me */}
                      {application.about_me && (
                        <div className="mb-5">
                          <p className="text-sm text-[#7C8493] mb-2">About Me</p>
                          <div className="space-y-2">
                            {application.about_me.split('\n').map((paragraph, index) => (
                              <p key={index} className="text-sm font-medium text-[#25324B]">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-[#7C8493] mb-1">Current Job</p>
                          <p className="text-sm font-medium text-[#25324B]">
                            {application.current_job || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#7C8493] mb-1">Experience in Years</p>
                          <p className="text-sm font-medium text-[#25324B]">
                            {application.experience_years ? `${application.experience_years} Years` : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#7C8493] mb-1">Highest Qualification Held</p>
                          <p className="text-sm font-medium text-[#25324B]">
                            {application.highest_qualification || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#7C8493] mb-2">Skill set</p>
                          <div className="flex flex-wrap gap-2">
                            {application.skills && application.skills.length > 0 ? (
                              application.skills.map((skill, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-[#F8F8FD] text-[#4640DE] border-0 px-2.5 py-1 rounded-lg text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-sm text-[#7C8493]">N/A</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="resume" className="p-7 m-0">
                    <div className="border border-[#D6DDEB] rounded-lg p-6">
                      {/* Resume Header */}
                      <div className="flex items-start gap-4 mb-6 pb-6 border-b border-[#D6DDEB]">
                        <Avatar className="w-16 h-16">
                          {application.seeker_avatar ? (
                            <AvatarImage src={application.seeker_avatar} alt={application.seeker_name} />
                          ) : null}
                          <AvatarFallback className="bg-[#4640DE]/10 text-[#4640DE] text-lg font-semibold">
                            {getInitials(application.seeker_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-[#25324B] mb-1">
                            {application.full_name || application.seeker_name}
                          </h3>
                          <p className="text-base text-[#25324B] mb-4">
                            {application.seeker_headline || application.current_job || 'Product Designer'}
                          </p>
                          <div className="space-y-1 text-sm text-[#7C8493]">
                            {application.email && <p>{application.email}</p>}
                            {application.phone && <p>{application.phone}</p>}
                            {application.address && <p>{application.address}</p>}
                          </div>
                        </div>
                        {application.resume_url && (
                          <Button
                            variant="outline"
                            className="border-[#CCCCF5] text-[#4640DE]"
                            onClick={() => {
                              if (application.resume_url) {
                                window.open(application.resume_url, '_blank')
                              }
                            }}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Resume
                          </Button>
                        )}
                      </div>

                      {/* Industry Knowledge */}
                      {application.resume_data?.industry_knowledge && application.resume_data.industry_knowledge.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-base font-semibold text-[#25324B] mb-3">Industry Knowledge</h4>
                          <div className="flex flex-wrap gap-2">
                            {application.resume_data.industry_knowledge.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-[#F8F8FD] text-[#4640DE] border-0 px-3 py-1 rounded-lg text-sm"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tools & Technologies */}
                      {application.resume_data?.tools_technologies && application.resume_data.tools_technologies.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-base font-semibold text-[#25324B] mb-3">Tools & Technologies</h4>
                          <p className="text-sm text-[#7C8493]">
                            {application.resume_data.tools_technologies.join(', ')}
                          </p>
                        </div>
                      )}

                      {/* Other Skills */}
                      {application.resume_data?.other_skills && application.resume_data.other_skills.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-base font-semibold text-[#25324B] mb-3">Other Skills</h4>
                          <p className="text-sm text-[#7C8493]">
                            {application.resume_data.other_skills.join(', ')}
                          </p>
                        </div>
                      )}

                      {/* Languages */}
                      {application.languages && application.languages.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-base font-semibold text-[#25324B] mb-3">Languages</h4>
                          <div className="space-y-1">
                            {application.languages.map((lang, index) => (
                              <p key={index} className="text-sm text-[#7C8493]">{lang}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Social Links */}
                      {(application.website || application.instagram || application.twitter) && (
                        <div className="mb-6">
                          <h4 className="text-base font-semibold text-[#25324B] mb-3">Social</h4>
                          <div className="space-y-1">
                            {application.website && (
                              <a href={`https://${application.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[#4640DE] hover:underline block">
                                {application.website}
                              </a>
                            )}
                            {application.instagram && (
                              <a href={`https://${application.instagram}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[#4640DE] hover:underline block">
                                linkedin.com/in/yourname
                              </a>
                            )}
                            {application.twitter && (
                              <a href={`https://${application.twitter}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[#4640DE] hover:underline block">
                                dribbble.com/yourname
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Experience */}
                      {application.resume_data?.experience && application.resume_data.experience.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-base font-semibold text-[#25324B] mb-4 uppercase">experience</h4>
                          <div className="space-y-6">
                            {application.resume_data.experience.map((exp, index) => (
                              <div key={index} className="pb-4 border-b border-[#D6DDEB] last:border-0 last:pb-0">
                                <h5 className="text-base font-semibold text-[#25324B] mb-1">{exp.title}</h5>
                                <p className="text-sm text-[#25324B] mb-1">{exp.company}</p>
                                <p className="text-sm text-[#7C8493] mb-2">
                                  {exp.period}
                                  {exp.location && `, ${exp.location}`}
                                </p>
                                {exp.description && (
                                  <p className="text-sm text-[#7C8493]">{exp.description}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Education */}
                      {application.resume_data?.education && application.resume_data.education.length > 0 && (
                        <div>
                          <h4 className="text-base font-semibold text-[#25324B] mb-4 uppercase">education</h4>
                          <div className="space-y-4">
                            {application.resume_data.education.map((edu, index) => (
                              <div key={index}>
                                <h5 className="text-base font-semibold text-[#25324B] mb-1">{edu.degree}</h5>
                                <p className="text-sm text-[#25324B] mb-1">{edu.school}</p>
                                <p className="text-sm text-[#7C8493]">
                                  {edu.period}
                                  {edu.location && `, ${edu.location}`}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="progress" className="p-7 m-0">
                    <div className="space-y-6">
                      {/* Current Stage */}
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <h3 className="text-lg font-semibold text-[#25324B]">Current Stage</h3>
                          <Button
                            variant="outline"
                            className="border-[#CCCCF5] text-[#4640DE]"
                            onClick={() => setGiveRatingOpen(true)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Give Rating
                          </Button>
                        </div>

                        {/* Pipeline */}
                        <div className="flex items-center gap-2 mb-6">
                          <div className="flex-1 bg-[#E9EBFD] rounded-lg px-4 py-3 text-center">
                            <p className="text-sm font-semibold text-[#4640DE]">In-Review</p>
                          </div>
                          <div className="flex-1 bg-[#E9EBFD] rounded-lg px-4 py-3 text-center">
                            <p className="text-sm font-semibold text-[#4640DE]">Shortlisted</p>
                          </div>
                          <div className="flex-1 bg-[#4640DE] rounded-lg px-4 py-3 text-center">
                            <p className="text-sm font-semibold text-white">Interview</p>
                          </div>
                          <div className="flex-1 bg-[#F8F8FD] rounded-lg px-4 py-3 text-center">
                            <p className="text-sm font-semibold text-[#7C8493]">Hired / Declined</p>
                          </div>
                        </div>

                        {/* Stage Info */}
                        <div className="bg-white border border-[#D6DDEB] rounded-lg p-5">
                          <h4 className="text-base font-semibold text-[#25324B] mb-4">Stage Info</h4>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm text-[#7C8493] mb-1">Interview Date</p>
                                <p className="text-sm font-medium text-[#25324B]">
                                  {application.hiring_progress?.interview_date || 'N/A'}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-[#7C8493] mb-1">Interview Location</p>
                                <p className="text-sm font-medium text-[#25324B]">
                                  {application.hiring_progress?.interview_location || 'N/A'}
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                className="w-full border-[#CCCCF5] text-[#4640DE] bg-[#F8F8FD]"
                                onClick={() => setMoveToNextStepOpen(true)}
                              >
                                Move To Next Step
                              </Button>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm text-[#7C8493] mb-1">Interview Status</p>
                                {application.hiring_progress?.interview_status && (
                                  <Badge className="bg-[#FFB836]/10 text-[#FFB836] border-0 px-3 py-1 rounded-full text-xs font-semibold">
                                    {application.hiring_progress.interview_status}
                                  </Badge>
                                )}
                              </div>
                              <div>
                                <p className="text-sm text-[#7C8493] mb-2">Assigned to</p>
                                {application.hiring_progress?.assigned_to && (
                                  <div className="flex items-center gap-2">
                                    <Avatar className="w-8 h-8">
                                      {application.hiring_progress.assigned_to.avatar ? (
                                        <AvatarImage src={application.hiring_progress.assigned_to.avatar} />
                                      ) : null}
                                      <AvatarFallback className="bg-[#4640DE]/10 text-[#4640DE] text-xs">
                                        {getInitials(application.hiring_progress.assigned_to.name)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium text-[#25324B]">
                                      {application.hiring_progress.assigned_to.name}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="h-px bg-[#D6DDEB]"></div>

                      {/* Notes */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-base font-semibold text-[#25324B]">Notes</h3>
                          <Button
                            variant="ghost"
                            className="text-[#4640DE] hover:text-[#4640DE] hover:bg-[#F8F8FD]"
                            onClick={() => setAddNotesOpen(true)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Notes
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {application.hiring_progress?.notes && application.hiring_progress.notes.length > 0 ? (
                            application.hiring_progress.notes.map((note) => (
                              <div key={note.id} className="bg-white border border-[#D6DDEB] rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                  <Avatar className="w-10 h-10">
                                    {note.author_avatar ? (
                                      <AvatarImage src={note.author_avatar} />
                                    ) : null}
                                    <AvatarFallback className="bg-[#4640DE]/10 text-[#4640DE] text-xs">
                                      {getInitials(note.author)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-sm font-semibold text-[#25324B]">{note.author}</span>
                                      <span className="text-xs text-[#7C8493]">{note.date}</span>
                                      <div className="w-1 h-1 rounded-full bg-[#7C8493]"></div>
                                      <span className="text-xs text-[#7C8493]">{note.time}</span>
                                    </div>
                                    <p className="text-sm text-[#25324B] mb-2">{note.content}</p>
                                    {note.replies ? (
                                      <button className="text-sm font-semibold text-[#4640DE] hover:underline">
                                        {note.replies} Replies
                                      </button>
                                    ) : (
                                      <button className="text-sm font-semibold text-[#4640DE] hover:underline">
                                        Reply
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-[#7C8493] text-center py-4">No notes yet</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="schedule" className="p-7 m-0">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-[#25324B]">Interview List</h3>
                        <Button
                          variant="ghost"
                          className="text-[#4640DE] hover:text-[#4640DE] hover:bg-[#F8F8FD]"
                          onClick={() => setAddScheduleOpen(true)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Schedule Interview
                        </Button>
                      </div>

                      {/* Interview Schedule List */}
                      <div className="space-y-6">
                        {application.interview_schedule && application.interview_schedule.length > 0 ? (
                          (() => {
                            // Group interviews by date
                            const grouped = application.interview_schedule.reduce((acc, interview) => {
                              const interviewDate = new Date(interview.date)
                              interviewDate.setHours(0, 0, 0, 0)
                              const today = new Date()
                              today.setHours(0, 0, 0, 0)
                              const tomorrow = new Date(today)
                              tomorrow.setDate(tomorrow.getDate() + 1)
                              
                              let dateLabel: string
                              if (interviewDate.getTime() === tomorrow.getTime()) {
                                dateLabel = `Tomorrow - ${interviewDate.toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}`
                              } else {
                                dateLabel = interviewDate.toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric'
                                })
                              }
                              
                              if (!acc[dateLabel]) {
                                acc[dateLabel] = []
                              }
                              acc[dateLabel].push(interview)
                              return acc
                            }, {} as Record<string, typeof application.interview_schedule>)

                            return Object.entries(grouped).map(([date, interviews]) => (
                              <div key={date} className="space-y-3">
                                <p className="text-sm text-[#7C8493]">{date}</p>
                                {interviews.map((interview) => (
                                  <div
                                    key={interview.id}
                                    className="bg-white border border-[#D6DDEB] rounded-lg p-4 flex items-center justify-between"
                                  >
                                    <div className="flex items-center gap-4 flex-1">
                                      <Avatar className="w-12 h-12">
                                        {interview.interviewer_avatar ? (
                                          <AvatarImage src={interview.interviewer_avatar} />
                                        ) : null}
                                        <AvatarFallback className="bg-[#4640DE]/10 text-[#4640DE]">
                                          {getInitials(interview.interviewer_name)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <h4 className="text-base font-semibold text-[#25324B] mb-1">
                                          {interview.interviewer_name}
                                        </h4>
                                        <p className="text-sm text-[#7C8493]">{interview.interview_type}</p>
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <Clock className="w-4 h-4 text-[#7C8493]" />
                                          <p className="text-sm font-medium text-[#25324B]">{interview.time}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <MapPin className="w-4 h-4 text-[#7C8493]" />
                                          <p className="text-sm text-[#7C8493]">{interview.location}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-[#CCCCF5] text-[#4640DE]"
                                        onClick={() => {
                                          setSelectedInterviewId(interview.id)
                                          setAddFeedbackOpen(true)
                                        }}
                                      >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Feedback
                                      </Button>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="outline" size="sm" className="border-[#CCCCF5] text-[#4640DE]">
                                            <MoreHorizontal className="w-4 h-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                                          <DropdownMenuItem>Cancel Interview</DropdownMenuItem>
                                          <DropdownMenuItem>View Details</DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))
                          })()
                        ) : (
                          <div className="text-center py-10">
                            <p className="text-sm text-[#7C8493] mb-4">No interview schedules yet</p>
                            <Button
                              variant="outline"
                              className="border-[#CCCCF5] text-[#4640DE]"
                              onClick={() => {
                                // TODO: Open add schedule dialog
                              }}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Schedule Interview
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Interview Modal */}
      <Dialog open={scheduleInterviewOpen} onOpenChange={setScheduleInterviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
            <DialogDescription>
              Schedule an interview for {application?.seeker_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Interview Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={scheduleForm.location}
                onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
                placeholder="Enter interview location"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="interviewType">Interview Type</Label>
                <Select value={scheduleForm.interviewType} onValueChange={(value) => setScheduleForm({ ...scheduleForm, interviewType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone Interview</SelectItem>
                    <SelectItem value="video">Video Interview</SelectItem>
                    <SelectItem value="onsite">On-site Interview</SelectItem>
                    <SelectItem value="written">Written Test</SelectItem>
                    <SelectItem value="skill">Skill Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interviewer">Interviewer</Label>
                <Input
                  id="interviewer"
                  value={scheduleForm.interviewer}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, interviewer: e.target.value })}
                  placeholder="Interviewer name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={scheduleForm.notes}
                onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
                placeholder="Additional notes (optional)"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleInterviewOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleInterview} className="bg-[#4640DE] hover:bg-[#4640DE]/90">
              Schedule Interview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Give Rating Modal */}
      <Dialog open={giveRatingOpen} onOpenChange={setGiveRatingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Give Rating</DialogTitle>
            <DialogDescription>
              Rate the applicant's performance
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Select value={ratingForm.rating} onValueChange={(value) => setRatingForm({ ...ratingForm, rating: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Poor</SelectItem>
                  <SelectItem value="2">2 - Fair</SelectItem>
                  <SelectItem value="3">3 - Good</SelectItem>
                  <SelectItem value="4">4 - Very Good</SelectItem>
                  <SelectItem value="5">5 - Excellent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                value={ratingForm.comment}
                onChange={(e) => setRatingForm({ ...ratingForm, comment: e.target.value })}
                placeholder="Add your comment..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGiveRatingOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGiveRating} className="bg-[#4640DE] hover:bg-[#4640DE]/90">
              Submit Rating
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Notes Modal */}
      <Dialog open={addNotesOpen} onOpenChange={setAddNotesOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogDescription>
              Add a note about this applicant
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="noteContent">Note</Label>
              <Textarea
                id="noteContent"
                value={noteForm.content}
                onChange={(e) => setNoteForm({ content: e.target.value })}
                placeholder="Enter your note..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddNotesOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNote} className="bg-[#4640DE] hover:bg-[#4640DE]/90">
              Add Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Schedule Interview Modal */}
      <Dialog open={addScheduleOpen} onOpenChange={setAddScheduleOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Schedule Interview</DialogTitle>
            <DialogDescription>
              Schedule a new interview for {application?.seeker_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scheduleDate">Interview Date</Label>
                <Input
                  id="scheduleDate"
                  type="date"
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduleTime">Time</Label>
                <Input
                  id="scheduleTime"
                  type="time"
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scheduleLocation">Location</Label>
              <Input
                id="scheduleLocation"
                value={scheduleForm.location}
                onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
                placeholder="Enter interview location"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scheduleType">Interview Type</Label>
                <Select value={scheduleForm.interviewType} onValueChange={(value) => setScheduleForm({ ...scheduleForm, interviewType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone Interview</SelectItem>
                    <SelectItem value="video">Video Interview</SelectItem>
                    <SelectItem value="onsite">On-site Interview</SelectItem>
                    <SelectItem value="written">Written Test</SelectItem>
                    <SelectItem value="skill">Skill Test</SelectItem>
                    <SelectItem value="final">Final Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduleInterviewer">Interviewer</Label>
                <Input
                  id="scheduleInterviewer"
                  value={scheduleForm.interviewer}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, interviewer: e.target.value })}
                  placeholder="Interviewer name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scheduleNotes">Notes</Label>
              <Textarea
                id="scheduleNotes"
                value={scheduleForm.notes}
                onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
                placeholder="Additional notes (optional)"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddScheduleOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSchedule} className="bg-[#4640DE] hover:bg-[#4640DE]/90">
              Add Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Feedback Modal */}
      <Dialog open={addFeedbackOpen} onOpenChange={setAddFeedbackOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Feedback</DialogTitle>
            <DialogDescription>
              Add feedback for this interview
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                value={feedbackForm.feedback}
                onChange={(e) => setFeedbackForm({ feedback: e.target.value })}
                placeholder="Enter your feedback..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddFeedbackOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFeedback} className="bg-[#4640DE] hover:bg-[#4640DE]/90">
              Add Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move To Next Step Confirmation */}
      <ConfirmationDialog
        isOpen={moveToNextStepOpen}
        onClose={() => setMoveToNextStepOpen(false)}
        onConfirm={handleMoveToNextStep}
        title="Move To Next Step"
        description="Are you sure you want to move this application to the next stage?"
        confirmText="Move"
        cancelText="Cancel"
      />

      {/* Reject Application Modal */}
      <Dialog open={rejectApplicationOpen} onOpenChange={setRejectApplicationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this application
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejectReason">Reason</Label>
              <Textarea
                id="rejectReason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter rejection reason..."
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectApplicationOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleRejectApplication} 
              variant="destructive"
              disabled={!rejectReason.trim()}
            >
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Message Modal */}
      <Dialog open={sendMessageOpen} onOpenChange={setSendMessageOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              Send a message to {application?.seeker_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={messageForm.subject}
                onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                placeholder="Message subject"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={messageForm.message}
                onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                placeholder="Enter your message..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendMessageOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendMessage} className="bg-[#4640DE] hover:bg-[#4640DE]/90">
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CompanyLayout>
  )
}

export default ApplicationDetails

