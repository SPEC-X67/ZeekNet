import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  MapPin, 
  Filter, 
  X,
  DollarSign,
  Briefcase
} from "lucide-react";
import type { JobPostingQuery } from "@/types/job";

interface JobSearchFiltersProps {
  onSearch: (query: JobPostingQuery) => void;
  loading?: boolean;
}

const employmentTypes = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
  { value: 'remote', label: 'Remote' },
];

const salaryRanges = [
  { value: '0-50000', label: 'Under $50K', min: 0, max: 50000 },
  { value: '50000-75000', label: '$50K - $75K', min: 50000, max: 75000 },
  { value: '75000-100000', label: '$75K - $100K', min: 75000, max: 100000 },
  { value: '100000-150000', label: '$100K - $150K', min: 100000, max: 150000 },
  { value: '150000-200000', label: '$150K - $200K', min: 150000, max: 200000 },
  { value: '200000+', label: '$200K+', min: 200000, max: 999999999 },
];

const JobSearchFilters = ({ onSearch, loading = false }: JobSearchFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<string[]>([]);
  const [selectedSalaryRange, setSelectedSalaryRange] = useState<{min: number, max: number} | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    const query: JobPostingQuery = {
      search: searchQuery.trim() || undefined,
      location: location.trim() || undefined,
      employment_types: selectedEmploymentTypes.length > 0 ? selectedEmploymentTypes : undefined,
      salary_min: selectedSalaryRange?.min,
      salary_max: selectedSalaryRange?.max,
    };
    onSearch(query);
  };

  const handleEmploymentTypeToggle = (type: string) => {
    setSelectedEmploymentTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSalaryRangeSelect = (range: {min: number, max: number}) => {
    setSelectedSalaryRange(prev => 
      prev?.min === range.min && prev?.max === range.max ? null : range
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setSelectedEmploymentTypes([]);
    setSelectedSalaryRange(null);
    onSearch({});
  };

  const hasActiveFilters = searchQuery || location || selectedEmploymentTypes.length > 0 || selectedSalaryRange;

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Job title, keywords, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-primary focus:ring-primary"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            {/* Location Input */}
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="City, state, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-primary focus:ring-primary"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              disabled={loading}
              className="h-12 px-8 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all"
            >
              {loading ? "Searching..." : "Search Jobs"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2 bg-primary text-white">
              {[
                searchQuery && 1,
                location && 1,
                selectedEmploymentTypes.length,
                selectedSalaryRange && 1
              ].reduce((a, b) => (a || 0) + (b || 0), 0)}
            </Badge>
          )}
        </Button>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear all filters
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <Card className="border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Advanced Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Employment Types */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Employment Type
              </h4>
              <div className="flex flex-wrap gap-2">
                {employmentTypes.map((type) => (
                  <Badge
                    key={type.value}
                    variant={selectedEmploymentTypes.includes(type.value) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      selectedEmploymentTypes.includes(type.value)
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleEmploymentTypeToggle(type.value)}
                  >
                    {type.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Salary Range */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Salary Range
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {salaryRanges.map((range) => (
                  <Badge
                    key={range.value}
                    variant={selectedSalaryRange?.min === range.min ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      selectedSalaryRange?.min === range.min
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleSalaryRangeSelect({min: range.min, max: range.max})}
                  >
                    {range.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Apply Filters Button */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <Button
                onClick={handleSearch}
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Search: "{searchQuery}"
              <button
                onClick={() => setSearchQuery("")}
                className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {location && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Location: "{location}"
              <button
                onClick={() => setLocation("")}
                className="ml-2 hover:bg-green-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {selectedEmploymentTypes.map((type) => (
            <Badge key={type} variant="secondary" className="bg-purple-100 text-purple-800">
              {employmentTypes.find(t => t.value === type)?.label}
              <button
                onClick={() => handleEmploymentTypeToggle(type)}
                className="ml-2 hover:bg-purple-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {selectedSalaryRange && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              {salaryRanges.find(r => r.min === selectedSalaryRange.min)?.label}
              <button
                onClick={() => setSelectedSalaryRange(null)}
                className="ml-2 hover:bg-orange-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default JobSearchFilters;
