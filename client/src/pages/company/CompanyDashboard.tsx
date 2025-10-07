import { useEffect } from 'react'
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

const CompanyDashboard = () => {
  useEffect(() => {
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
          {}
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

          {}
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
    </CompanyLayout>
  )
}

export default CompanyDashboard
