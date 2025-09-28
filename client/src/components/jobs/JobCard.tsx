import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, DollarSign } from "lucide-react";
import type { JobPostingResponse } from "@/types/job";

interface JobCardProps {
  job: JobPostingResponse;
  onApply?: (jobId: string) => void;
  onViewDetails?: (jobId: string) => void;
}

const JobCard = ({ job, onApply, onViewDetails }: JobCardProps) => {
  const formatSalary = (min: number, max: number) => {
    const formatNumber = (num: number) => {
      if (num >= 1000000) {
        return `$${(num / 1000000).toFixed(1)}M`;
      } else if (num >= 1000) {
        return `$${(num / 1000).toFixed(0)}K`;
      }
      return `$${num.toLocaleString()}`;
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

  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group hover:scale-[1.02] border border-gray-200">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            {/* Company Logo */}
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md">
              {job.company?.logo ? (
                <img 
                  src={job.company.logo} 
                  alt={job.company.companyName}
                  className="w-8 h-8 rounded object-cover"
                />
              ) : (
                <span className="text-white font-bold text-lg">
                  {job.company?.companyName?.charAt(0) || job.title.charAt(0)}
                </span>
              )}
            </div>
            
            {/* Job Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <p className="text-primary font-medium text-sm">
                {job.company?.companyName || 'Company'}
              </p>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>

          {/* Employment Type Badges */}
          <div className="flex flex-wrap gap-1">
            {job.employment_types.slice(0, 2).map((type) => (
              <Badge
                key={type}
                variant="outline"
                className={`text-xs ${getEmploymentTypeColor(type)}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
              </Badge>
            ))}
            {job.employment_types.length > 2 && (
              <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600">
                +{job.employment_types.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {truncateDescription(job.description)}
        </p>

        {/* Job Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>{formatSalary(job.salary.min, job.salary.max)}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{job.application_count} applicants</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        {job.skills_required && job.skills_required.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {job.skills_required.slice(0, 3).map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-xs bg-gray-100 text-gray-700"
                >
                  {skill}
                </Badge>
              ))}
              {job.skills_required.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                  +{job.skills_required.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(job.id)}
            className="hover:bg-primary hover:text-white transition-colors"
          >
            View Details
          </Button>
          <Button
            size="sm"
            onClick={() => onApply?.(job.id)}
            className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all"
          >
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
