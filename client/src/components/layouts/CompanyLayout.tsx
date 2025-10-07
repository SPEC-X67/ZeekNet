import type { ReactNode } from 'react'
import CompanyHeader from '../headers/CompanyHeader'
import CompanySidebar from '../sidebars/CompanySidebar'
import CompanyVerificationGuard from '../common/CompanyVerificationGuard'

interface CompanyLayoutProps {
  children: ReactNode
}

const CompanyLayout = ({ children }: CompanyLayoutProps) => {
  return (
    <CompanyVerificationGuard>
      <div className="flex h-screen bg-background overflow-hidden">
        <div className="fixed left-0 top-0 h-full z-30">
          <CompanySidebar />
        </div>

        <div className="flex-1 flex flex-col ml-[235px]">
          {}
          <div className="fixed top-0 right-0 left-[235px] z-20">
            <CompanyHeader />
          </div>

          <main className="flex-1 p-6 mt-16 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </CompanyVerificationGuard>
  )
}

export default CompanyLayout
