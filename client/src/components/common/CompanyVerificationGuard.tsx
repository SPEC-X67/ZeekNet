import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { UserRole } from '@/constants/enums';
import { companyApi } from '@/api/company.api';
import CompanyProfileStatus from '../company/CompanyProfileStatus';

interface CompanyVerificationGuardProps {
  children: React.ReactNode;
}

type ProfileStatus = 'not_created' | 'pending' | 'verified' | 'rejected';

const CompanyVerificationGuard: React.FC<CompanyVerificationGuardProps> = ({ children }) => {
  const { role, isAuthenticated } = useAppSelector((state) => state.auth);
  const [profileStatus, setProfileStatus] = useState<ProfileStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (role !== UserRole.COMPANY || !isAuthenticated) {
    return <>{children}</>;
  }

  useEffect(() => {
    const checkVerificationStatus = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await companyApi.getDashboard();
        
        if (response.success && response.data) {
          const data = response.data as any;
          const status = (data.profileStatus || data.verificationStatus || 'not_created') as ProfileStatus;
          setProfileStatus(status);
        } else {
          if (response.message && (response.data as any)?.verificationStatus) {
            const status = (response.data as any).verificationStatus as ProfileStatus;
            setProfileStatus(status);
          } else {
            setError(response.message || 'Failed to check verification status');
            setProfileStatus('not_created');
          }
        }
      } catch (err: any) {
        console.error('Error checking verification status:', err);
        
        if (err.response?.data?.data?.verificationStatus) {
          const status = err.response.data.data.verificationStatus as ProfileStatus;
          setProfileStatus(status);
        } else {
          setError(err.response?.data?.message || 'Failed to check verification status');
          setProfileStatus('not_created');
        }
      } finally {
        setLoading(false);
      }
    };

    checkVerificationStatus();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Checking verification status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (profileStatus !== 'verified') {
    return <CompanyProfileStatus onStatusChange={setProfileStatus} />;
  }

  return <>{children}</>;
};

export default CompanyVerificationGuard;
