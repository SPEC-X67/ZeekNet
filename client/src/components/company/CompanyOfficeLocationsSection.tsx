import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Edit3, 
  Plus, 
  ArrowRight
} from 'lucide-react';

interface OfficeLocation {
  id?: string;
  location: string;
  officeName: string;
  address: string;
  isHeadquarters: boolean;
}

interface CompanyOfficeLocationsSectionProps {
  locations: OfficeLocation[];
  onAdd: () => void;
  onEdit: () => void;
}

const CompanyOfficeLocationsSection: React.FC<CompanyOfficeLocationsSectionProps> = ({ 
  locations, 
  onAdd, 
  onEdit 
}) => {
  const hasLocations = locations.length > 0;

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-lg font-semibold">Office Locations</h3>
        <div className="flex gap-1.5">
          <Button variant="outline" size="sm" className="p-1.5" onClick={onAdd}>
            <Plus className="h-3.5 w-3.5" />
          </Button>
          {hasLocations && (
            <Button variant="outline" size="sm" className="p-1.5" onClick={onEdit}>
              <Edit3 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
      
      {!hasLocations ? (
        <div className="text-center py-8">
          <div className="text-gray-500 text-sm mb-2">No office locations added yet</div>
          <Button variant="outline" size="sm" onClick={onAdd}>
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Office Location
          </Button>
        </div>
      ) : (
        <div>
          {/* Locations List */}
          <div className="space-y-2.5 mb-3.5">
            {locations.map((location, index) => (
              <div key={location.id || index} className="flex items-center gap-2.5">
                <div className="text-xl">🏢</div>
                <div className="flex-1">
                  <div className="font-semibold text-xs">{location.officeName}</div>
                  <div className="text-xs text-gray-600">{location.location}</div>
                  {location.isHeadquarters && (
                    <Badge className="bg-blue-100 text-blue-700 text-xs mt-1 px-2 py-0.5">
                      Headquarters
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" className="text-primary text-sm">
            View all locations
            <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CompanyOfficeLocationsSection;

