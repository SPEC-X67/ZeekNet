import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Edit3, 
  Plus, 
  ArrowRight
} from 'lucide-react';

interface TechStackItem {
  id?: string;
  techStack: string;
}

interface CompanyTechStackSectionProps {
  techStack: TechStackItem[];
  onAdd: () => void;
  onEdit: () => void;
}

const CompanyTechStackSection: React.FC<CompanyTechStackSectionProps> = ({ 
  techStack, 
  onAdd, 
  onEdit 
}) => {
  const hasTechStack = techStack.length > 0;

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-lg font-semibold">Tech Stack</h3>
        <div className="flex gap-1.5">
          <Button variant="outline" size="sm" className="p-1.5" onClick={onAdd}>
            <Plus className="h-3.5 w-3.5" />
          </Button>
          {hasTechStack && (
            <Button variant="outline" size="sm" className="p-1.5" onClick={onEdit}>
              <Edit3 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
      
      {!hasTechStack ? (
        <div className="text-center py-8">
          <div className="text-gray-500 text-sm mb-2">No tech stack added yet</div>
          <Button variant="outline" size="sm" onClick={onAdd}>
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Tech Stack
          </Button>
        </div>
      ) : (
        <div>
          {/* Tech Stack Grid */}
          <div className="grid grid-cols-3 gap-2.5 mb-5">
            {techStack.slice(0, 6).map((tech, index) => (
              <div key={tech.id || index} className="flex flex-col items-center gap-1.5 p-2.5">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-semibold">
                    {tech.techStack.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="text-xs text-center">{tech.techStack}</span>
              </div>
            ))}
          </div>
          
          {techStack.length > 6 && (
            <div className="border-t border-gray-200 pt-3.5">
              <Button variant="ghost" className="text-primary text-sm">
                View all tech stack
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyTechStackSection;

