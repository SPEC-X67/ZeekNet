import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Edit3, 
  MapPin, 
  Users, 
  Building2, 
  Flame,
  Calendar,
  Phone
} from 'lucide-react';
import type { CompanyProfileResponse } from '@/api/company.api';

interface CompanyDetailsSectionProps {
  company: CompanyProfileResponse;
  onEdit: () => void;
}

const CompanyDetailsSection: React.FC<CompanyDetailsSectionProps> = ({ 
  company, 
  onEdit 
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatEmployeeCount = (count?: string) => {
    if (!count) return 'Not specified';
    return count;
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-lg font-semibold">Company Details</h3>
        <Button variant="outline" size="sm" className="p-1.5" onClick={onEdit}>
          <Edit3 className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <div className="space-y-3">
        {}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center">
            <Building2 className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <div className="text-xs text-gray-600">Company Name</div>
            <div className="font-semibold text-gray-900 text-sm">
              {company.company_name || 'Not specified'}
            </div>
          </div>
        </div>

        {}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center">
            <Calendar className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <div className="text-xs text-gray-600">Founded</div>
            <div className="font-semibold text-gray-900 text-sm">
              {formatDate(company.foundedDate || company.created_at)}
            </div>
          </div>
        </div>
        
        {}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <div className="text-xs text-gray-600">Employees</div>
            <div className="font-semibold text-gray-900 text-sm">
              {formatEmployeeCount(company.employees || company.employee_count?.toString())}
            </div>
          </div>
        </div>
        
        {}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center">
            <MapPin className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <div className="text-xs text-gray-600">Location</div>
            <div className="font-semibold text-gray-900 text-sm">
              {company.location || 'Not specified'}
            </div>
          </div>
        </div>
        
        {}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center">
            <Building2 className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <div className="text-xs text-gray-600">Industry</div>
            <div className="font-semibold text-gray-900 text-sm">
              {company.industry || 'Not specified'}
            </div>
          </div>
        </div>

        {}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center">
            <Phone className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <div className="text-xs text-gray-600">Phone</div>
            <div className="font-semibold text-gray-900 text-sm">
              {company.phone || 'Not specified'}
            </div>
          </div>
        </div>

        {}
        {(company.website || company.website_link) && (
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center">
              <Flame className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <div className="text-xs text-gray-600">Website</div>
              <div className="font-semibold text-gray-900 text-sm">
                <a 
                  href={company.website || company.website_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {company.website || company.website_link}
                </a>
              </div>
            </div>
          </div>
        )}

        {}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center">
            <Building2 className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <div className="text-xs text-gray-600">Verification Status</div>
            <Badge 
              className={`text-xs px-2 py-1 ${
                (company.isVerified || company.is_verified) === 'verified' 
                  ? 'bg-green-100 text-green-700' 
                  : (company.isVerified || company.is_verified) === 'rejected'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {company.isVerified || company.is_verified}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsSection;
