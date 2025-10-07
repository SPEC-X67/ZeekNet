import type { ReactNode } from 'react'
import UserHeader from '../headers/UserHeader'
import UserSidebar from '../sidebars/UserSidebar'

interface UserLayoutProps {
  children: ReactNode
}

const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="fixed left-0 top-0 h-full z-30">
        <UserSidebar />
      </div>

      <div className="flex-1 flex flex-col ml-64">
        <div className="fixed top-0 right-0 left-64 z-20">
          <UserHeader />
        </div>

        <main className="flex-1 p-6 bg-muted/30 mt-16 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default UserLayout
