import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bookmark } from "lucide-react";
import type { JobPostingResponse } from "@/types/job";

interface JobCardProps {
  job: JobPostingResponse;
  onViewDetails?: (jobId: string) => void;
}

const JobCard = ({ job, onViewDetails }: JobCardProps) => {
  const formatSalary = (min: number, max: number) => {
    const formatNumber = (num: number) => {
      if (num >= 1000000) {
        return `₹${(num / 1000000).toFixed(1)}M`;
      } else if (num >= 1000) {
        return `₹${(num / 1000).toFixed(0)}K`;
      }
      return `₹${num.toLocaleString()}`;
    };
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  };

  const getEmploymentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'part-time':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contract':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'internship':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'remote':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };


  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(job.id || job._id);
    }
  };

  return (
    <Card 
      className="hover:shadow-md transition-all duration-300 group border border-gray-100 bg-white cursor-pointer h-full"
      onClick={handleCardClick}
    >
      <CardContent className="px-3 h-full flex flex-col">
        <div className="mb-3 flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
              {job.title}
            </h3>
            <Bookmark 
              className="w-4 h-4 text-gray-200 hover:text-primary cursor-pointer transition-colors flex-shrink-0 ml-2" 
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
          
          <div className="flex flex-col gap-1 mb-3">
            <div className="flex items-center gap-1">
              {job.employment_types.slice(0, 1).map((type) => (
                <Badge
                  key={type}
                  variant="outline"
                  className={`text-xs px-2 py-0.5 ${getEmploymentTypeColor(type)}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                </Badge>
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {formatSalary(job.salary.min, job.salary.max)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center flex-shrink-0">
            {(job.company_logo || job.company?.logo) ? (
              <img 
                src={job.company_logo || job.company?.logo} 
                alt={job.company_name || job.company?.companyName || 'Company'}
                className="w-6 h-6 rounded object-cover"
              />
            ) : (
              <span className="text-gray-600 font-semibold text-sm">
                {(job.company_name || job.company?.companyName)?.charAt(0) || job.title.charAt(0)}
              </span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {job.company_name || job.company?.companyName || 'Company'}
            </h4>
            <div className="flex items-center text-gray-500 text-xs">
              <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
