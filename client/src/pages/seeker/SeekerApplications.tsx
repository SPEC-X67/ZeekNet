import { Calendar, ChevronLeft, ChevronRight, MoreHorizontal, Search, SlidersHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type ApplicationStatus =
  | 'In Review'
  | 'Shortlisted'
  | 'Offered'
  | 'Interviewing'
  | 'Unsuitable'

interface ApplicationRow {
  id: number
  company: string
  position: string
  appliedOn: string
  status: ApplicationStatus
  initials: string
  accent: string
}

const statusStyles: Record<ApplicationStatus, string> = {
  'In Review': 'border-[#facc1533] text-[#d97706] bg-[#fef3c7]/60',
  Shortlisted: 'border-[#34d39933] text-[#047857] bg-[#dcfce7]/70',
  Offered: 'border-[#4f46e533] text-[#4338ca] bg-[#e0e7ff]/70',
  Interviewing: 'border-[#fb923c33] text-[#c2410c] bg-[#ffedd5]/70',
  Unsuitable: 'border-[#f8717133] text-[#b91c1c] bg-[#fee2e2]/70',
}

const tabs = [
  { label: 'All', count: 45, active: true },
  { label: 'In Review', count: 34 },
  { label: 'Interviewing', count: 18 },
  { label: 'Assessment', count: 5 },
  { label: 'Offered', count: 2 },
  { label: 'Hired', count: 1 },
]

const applications: ApplicationRow[] = [
  {
    id: 1,
    company: 'Nomad',
    position: 'Social Media Assistant',
    appliedOn: '24 July 2021',
    status: 'In Review',
    initials: 'NO',
    accent: 'bg-[#f3f4ff] text-[#4f46e5]',
  },
  {
    id: 2,
    company: 'Udacity',
    position: 'UX Designer',
    appliedOn: '20 July 2021',
    status: 'Shortlisted',
    initials: 'UD',
    accent: 'bg-[#ecfdf5] text-[#047857]',
  },
  {
    id: 3,
    company: 'Packer',
    position: 'Content Strategist',
    appliedOn: '16 July 2021',
    status: 'Offered',
    initials: 'PK',
    accent: 'bg-[#eef2ff] text-[#4338ca]',
  },
  {
    id: 4,
    company: 'Divvy',
    position: 'Lead Product Designer',
    appliedOn: '14 July 2021',
    status: 'Interviewing',
    initials: 'DV',
    accent: 'bg-[#fff7ed] text-[#ea580c]',
  },
  {
    id: 5,
    company: 'DigitalOcean',
    position: 'Senior Frontend Engineer',
    appliedOn: '10 July 2021',
    status: 'Unsuitable',
    initials: 'DO',
    accent: 'bg-[#fee2e2] text-[#dc2626]',
  },
]

const pagination = [1, 2, 3, 4]

export function SeekerApplications() {
  return (
    <div className="px-8 xl:px-11 py-9 space-y-6 bg-[#f8f9ff] min-h-screen">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-[26px] font-bold text-[#1f2937]">Keep it up, Jake 🎯</h1>
          <p className="text-[14px] text-[#6b7280]">
            Here is job applications status from July 19 - July 25.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-[13px] font-semibold text-[#374151] shadow-sm transition-all duration-200 hover:border-[#c7d2fe] hover:bg-[#f0f4ff]">
          <Calendar className="h-4 w-4 text-[#4640de]" />
          Jul 19 - Jul 25
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
        <div className="space-y-6 border-b border-[#e5e7eb] px-6 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-[22px] font-bold text-[#1f2937]">Applications History</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex w-full items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-[13px] shadow-sm transition-all focus-within:border-[#4640de] focus-within:ring-2 focus-within:ring-[#6366f1]/20">
                <Search className="h-4 w-4 text-[#6b7280]" />
                <input
                  className="w-full bg-transparent text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none"
                  type="search"
                  placeholder="Search applications"
                />
              </div>

              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-[13px] font-semibold text-[#1f2937] shadow-sm transition-all duration-200 hover:border-[#4640de] hover:bg-[#f8f9ff]">
                <SlidersHorizontal className="h-4 w-4 text-[#4640de]" />
                Filter
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[14px] font-semibold">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                className={cn(
                  'relative pb-2 transition-all duration-200',
                  tab.active
                    ? 'text-[#1f2937] after:absolute after:-bottom-[1px] after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-[#4640de]'
                    : 'text-[#9ca3af] hover:text-[#4640de]'
                )}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="text-left text-[12px] font-semibold uppercase tracking-wide text-[#6b7280]">
                <th className="px-6 py-4">#</th>
                <th className="py-4 pr-6">Company Name</th>
                <th className="py-4 pr-6">Role</th>
                <th className="py-4 pr-6">Date Applied</th>
                <th className="py-4 pr-6">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr
                  key={application.id}
                  className={cn(
                    'align-middle text-[14px] text-[#1f2937] transition-colors duration-200',
                    index % 2 === 1 ? 'bg-[#f9fafc]' : 'bg-white',
                    'hover:bg-[#f8f9ff]'
                  )}
                >
                  <td className="px-6 py-5 text-[13px] font-semibold text-[#6b7280]">
                    {String(application.id).padStart(2, '0')}
                  </td>
                  <td className="py-5 pr-6">
                    <div className="flex items-center gap-3">
                      <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl font-semibold', application.accent)}>
                        {application.initials}
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-[#1f2937]">{application.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 pr-6 text-[14px] font-medium text-[#1f2937]">
                    {application.position}
                  </td>
                  <td className="py-5 pr-6 text-[13px] font-medium text-[#6b7280]">
                    {application.appliedOn}
                  </td>
                  <td className="py-5 pr-6">
                    <Badge
                      variant="outline"
                      className={cn('rounded-full border px-3 py-1 text-[12px] font-semibold', statusStyles[application.status])}
                    >
                      {application.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#6b7280] transition-all hover:bg-[#eef2ff] hover:text-[#4640de]">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#e5e7eb] px-6 py-5 text-[12px] text-[#6b7280] md:flex-row md:items-center md:justify-between">
          <p>Showing 1 to 5 of 45 applications</p>

          <div className="flex items-center gap-2">
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#6b7280] transition-all hover:border-[#4640de] hover:text-[#4640de]">
              <ChevronLeft className="h-4 w-4" />
            </button>

            {pagination.map((page) => (
              <button
                key={page}
                className={cn(
                  'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border text-[13px] font-semibold transition-all',
                  page === 1
                    ? 'border-transparent bg-gradient-to-r from-[#4640de] to-[#6366f1] text-white shadow-[0_10px_30px_rgba(70,64,222,0.25)]'
                    : 'border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#4640de] hover:text-[#4640de]'
                )}
              >
                {page}
              </button>
            ))}

            <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#6b7280] transition-all hover:border-[#4640de] hover:text-[#4640de]">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeekerApplications

