import { Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
interface SeekerHeaderProps {
  currentPage: string;
}

const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  profile: 'My Profile',
  applications: 'My Applications',
  settings: 'Settings',
};

export function SeekerHeader({ currentPage }: SeekerHeaderProps) {
  const navigate = useNavigate()
  return (
    <div className="bg-white/80 backdrop-blur-sm h-[76px] border-b border-[#e5e7eb] flex items-center justify-between px-8 xl:px-11 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-[22px] text-[#1f2937] leading-tight" style={{ fontWeight: '700' }}>
            {pageTitles[currentPage] || 'Dashboard'}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="seekerOutline"
          style={{ fontWeight: '700' }}
          onClick={() => navigate('/')}
        >
          Back to homepage
        </Button>

        <div className="relative">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center border border-[#e5e7eb] cursor-pointer hover:bg-[#f8f9ff] hover:border-[#4640de] transition-all duration-200">
            <Bell className="w-5 h-5 text-[#6b7280]" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#ef4444] to-[#f97316] rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">3</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeekerHeader;