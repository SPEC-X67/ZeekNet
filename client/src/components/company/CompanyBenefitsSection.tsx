import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Edit3, 
  Plus, 
  Heart,
  Star,
  Video,
  Coffee,
  Briefcase
} from 'lucide-react';

interface Benefit {
  id?: string;
  perk: string;
  description: string;
}

interface CompanyBenefitsSectionProps {
  benefits: Benefit[];
  onAdd: () => void;
  onEdit: () => void;
}

const CompanyBenefitsSection: React.FC<CompanyBenefitsSectionProps> = ({ 
  benefits, 
  onAdd, 
  onEdit 
}) => {
  const hasBenefits = benefits.length > 0;

  const getBenefitIcon = (perk: string) => {
    const perkLower = perk.toLowerCase();
    if (perkLower.includes('health') || perkLower.includes('medical')) return Heart;
    if (perkLower.includes('vacation') || perkLower.includes('time off')) return Star;
    if (perkLower.includes('skill') || perkLower.includes('learning') || perkLower.includes('development')) return Video;
    if (perkLower.includes('remote') || perkLower.includes('work from home')) return Coffee;
    if (perkLower.includes('commuter') || perkLower.includes('transport')) return Briefcase;
    return Star;
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-lg font-semibold">Benefits & Perks</h3>
        <div className="flex gap-1.5">
          <Button variant="outline" size="sm" className="p-1.5" onClick={onAdd}>
            <Plus className="h-3.5 w-3.5" />
          </Button>
          {hasBenefits && (
            <Button variant="outline" size="sm" className="p-1.5" onClick={onEdit}>
              <Edit3 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
      
      {!hasBenefits ? (
        <div className="text-center py-8">
          <div className="text-gray-500 text-sm mb-2">No benefits added yet</div>
          <Button variant="outline" size="sm" onClick={onAdd}>
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Benefits
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3.5">
          {benefits.map((benefit, index) => {
            const IconComponent = getBenefitIcon(benefit.perk);
            return (
              <div key={benefit.id || index} className="bg-gray-50 p-5 rounded-lg">
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{benefit.perk}</h4>
                    <p className="text-xs text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CompanyBenefitsSection;

