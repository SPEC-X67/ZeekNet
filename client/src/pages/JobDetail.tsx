import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowRight,
  CheckCircle,
  Users,
  Building,
  Globe,
  Loader2,
  AlertCircle
} from "lucide-react";
import PublicHeader from "@/components/layouts/PublicHeader";
import PublicFooter from "@/components/layouts/PublicFooter";
import { jobApi } from "@/api/job.api";
import type { JobPostingResponse } from "@/types/job";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [similarJobs, setSimilarJobs] = useState<JobPostingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const jobResponse = await jobApi.getJobById(id);
        if (jobResponse.success && jobResponse.data) {
          setJob(jobResponse.data);
          
          const similarResponse = await jobApi.getAllJobs({
            limit: 4,
            category_ids: jobResponse.data.category_ids
          });
          
          if (similarResponse.success && similarResponse.data) {
            const filtered = similarResponse.data.jobs
              .filter((j: any) => j.id !== id)
              .slice(0, 4);
            setSimilarJobs(filtered);
          }
        } else {
          setError(jobResponse.message || 'Failed to fetch job details');
        }
      } catch (err) {
        setError('Failed to fetch job details');
        console.error('Error fetching job details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <p className="mt-4 text-gray-600">{error || 'Job not found'}</p>
          <Button 
            onClick={() => navigate('/jobs')} 
            className="mt-4"
            variant="outline"
          >
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <div className="max-w-[1152px] mx-auto">
        <div className="px-[96px] pt-[58px]">
          <div className="mb-6 flex items-center gap-2 text-sm">
            <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-700">
              Home
            </button>
            <span className="text-gray-500">/</span>
            <button onClick={() => navigate('/jobs')} className="text-gray-500 hover:text-gray-700">
              Find Job
            </button>
            <span className="text-gray-500">/</span>
            <span className="text-gray-500">Graphics & Design</span>
            <span className="text-gray-500">/</span>
            <span className="text-gray-900 font-medium">Job Details</span>
          </div>

          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {job.company?.logo ? (
                  <img 
                    src={job.company.logo} 
                    alt={job.company.companyName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-blue-600">
                    {job.company?.companyName?.charAt(0) || job.title.charAt(0)}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-[32px] font-bold text-[#18191C] leading-tight">
                    {job.title}
                  </h1>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg text-[#474C54]">at {job.company?.companyName}</span>
                  <span className="px-3 py-1 bg-[#0BA02C] text-white text-sm font-semibold rounded">
                    {job.employment_types?.[0]?.toUpperCase() || 'FULL-TIME'}
                  </span>
                </div>
              </div>
            </div>

            <Button 
              className="bg-[#4045DE] hover:bg-[#3338C0] text-white px-8 h-14 text-base font-semibold"
              onClick={() => alert('Application feature coming soon!')}
            >
              Apply now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="px-[96px] pb-[58px] flex gap-13">
          <div className="flex-1 max-w-[602px]">
            <div className="mb-8">
              <h2 className="text-[26px] font-bold text-[#25324B] mb-3">Description</h2>
              <p className="text-base text-[#515B6F] leading-relaxed">
                {job.description}
              </p>
            </div>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-[26px] font-bold text-[#25324B] mb-3">Responsibilities</h2>
                <div className="space-y-3">
                  {job.responsibilities.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#56CDAD] flex-shrink-0 mt-0.5" />
                      <p className="text-base text-[#515B6F]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {job.qualifications && job.qualifications.length > 0 && (
              <div className="mb-8">
                <h2 className="text-[26px] font-bold text-[#25324B] mb-3">Qualifications</h2>
                <div className="space-y-3">
                  {job.qualifications.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#56CDAD] flex-shrink-0 mt-0.5" />
                      <p className="text-base text-[#515B6F]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {job.nice_to_haves && job.nice_to_haves.length > 0 && (
              <div className="mb-8">
                <h2 className="text-[26px] font-bold text-[#25324B] mb-3">Nice-To-Haves</h2>
                <div className="space-y-3">
                  {job.nice_to_haves.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#56CDAD] flex-shrink-0 mt-0.5" />
                      <p className="text-base text-[#515B6F]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-[301px] flex-shrink-0 space-y-8">
            <div>
              <h3 className="text-[26px] font-bold text-[#25324B] mb-5">About this role</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-base text-[#515B6F]">Location</span>
                  <span className="text-base font-semibold text-[#25324B]">{job.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base text-[#515B6F]">Job Type</span>
                  <span className="text-base font-semibold text-[#25324B]">
                    {job.employment_types?.join(', ') || 'Full-time'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base text-[#515B6F]">Salary</span>
                  <span className="text-base font-semibold text-[#202430]">
                    ₹{(job.salary.min / 1000)}k-₹{(job.salary.max / 1000)}k
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base text-[#515B6F]">Posted</span>
                  <span className="text-base font-semibold text-[#25324B]">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base text-[#515B6F]">Views</span>
                  <span className="text-base font-semibold text-[#25324B]">
                    {job.view_count || 0}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-[26px] font-bold text-[#25324B] mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {job.category_ids?.map((category: string) => (
                  <Badge 
                    key={category}
                    className="bg-[rgba(86,205,173,0.1)] text-[#56CDAD] hover:bg-[rgba(86,205,173,0.1)] px-3 py-1.5"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-[26px] font-bold text-[#25324B] mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills_required.map((skill: string) => (
                  <Badge 
                    key={skill}
                    variant="outline"
                    className="bg-[#F8F8FD] text-[#4045DE] border-0 px-3 py-2 text-base font-normal"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-[#D6DDEB] mx-[96px]" />

        {job.benefits && job.benefits.length > 0 && (
          <div className="px-[96px] py-[58px]">
            <div className="mb-5">
              <h2 className="text-[26px] font-bold text-[#25324B] mb-2">Benefits</h2>
              <p className="text-sm text-[#515B6F]">This job comes with several benefits</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {job.benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#56CDAD] flex-shrink-0 mt-0.5" />
                  <p className="text-base text-[#515B6F]">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="h-px bg-[#D6DDEB] mx-[96px]" />

        <div className="px-[96px] py-[58px]">
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {job.company?.logo ? (
                    <img 
                      src={job.company.logo} 
                      alt={job.company.companyName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-blue-600">
                      {job.company?.companyName?.charAt(0) || 'C'}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-[30px] font-bold text-[#25324B] mb-1">
                    {job.company?.companyName}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-[#515B6F]">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      <span>Technology Company</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>500+ employees</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      <span>Remote friendly</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-base text-[#515B6F] leading-relaxed">
                {job.company?.companyName} is a leading technology company that builds innovative solutions for the modern world. 
                We are committed to creating a diverse and inclusive workplace where talented individuals can thrive and make a meaningful impact.
              </p>
            </div>

            <div className="w-[394px] flex-shrink-0">
              {job.company?.workplacePictures && job.company.workplacePictures.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2 h-[221px] bg-gray-200 rounded overflow-hidden">
                    <img 
                      src={job.company.workplacePictures[0].pictureUrl} 
                      alt={job.company.workplacePictures[0].caption || "Office"} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  {job.company.workplacePictures.slice(1, 3).map((picture: any, index: number) => (
                    <div key={index} className="h-[104px] bg-gray-200 rounded overflow-hidden">
                      <img 
                        src={picture.pictureUrl} 
                        alt={picture.caption || "Office"} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ))}
                  {job.company.workplacePictures.length < 3 && (
                    <div className="h-[104px] bg-gray-200 rounded overflow-hidden">
                      <img src="/white.png" alt="Office" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2 h-[221px] bg-gray-200 rounded overflow-hidden">
                    <img src="/white.png" alt="Office" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-[104px] bg-gray-200 rounded overflow-hidden">
                    <img src="/white.png" alt="Office" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-[104px] bg-gray-200 rounded overflow-hidden">
                    <img src="/white.png" alt="Office" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {similarJobs.length > 0 && (
          <div className="bg-[#F8F8FD] px-[96px] py-[58px]">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-[26px] font-bold text-[#25324B]">Similar Jobs</h2>
              <button 
                onClick={() => navigate('/jobs')}
                className="text-sm font-semibold text-[#4045DE] flex items-center gap-2 hover:underline"
              >
                Show all jobs
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {similarJobs.map((similarJob) => (
                <div 
                  key={similarJob.id} 
                  className="bg-white rounded p-8 space-y-5 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/jobs/${similarJob.id}`)}
                >
                  <div className="flex gap-6">
                    <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {similarJob.company?.logo ? (
                        <img 
                          src={similarJob.company.logo} 
                          alt={similarJob.company.companyName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-blue-600">
                          {similarJob.company?.companyName?.charAt(0) || similarJob.title.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-[#25324B] mb-2">
                        {similarJob.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-[#515B6F] mb-3">
                        <span>{similarJob.company?.companyName}</span>
                        <span className="w-1 h-1 bg-[#515B6F] rounded-full" />
                        <span>{similarJob.location}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-[rgba(86,205,173,0.1)] text-[#56CDAD] hover:bg-[rgba(86,205,173,0.1)]">
                          {similarJob.employment_types?.[0] || 'Full-Time'}
                        </Badge>
                        <div className="w-px h-6 bg-[#D6DDEB]" />
                        {similarJob.category_ids?.slice(0, 2).map((category) => (
                          <Badge 
                            key={category}
                            variant="outline" 
                            className="border-[#4045DE] text-[#4045DE]"
                          >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <PublicFooter />
    </div>
  );
};

export default JobDetail;