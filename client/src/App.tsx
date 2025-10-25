  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import Verification from './pages/auth/Verification'
import AdminDashboard from './pages/admin/AdminDashboard'
import CompanyDashboard from './pages/company/CompanyDashboard'
import CompanyProfileSetup from './pages/company/CompanyProfileSetup'
import PostJob from './pages/company/PostJob'
import UserDashboard from './pages/seeker/UserDashboard'
import UserProfile from './pages/seeker/UserProfile'
import JobListing from './pages/JobListing'
import JobDetail from './pages/JobDetail'
import NotFound from './pages/NotFound'
import AdminLogin from './pages/admin/AdminLogin'
import UserManagement from './pages/admin/UserManagement'
import CompanyManagement from './pages/admin/CompanyManagement'
import PendingCompanies from './pages/admin/PendingCompanies'
import JobManagement from './pages/admin/JobManagement'
import JobView from './pages/admin/JobView'
import ProtectedRoute from './components/common/ProtectedRoute'
import AuthRedirect from './components/common/AuthRedirect'
import { UserRole } from './constants/enums'
import CompanyReapplication from './pages/company/CompanyReapplication'
import CompanyProfile from './pages/company/CompanyProfile'
import CompanyJobListing from './pages/company/JobListing'
import CompanySettings from './pages/company/CompanySettings'
import JobDetails from './pages/company/JobDetails'
import EditJob from './pages/company/EditJob'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/jobs" element={<JobListing />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          
          <Route path="/auth/login" element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          } />
          <Route path="/auth/register" element={
            <AuthRedirect>
              <Register />
            </AuthRedirect>
          } />
          <Route path="/forgot-password" element={
            <AuthRedirect>
              <ForgotPassword />
            </AuthRedirect>
          } />
          <Route path="/reset-password" element={
            <AuthRedirect>
              <ResetPassword />
            </AuthRedirect>
          } />
          <Route path="/verify-email" element={<Verification />} />
          
          <Route path="/admin/login" element={
            <AuthRedirect>
              <AdminLogin />
            </AuthRedirect>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/seekers" element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <UserManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/companies" element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <CompanyManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/pending-companies" element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <PendingCompanies />
            </ProtectedRoute>
          } />
          <Route path="/admin/jobs" element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <JobManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/jobs/:jobId" element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <JobView />
            </ProtectedRoute>
          } />
          
          <Route path="/company/dashboard" element={
            <ProtectedRoute allowedRoles={[UserRole.COMPANY]}>
              <CompanyDashboard />
            </ProtectedRoute>
          } />
          <Route path="/company/profile-setup" element={
            <ProtectedRoute allowedRoles={[UserRole.COMPANY]}>
              <CompanyProfileSetup />
            </ProtectedRoute>
          } />
          <Route path="/company/post-job" element={
            <ProtectedRoute allowedRoles={[UserRole.COMPANY]}>
              <PostJob />
            </ProtectedRoute>
          } />

          <Route path="/company/reapply" element={
            <ProtectedRoute allowedRoles={[UserRole.COMPANY]}>
              <CompanyReapplication />
            </ProtectedRoute>
          } />
          <Route path="/company/profile" element={
            <ProtectedRoute allowedRoles={[UserRole.COMPANY]}>
              <CompanyProfile />
            </ProtectedRoute>
          } />
          <Route path="/company/job-listing" element={
            <ProtectedRoute allowedRoles={[UserRole.COMPANY]}>
              <CompanyJobListing />
            </ProtectedRoute>
          } />
          <Route path="/company/settings" element={
            <ProtectedRoute allowedRoles={[UserRole.COMPANY]}>
              <CompanySettings />
            </ProtectedRoute>
          } />
          <Route path="/company/job-details/:id" element={
            <ProtectedRoute allowedRoles={[UserRole.COMPANY]}>
              <JobDetails />
            </ProtectedRoute>
          } />
          <Route path="/company/edit-job/:id" element={
            <ProtectedRoute allowedRoles={[UserRole.COMPANY]}>
              <EditJob />
            </ProtectedRoute>
          } />
          
          <Route path="/seeker/dashboard" element={
            <ProtectedRoute allowedRoles={[UserRole.SEEKER]}>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/seeker/profile" element={
            <ProtectedRoute allowedRoles={[UserRole.SEEKER]}>
              <UserProfile />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster 
        position="top-right"
        expand={true}
        richColors
        closeButton
      />
    </>
  )
}

export default App
