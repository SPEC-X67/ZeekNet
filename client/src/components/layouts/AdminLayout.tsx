import type { ReactNode } from 'react'
import AdminHeader from '../headers/AdminHeader'
import AdminSidebar from '../sidebars/AdminSidebar'

interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="fixed left-0 top-0 h-full z-30">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Fixed Header */}
        <div className="fixed top-0 right-0 left-64 z-20">
          <AdminHeader />
        </div>

        {/* Scrollable Main Content Area */}
        <main className="flex-1 p-6 bg-gray-50 mt-16 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        {/* <AdminFooter /> */}
      </div>
    </div>
  )
}

export default AdminLayout
