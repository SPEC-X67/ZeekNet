import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Edit3, 
  Plus
} from 'lucide-react';

interface WorkplacePicture {
  id?: string;
  pictureUrl: string;
  caption: string;
}

interface CompanyWorkplacePicturesSectionProps {
  pictures: WorkplacePicture[];
  onAdd: () => void;
  onEdit: () => void;
}

const CompanyWorkplacePicturesSection: React.FC<CompanyWorkplacePicturesSectionProps> = ({ 
  pictures, 
  onAdd, 
  onEdit 
}) => {
  const hasPictures = pictures.length > 0;

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-lg font-semibold">Workplace Pictures</h3>
        <div className="flex gap-1.5">
          <Button variant="outline" size="sm" className="p-1.5" onClick={onAdd}>
            <Plus className="h-3.5 w-3.5" />
          </Button>
          {hasPictures && (
            <Button variant="outline" size="sm" className="p-1.5" onClick={onEdit}>
              <Edit3 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
      
      {!hasPictures ? (
        <div className="text-center py-8">
          <div className="text-gray-500 text-sm mb-2">No workplace pictures added yet</div>
          <Button variant="outline" size="sm" onClick={onAdd}>
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Pictures
          </Button>
        </div>
      ) : (
        <div className="flex gap-2.5">
          {/* Main Picture */}
          <div className="w-64 h-72 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              src={pictures[0].pictureUrl} 
              alt={pictures[0].caption || 'Workplace'} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          {/* Side Pictures */}
          <div className="flex flex-col gap-2.5">
            {pictures.slice(1, 4).map((picture, index) => (
              <div key={picture.id || index} className="w-48 h-44 bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={picture.pictureUrl} 
                  alt={picture.caption || 'Workplace'} 
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyWorkplacePicturesSection;

