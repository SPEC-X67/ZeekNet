import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useRedux';
import { UserRole } from '@/constants/enums';
import { companyApi } from '@/api/company.api';
import CompanyProfileStatus from '../company/CompanyProfileStatus';

interface CompanyVerificationGuardProps {
  children: React.ReactNode;
}

type ProfileStatus = 'not_created' | 'pending' | 'verified' | 'rejected';

const CompanyVerificationGuard: React.FC<CompanyVerificationGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const { role, isAuthenticated } = useAppSelector((state) => state.auth);
  const [profileStatus, setProfileStatus] = useState<ProfileStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== UserRole.COMPANY || !isAuthenticated) {
      return;
    }
    const checkVerificationStatus = async () => {
      try {
        setLoading(true);
        
        const response = await companyApi.getDashboard();
        
        if (response.success && response.data) {
          const data = response.data as any;
          const status = (data.profileStatus || data.verificationStatus || 'not_created') as ProfileStatus;
          setProfileStatus(status);
        } else {
          if (response.message?.includes('Company profile not found') || 
              response.message?.includes('Please complete your profile')) {
            navigate('/company/profile-setup', { replace: true });
            return;
          }
          
          if (response.message && (response.data as any)?.verificationStatus) {
            const status = (response.data as any).verificationStatus as ProfileStatus;
            setProfileStatus(status);
          } else {
            setProfileStatus('not_created');
          }
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || '';
        
        if (errorMessage.includes('Company profile not found') || 
            errorMessage.includes('Please complete your profile')) {
          navigate('/company/profile-setup', { replace: true });
          return;
        }
        
        if (err.response?.data?.data?.verificationStatus) {
          const status = err.response.data.data.verificationStatus as ProfileStatus;
          setProfileStatus(status);
        } else {
          setProfileStatus('not_created');
        }
      } finally {
        setLoading(false);
      }
    };

    checkVerificationStatus();
  }, [role, isAuthenticated, navigate]);

  if (role !== UserRole.COMPANY || !isAuthenticated) {
    return <>{children}</>;
  }

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

  if (profileStatus !== 'verified') {
    return <CompanyProfileStatus onStatusChange={setProfileStatus} />;
  }

  return <>{children}</>;
};

export default CompanyVerificationGuard;
