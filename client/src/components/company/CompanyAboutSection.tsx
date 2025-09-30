import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit3 } from 'lucide-react';

interface CompanyAboutSectionProps {
  aboutUs: string;
  onEdit: () => void;
}

const CompanyAboutSection: React.FC<CompanyAboutSectionProps> = ({ 
  aboutUs, 
  onEdit 
}) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-lg font-semibold">About Us</h3>
        <Button variant="outline" size="sm" className="p-1.5" onClick={onEdit}>
          <Edit3 className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      {!aboutUs ? (
        <div className="text-center py-8">
          <div className="text-gray-500 text-sm mb-2">No description added yet</div>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit3 className="h-3.5 w-3.5 mr-1.5" />
            Add Description
          </Button>
        </div>
      ) : (
        <p className="text-gray-600 leading-relaxed text-sm">{aboutUs}</p>
      )}
    </div>
  );
};

export default CompanyAboutSection;

