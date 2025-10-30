import { useEffect, useState } from 'react'
import CompanyLayout from '../../components/layouts/CompanyLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight,
  FileText,
  TrendingUp,
  Calendar,
  Eye
} from 'lucide-react'
import { companyApi, type CompanyProfileResponse } from '@/api/company.api'
import { toast } from 'sonner'
import FormDialog from '@/components/common/FormDialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Upload, Loader2 } from 'lucide-react'

const CompanyDashboard = () => {
  const [profile, setProfile] = useState<CompanyProfileResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [reverifyOpen, setReverifyOpen] = useState(false)
  const [reverifyStep, setReverifyStep] = useState<1 | 2>(1)
  const [form, setForm] = useState({
    company_name: '',
    email: '',
    website: '',
    website_link: '',
    industry: '',
    organisation: '',
    location: '',
    employees: '',
    description: '',
    about_us: '',
    logo: '',
    business_license: '',
    tax_id: ''
  })
  const [uploading, setUploading] = useState<{ logo: boolean; business_license: boolean }>({ logo: false, business_license: false })

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await companyApi.getCompleteProfile()
        if (resp.success && resp.data) {
          const data = resp.data!
          const p = data.profile
          setProfile(p)
          setForm(prev => ({
            ...prev,
            company_name: p.company_name || '',
            email: p.email || '',
            website: p.website || p.website_link || '',
            website_link: p.website_link || '',
            industry: p.industry || '',
            organisation: p.organisation || '',
            location: p.location || '',
            employees: (p as any).employees || String(p.employee_count || ''),
            description: p.description || '',
            about_us: p.about_us || '',
            logo: p.logo || '',
            business_license: p.business_license || '',
            tax_id: p.tax_id || ''
          }))
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const jobStats = [
    { day: 'Mon', views: 45, applied: 12 },
    { day: 'Tue', views: 67, applied: 18 },
    { day: 'Wed', views: 54, applied: 34 },
    { day: 'Thu', views: 89, applied: 25 },
    { day: 'Fri', views: 92, applied: 28 },
    { day: 'Sat', views: 56, applied: 15 },
    { day: 'Sun', views: 34, applied: 9 }
  ]
  
  return (
    <CompanyLayout>
      <div className="min-h-screen">
        {}
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-1">Good morning, Maria</h1>
              <p className="text-sm text-gray-600">
                Here is your job listings statistic report from July 19 - July 25.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg">
                <Calendar className="h-3 w-3 text-[#4640DE]" />
                <span className="text-sm font-semibold text-gray-900">Jul 19 - Jul 25</span>
              </div>
            </div>
          </div>


          {!loading && profile && profile.is_verified !== 'verified' && (
            <div className={`mb-4 border rounded-lg p-4 ${profile.is_verified === 'rejected' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-md font-bold text-gray-900">
                    {profile.is_verified === 'rejected' ? 'Verification Rejected' : 'Verification Pending'}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {profile.is_verified === 'rejected'
                      ? 'Reason: Your submission did not meet verification requirements. (demo reason — backend reason coming soon)'
                      : 'Your company verification is currently under review.'}
                  </p>
                </div>
                {profile.is_verified === 'rejected' && (
                  <Button size="sm" variant="destructive" onClick={() => { setReverifyStep(1); setReverifyOpen(true) }}>
                    Reverify
                  </Button>
                )}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {}
            <div className="bg-[#FF2D55] rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1">76</p>
                  <p className="text-sm font-medium">New candidates to review</p>
                </div>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>

            {}
            <div className="bg-[#A2845E] rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1">3</p>
                  <p className="text-sm font-medium">Schedule for today</p>
                </div>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>

            {}
            <div className="bg-[#34C759] rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1">24</p>
                  <p className="text-sm font-medium">Messages received</p>
                </div>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          {}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {}
            <div className="lg:col-span-2">
              <Card className="bg-white border border-gray-200 rounded-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900">Job statistics</CardTitle>
                      <CardDescription className="text-sm text-gray-600">Showing Jobstatistic Jul 19-25</CardDescription>
                    </div>
                    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                      <Button variant="ghost" size="sm" className="bg-white text-[#4640DE] font-semibold text-xs">Week</Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 text-xs">Month</Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 text-xs">Year</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {}
                    <div className="flex space-x-6 border-b border-gray-200">
                      <button className="pb-1 border-b-2 border-[#4640DE] text-[#4640DE] font-semibold text-sm">Overview</button>
                      <button className="pb-1 text-gray-600 font-semibold text-sm">Jobs View</button>
                      <button className="pb-1 text-gray-600 font-semibold text-sm">Jobs Applied</button>
                    </div>

                    {}
                    <div className="space-y-3">
                      {}
                      <div className="h-48 flex items-end space-x-3">
                        {jobStats.map((stat, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center space-y-1">
                            <div className="w-full flex flex-col space-y-0.5">
                              <div 
                                className="bg-[#FFCC00] rounded-t"
                                style={{ height: `${(stat.views / 150) * 150}px` }}
                              ></div>
                              <div 
                                className="bg-[#AF52DE] rounded-b"
                                style={{ height: `${(stat.applied / 50) * 150}px` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600">{stat.day}</span>
                          </div>
                        ))}
                      </div>

                      {}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-[#FFCC00] rounded"></div>
                          <span className="text-xs text-gray-600">Job View</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-[#AF52DE] rounded"></div>
                          <span className="text-xs text-gray-600">Job Applied</span>
                        </div>
                      </div>
                    </div>

                    {}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Card className="bg-white border border-gray-200 rounded-lg">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-gray-900">Job Views</h3>
                            <div className="w-6 h-6 bg-[#FFB836] rounded-full flex items-center justify-center">
                              <Eye className="h-3 w-3 text-white" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-2xl font-bold text-gray-900">2,342</p>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-600">This Week</span>
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="h-2 w-2 text-[#7B61FF]" />
                                <span className="text-xs text-[#7B61FF] font-medium">6.4%</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white border border-gray-200 rounded-lg">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-gray-900">Job Applied</h3>
                            <div className="w-6 h-6 bg-[#7B61FF] rounded-full flex items-center justify-center">
                              <FileText className="h-3 w-3 text-white" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-2xl font-bold text-gray-900">654</p>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-600">This Week</span>
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="h-2 w-2 text-red-500" />
                                <span className="text-xs text-red-500 font-medium">0.5%</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {}
            <div className="space-y-4">
              {}
              <Card className="bg-white border border-gray-200 rounded-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-gray-900">Job Open</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-gray-900 mb-1">12</p>
                    <p className="text-sm text-gray-600">Jobs Opened</p>
                  </div>
                </CardContent>
              </Card>

              {}
              <Card className="bg-white border border-gray-200 rounded-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-gray-900">Applicants Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <p className="text-4xl font-bold text-gray-900 mb-1">67</p>
                    <p className="text-sm text-gray-600">Applicants</p>
                  </div>

                  {}
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    <div className="w-8 h-3 bg-[#7B61FF] rounded"></div>
                    <div className="w-4 h-3 bg-[#56CDAD] rounded"></div>
                    <div className="w-2 h-3 bg-[#26A4FF] rounded"></div>
                    <div className="w-1 h-3 bg-[#FFB836] rounded"></div>
                    <div className="w-1 h-3 bg-[#FF6550] rounded"></div>
                  </div>

                  {}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-[#7B61FF] rounded"></div>
                        <span className="text-xs text-gray-600">Full Time : 45</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-[#56CDAD] rounded"></div>
                        <span className="text-xs text-gray-600">Part-Time : 24</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-[#26A4FF] rounded"></div>
                        <span className="text-xs text-gray-600">Remote : 22</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-[#FFB836] rounded"></div>
                        <span className="text-xs text-gray-600">Internship : 32</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-[#FF6550] rounded"></div>
                        <span className="text-xs text-gray-600">Contract : 30</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {}
          <div className="mt-6">
            <Card className="bg-white border border-gray-200 rounded-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Job Updates</CardTitle>
                  <Button variant="ghost" className="text-[#4640DE] font-semibold flex items-center space-x-1 text-sm">
                    <span>View All</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {}
                  {[
                    { company: 'Nomad', title: 'Social Media Assistant', location: 'Paris, France', type: 'Full-Time', categories: ['Marketing', 'Design'], progress: 50 },
                    { company: 'Dropbox', title: 'Brand Designer', location: 'Paris, France', type: 'Full-Time', categories: ['Business', 'Design'], progress: 50 },
                    { company: 'Terraform', title: 'Interactive Developer', location: 'Berlin, Germany', type: 'Full-Time', categories: ['Marketing', 'Design'], progress: 50 },
                    { company: 'ClassPass', title: 'Product Designer', location: 'Berlin, Germ..', type: 'Full-Time', categories: ['Business', 'Design'], progress: 50 }
                  ].map((job, index) => (
                    <Card key={index} className="bg-white border border-gray-200 rounded-lg">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {}
                          <div className="flex items-center justify-between">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{job.company[0]}</span>
                            </div>
                            <Badge className="bg-green-100 text-green-600 border-green-200 text-xs">Full-Time</Badge>
                          </div>

                          {}
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">{job.title}</h3>
                            <div className="flex items-center space-x-1 text-gray-600">
                              <span className="text-xs">{job.company}</span>
                              <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
                              <span className="text-xs">{job.location}</span>
                            </div>
                          </div>

                          {}
                          <div className="flex flex-wrap gap-1">
                            {job.categories.map((category, catIndex) => (
                              <Badge key={catIndex} variant="outline" className="text-xs px-2 py-0.5">
                                {category}
                              </Badge>
                            ))}
                          </div>

                          {}
                          <div className="space-y-1">
                            <div className="flex space-x-0.5">
                              {[...Array(5)].map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`h-1 flex-1 rounded ${i < 2 ? 'bg-green-500' : 'bg-gray-200'}`}
                                ></div>
                              ))}
                            </div>
                            <p className="text-xs text-gray-600">5 applied of 10 capacity</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Reverify Dialog - prefilled using live API */}
      <FormDialog
        open={reverifyOpen}
        onOpenChange={setReverifyOpen}
        title="Reverify Company"
        description="Update required details and resubmit for verification."
        submitLabel={reverifyStep === 1 ? 'Next' : 'Submit'}
        onSubmit={async () => {
          if (reverifyStep === 1) {
            setReverifyStep(2)
            return
          }
          try {
            const resp = await companyApi.reapplyVerification({
              company_name: form.company_name,
              email: form.email || undefined,
              website: form.website || form.website_link || undefined,
              industry: form.industry,
              organisation: form.organisation,
              location: form.location || undefined,
              employees: form.employees || undefined,
              description: form.description || undefined,
              about_us: form.about_us || undefined,
              logo: form.logo || undefined,
              business_license: form.business_license || undefined,
              tax_id: form.tax_id || undefined,
            })
            if (resp.success) {
              toast.success('Reverification submitted. Status set to pending.')
              setProfile(prev => prev ? { ...prev, is_verified: 'pending' } : prev)
              setReverifyOpen(false)
            } else {
              toast.error(resp.message || 'Failed to submit reverification')
            }
          } catch {
            toast.error('Failed to submit reverification')
          }
        }}
        
        cancelLabel="Cancel"
        maxWidth="lg"
      >
        <div className="space-y-4">
          {reverifyStep === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company_name" className="text-sm mb-3 font-semibold">Company Name</Label>
                <Input id="company_name" value={form.company_name} onChange={e => setForm(p => ({ ...p, company_name: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm mb-3 font-semibold">Company Email</Label>
                <Input id="email" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="website" className="text-sm mb-3 font-semibold">Website</Label>
                <Input id="website" value={form.website} onChange={e => setForm(p => ({ ...p, website: e.target.value }))} placeholder="https://example.com" />
              </div>
              <div>
                <Label htmlFor="industry" className="text-sm mb-3 font-semibold">Industry</Label>
                <Input id="industry" value={form.industry} onChange={e => setForm(p => ({ ...p, industry: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="organisation" className="text-sm mb-3 font-semibold">Organisation Type</Label>
                <Input id="organisation" value={form.organisation} onChange={e => setForm(p => ({ ...p, organisation: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="location" className="text-sm mb-3 font-semibold">Location</Label>
                <Input id="location" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="employees" className="text-sm mb-3 font-semibold">Employees</Label>
                <Input id="employees" value={form.employees} onChange={e => setForm(p => ({ ...p, employees: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="tax_id" className="text-sm mb-3 font-semibold">Tax ID</Label>
                <Input id="tax_id" value={form.tax_id} onChange={e => setForm(p => ({ ...p, tax_id: e.target.value }))} />
              </div>
            </div>
          ) : (
            <>
              <div>
                <Label htmlFor="description" className="text-sm mb-3 font-semibold">Company Description</Label>
                <Textarea id="description" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={4} />
              </div>

              <div className="grid grid-cols-1   gap-4">
                <div>
                  <Label className="text-sm mb-3 font-semibold">Company Logo</Label>
                  <div className="border-2 border-dashed rounded-md p-4 text-center">
                    {form.logo ? (
                      <div className="space-y-3">
                        <img src={form.logo} alt="Company Logo" className="h-16 w-16 mx-auto rounded object-cover" />
                        <Button type="button" variant="outline" disabled={uploading.logo} onClick={() => document.getElementById('modal-logo-upload')?.click()}>
                          {uploading.logo ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />Uploading...</>) : (<><Upload className="h-4 w-4 mr-2" />Change Logo</>)}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="h-10 w-10 mx-auto text-gray-400" />
                        <Button type="button" variant="outline" disabled={uploading.logo} onClick={() => document.getElementById('modal-logo-upload')?.click()}>
                          {uploading.logo ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />Uploading...</>) : (<><Upload className="h-4 w-4 mr-2" />Choose File</>)}
                        </Button>
                      </div>
                    )}
                    <input id="modal-logo-upload" type="file" accept="image/*" className="hidden" onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      try {
                        setUploading(u => ({ ...u, logo: true }))
                        const up = await companyApi.uploadLogo(file)
                        const url = up.data?.url
                        if (up.success && url) setForm(p => ({ ...p, logo: url }))
                        toast.success('Logo uploaded successfully')
                      } catch {
                        toast.error('Failed to upload logo')
                      } finally {
                        setUploading(u => ({ ...u, logo: false }))
                      }
                    }} />
                  </div>
                </div>
                <div>
                  <Label className="text-sm mb-3 font-semibold">Business License</Label>
                  <div className="border-2 border-dashed rounded-md p-4 text-center">
                    {form.business_license ? (
                      <div className="space-y-3">
                        <FileText className="h-10 w-10 mx-auto text-green-600" />
                        <Button type="button" variant="outline" disabled={uploading.business_license} onClick={() => document.getElementById('modal-bl-upload')?.click()}>
                          {uploading.business_license ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />Uploading...</>) : (<><Upload className="h-4 w-4 mr-2" />Change Document</>)}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="h-10 w-10 mx-auto text-gray-400" />
                        <Button type="button" variant="outline" disabled={uploading.business_license} onClick={() => document.getElementById('modal-bl-upload')?.click()}>
                          {uploading.business_license ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />Uploading...</>) : (<><Upload className="h-4 w-4 mr-2" />Upload Document</>)}
                        </Button>
                      </div>
                    )}
                    <input id="modal-bl-upload" type="file" accept=".pdf,.doc,.docx,image/*" className="hidden" onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      try {
                        setUploading(u => ({ ...u, business_license: true }))
                        const up = await companyApi.uploadBusinessLicense(file)
                        const url = up.data?.url
                        if (up.success && url) setForm(p => ({ ...p, business_license: url }))
                        toast.success('Business license uploaded successfully')
                      } catch {
                        toast.error('Failed to upload business license')
                      } finally {
                        setUploading(u => ({ ...u, business_license: false }))
                      }
                    }} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </FormDialog>
    </CompanyLayout>
  )
}

export default CompanyDashboard
