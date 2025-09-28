import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  MapPin, 
  Clock, 
  Users, 
  DollarSign,
  Briefcase,
  Building,
  Calendar,
  ExternalLink,
  Loader2,
  AlertCircle,
  Star,
  Share2,
  Bookmark,
  CheckCircle,
  TrendingUp,
  Globe,
  Mail,
  Phone,
  Heart,
  Eye,
  Target,
  Award,
  Zap
} from "lucide-react";
import { jobApi } from "@/api/job.api";
import type { JobPostingResponse } from "@/types/job";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobPostingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Dummy data for demonstration
  const dummyJob: JobPostingResponse = {
    id: "1",
    company_id: "comp_1",
    title: "Senior Frontend Developer",
    description: `We are looking for an experienced Frontend Developer to join our dynamic team at TechCorp. You will be responsible for building and maintaining high-quality web applications using modern technologies.

As a Senior Frontend Developer, you'll work closely with our design team and backend developers to create seamless user experiences. You'll have the opportunity to work on exciting projects that impact millions of users worldwide.

Our ideal candidate is passionate about clean code, user experience, and staying up-to-date with the latest frontend technologies. You should be comfortable working in an agile environment and collaborating with cross-functional teams.`,
    responsibilities: [
      "Develop and maintain responsive web applications using React, TypeScript, and Next.js",
      "Collaborate with designers to implement pixel-perfect UI components",
      "Optimize applications for maximum speed and scalability",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and mentor junior developers",
      "Work with backend developers to integrate APIs and services",
      "Implement automated testing and ensure code quality",
      "Stay up-to-date with the latest frontend technologies and best practices"
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of experience in frontend development",
      "Proficient in React, TypeScript, and modern JavaScript (ES6+)",
      "Experience with state management libraries (Redux, Zustand, or similar)",
      "Strong understanding of HTML5, CSS3, and responsive design",
      "Experience with CSS frameworks (Tailwind CSS, Styled Components, or similar)",
      "Knowledge of version control systems (Git)",
      "Experience with testing frameworks (Jest, React Testing Library)",
      "Understanding of web performance optimization techniques"
    ],
    nice_to_haves: [
      "Experience with Next.js or other React frameworks",
      "Knowledge of GraphQL and Apollo Client",
      "Experience with micro-frontend architectures",
      "Familiarity with design systems and component libraries",
      "Experience with CI/CD pipelines",
      "Knowledge of accessibility standards (WCAG)",
      "Experience with animation libraries (Framer Motion, Lottie)"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work hours and remote work options",
      "Professional development budget",
      "Unlimited PTO policy",
      "401(k) matching program",
      "Stock option program",
      "Free meals and snacks",
      "Gym membership reimbursement",
      "Team building events and company retreats"
    ],
    salary: {
      min: 120000,
      max: 180000
    },
    employment_types: ["full-time", "remote", "hybrid"],
    location: "San Francisco, CA",
    skills_required: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Git", "REST APIs", "Testing"],
    category_ids: ["tech", "frontend"],
    is_active: true,
    view_count: 1247,
    application_count: 89,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
    company: {
      companyName: "TechCorp Innovations",
      logo: undefined
    }
  };

  useEffect(() => {
    // Simulate loading with dummy data
    setTimeout(() => {
      setJob(dummyJob);
    }, 500);
  }, []);

  const handleApply = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth/login?redirect=/jobs/' + id);
      return;
    }
    alert('Application feature coming soon!');
  };

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  const handleShareJob = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Check out this job: ${job?.title} at ${job?.company?.companyName}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Job link copied to clipboard!');
    }
  };

  const formatSalary = (min: number, max: number) => {
    const formatNumber = (num: number) => {
      if (num >= 1000000) {
        return `$${(num / 1000000).toFixed(1)}M`;
      } else if (num >= 1000) {
        return `$${(num / 1000).toFixed(0)}K`;
      }
      return `$${num.toLocaleString()}`;
    };
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  };

  const getEmploymentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'part-time':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contract':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'internship':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'remote':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'hybrid':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <div className="absolute inset-0 w-12 h-12 border-2 border-primary/20 rounded-full"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6 text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h3>
            <p className="text-gray-600">{error}</p>
          </div>
          <Button onClick={() => navigate('/jobs')} className="mt-4" size="lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-12">
          <Button
            variant="ghost"
            onClick={() => navigate('/jobs')}
            className="mb-6 flex items-center gap-2 text-white/90 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex items-start space-x-6">
                {/* Company Logo */}
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                  {job.company?.logo ? (
                    <img 
                      src={job.company.logo} 
                      alt={job.company.companyName}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  ) : (
                    <span className="text-blue-600 font-bold text-2xl">
                      {job.company?.companyName?.charAt(0) || job.title.charAt(0)}
                    </span>
                  )}
                </div>
                
                {/* Job Info */}
                <div className="flex-1 text-white">
                  <h1 className="text-4xl font-bold mb-3 leading-tight">{job.title}</h1>
                  <p className="text-xl font-semibold text-blue-100 mb-4">
                    {job.company?.companyName || 'Company'}
                  </p>
                  <div className="flex items-center text-blue-100 mb-6">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">{job.location}</span>
                  </div>
                  
                  {/* Employment Types */}
                  <div className="flex flex-wrap gap-3">
                    {job.employment_types.map((type) => (
                      <Badge
                        key={type}
                        className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <Button
                onClick={handleApply}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg shadow-xl"
              >
                <Zap className="w-5 h-5 mr-2" />
                Apply Now
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleSaveJob}
                  className="flex-1 bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShareJob}
                  className="flex-1 bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Salary</p>
                    <p className="font-bold text-xl text-gray-900">{formatSalary(job.salary.min, job.salary.max)}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Applicants</p>
                    <p className="font-bold text-xl text-gray-900">{job.application_count}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Posted</p>
                    <p className="font-bold text-xl text-gray-900">{formatDate(job.createdAt)}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Views</p>
                    <p className="font-bold text-xl text-gray-900">{job.view_count}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {job.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  Key Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start group">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 leading-relaxed">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Qualifications */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  Required Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {job.qualifications.map((qualification, index) => (
                    <li key={index} className="flex items-start group">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 leading-relaxed">{qualification}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Nice to Haves */}
            {job.nice_to_haves && job.nice_to_haves.length > 0 && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    Nice to Have
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {job.nice_to_haves.map((niceToHave, index) => (
                      <li key={index} className="flex items-start group">
                        <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Star className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 leading-relaxed">{niceToHave}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    Benefits & Perks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {job.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center group">
                        <div className="w-5 h-5 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                          <CheckCircle className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                  About {job.company?.companyName || 'Company'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    TechCorp Innovations is a leading technology company focused on creating innovative solutions that transform industries. We're passionate about building products that make a difference.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe className="w-4 h-4 mr-2" />
                      <span>techcorp.com</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>500+ employees</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <span>Series B startup</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Company Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Skills Required */}
            {job.skills_required && job.skills_required.length > 0 && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {job.skills_required.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200 hover:from-blue-200 hover:to-purple-200 transition-all"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Job Actions */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleApply}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 shadow-lg"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-2 hover:bg-blue-50 hover:border-blue-300"
                  onClick={handleSaveJob}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Job Saved' : 'Save Job'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-2 hover:bg-green-50 hover:border-green-300"
                  onClick={handleShareJob}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Job
                </Button>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Frontend Engineer", company: "TechCorp", location: "San Francisco, CA", salary: "$100K - $150K" },
                  { title: "React Developer", company: "InnovateLab", location: "Remote", salary: "$90K - $130K" },
                  { title: "UI/UX Developer", company: "DesignCo", location: "New York, NY", salary: "$110K - $160K" }
                ].map((similarJob, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <h4 className="font-semibold text-gray-900 mb-1">{similarJob.title}</h4>
                    <p className="text-sm text-blue-600 font-medium">{similarJob.company}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">{similarJob.location}</span>
                      <span className="text-sm font-semibold text-gray-900">{similarJob.salary}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
