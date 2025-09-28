import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  Building2, 
  Mail, 
  Globe, 
  MapPin, 
  Users, 
  Calendar,
  Edit3,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Award,
  TrendingUp,
  Target,
  Heart,
  Star,
  Share2,
  Download,
  Eye,
  ArrowLeft,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ExternalLink,
  Briefcase,
  DollarSign,
  Zap,
  Shield,
  Activity
} from 'lucide-react'

// Dummy data for the company profile
const dummyCompanyData = {
  id: "comp_001",
  company_name: "TechFlow Solutions",
  email: "contact@techflow.com",
  website: "https://www.techflow.com",
  industry: "Technology",
  organisation: "Corporation",
  location: "San Francisco, CA",
  employees: "101-500",
  description: "TechFlow Solutions is a leading technology company specializing in innovative software solutions, cloud computing, and digital transformation services. We help businesses of all sizes leverage cutting-edge technology to drive growth and efficiency.",
  logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center",
  business_license: "https://example.com/business-license.pdf",
  tax_id: "TAX-123456789",
  isVerified: "verified",
  createdAt: "2023-01-15T10:30:00Z",
  updatedAt: "2024-01-20T14:45:00Z",
  // Additional profile data
  founded: "2018",
  headquarters: "San Francisco, CA",
  phone: "+1 (555) 123-4567",
  socialMedia: {
    linkedin: "https://linkedin.com/company/techflow",
    twitter: "https://twitter.com/techflow",
    facebook: "https://facebook.com/techflow",
    instagram: "https://instagram.com/techflow"
  },
  stats: {
    totalJobs: 24,
    activeJobs: 18,
    totalApplications: 1247,
    responseRate: 95,
    avgResponseTime: "2 days"
  },
  benefits: [
    "Health Insurance",
    "Dental & Vision",
    "401(k) Matching",
    "Flexible PTO",
    "Remote Work Options",
    "Professional Development",
    "Gym Membership",
    "Free Meals"
  ],
  awards: [
    "Best Tech Company 2023",
    "Innovation Award 2022",
    "Great Place to Work 2023"
  ],
  recentJobs: [
    {
      id: "job_001",
      title: "Senior Software Engineer",
      location: "San Francisco, CA",
      type: "Full-time",
      posted: "2 days ago",
      applications: 45
    },
    {
      id: "job_002", 
      title: "Product Manager",
      location: "Remote",
      type: "Full-time",
      posted: "1 week ago",
      applications: 32
    },
    {
      id: "job_003",
      title: "UX Designer",
      location: "San Francisco, CA",
      type: "Full-time",
      posted: "2 weeks ago",
      applications: 28
    }
  ]
}

const CompanyProfile = () => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const company = dummyCompanyData

  const getVerificationStatus = (status: string) => {
    switch (status) {
      case 'verified':
        return {
          icon: CheckCircle,
          text: 'Verified',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        }
      case 'pending':
        return {
          icon: Clock,
          text: 'Pending Review',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        }
      case 'rejected':
        return {
          icon: XCircle,
          text: 'Rejected',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        }
      default:
        return {
          icon: Clock,
          text: 'Not Verified',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        }
    }
  }

  const verificationStatus = getVerificationStatus(company.isVerified)
  const StatusIcon = verificationStatus.icon

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/company/dashboard')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Profile
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-primary hover:bg-primary/90"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Company Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Company Card */}
            <Card className="overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10"></div>
              <CardContent className="relative -mt-16 pb-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                    <AvatarImage src={company.logo} alt={company.company_name} />
                    <AvatarFallback className="text-2xl font-bold">
                      {company.company_name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="mt-4 space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">{company.company_name}</h1>
                    
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${verificationStatus.bgColor} ${verificationStatus.color} ${verificationStatus.borderColor}`}>
                      <StatusIcon className="h-4 w-4 mr-1" />
                      {verificationStatus.text}
                    </div>
                    
                    <p className="text-gray-600 text-sm">{company.industry} • {company.organisation}</p>
                    <p className="text-gray-500 text-sm">Founded {company.founded}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Quick Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Active Jobs</span>
                  </div>
                  <span className="font-semibold">{company.stats.activeJobs}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Total Applications</span>
                  </div>
                  <span className="font-semibold">{company.stats.totalApplications.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Response Rate</span>
                  </div>
                  <span className="font-semibold text-green-600">{company.stats.responseRate}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Avg Response</span>
                  </div>
                  <span className="font-semibold">{company.stats.avgResponseTime}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Contact Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a href={`mailto:${company.email}`} className="text-sm text-primary hover:underline">
                    {company.email}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{company.phone}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center space-x-1"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{company.headquarters}</span>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-3">
                  <a href={company.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                    <Linkedin className="h-5 w-5 text-blue-600" />
                  </a>
                  <a href={company.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 transition-colors">
                    <Twitter className="h-5 w-5 text-sky-600" />
                  </a>
                  <a href={company.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                    <Facebook className="h-5 w-5 text-blue-600" />
                  </a>
                  <a href={company.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors">
                    <Instagram className="h-5 w-5 text-pink-600" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>About {company.company_name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{company.description}</p>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Company Size</p>
                      <p className="text-sm text-gray-600">{company.employees} employees</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Founded</p>
                      <p className="text-sm text-gray-600">{company.founded}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Location</p>
                      <p className="text-sm text-gray-600">{company.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Tax ID</p>
                      <p className="text-sm text-gray-600">{company.tax_id}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits & Perks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Benefits & Perks</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {company.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Awards & Recognition */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Awards & Recognition</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {company.awards.map((award, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-900">{award}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Job Postings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5" />
                    <span>Recent Job Postings</span>
                  </div>
                  <Button variant="outline" size="sm">
                    View All Jobs
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {company.recentJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{job.title}</h4>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{job.location}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Briefcase className="h-3 w-3" />
                            <span>{job.type}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{job.applications} applications</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{job.posted}</span>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Verification Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Verification Documents</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Business License</p>
                        <p className="text-xs text-gray-500">Uploaded on Jan 15, 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-green-50 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Tax ID Document</p>
                        <p className="text-xs text-gray-500">Uploaded on Jan 15, 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-green-50 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyProfile
