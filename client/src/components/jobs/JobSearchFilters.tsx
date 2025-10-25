import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  MapPin, 
  Filter, 
  X,
  IndianRupee,
  Briefcase,
  Sliders,
  Crosshair
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
  { value: '0-500000', label: 'Under ₹5L', min: 0, max: 500000 },
  { value: '500000-1000000', label: '₹5L - ₹10L', min: 500000, max: 1000000 },
  { value: '1000000-2000000', label: '₹10L - ₹20L', min: 1000000, max: 2000000 },
  { value: '2000000-5000000', label: '₹20L - ₹50L', min: 2000000, max: 5000000 },
  { value: '5000000-10000000', label: '₹50L - ₹1Cr', min: 5000000, max: 10000000 },
  { value: '10000000+', label: '₹1Cr+', min: 10000000, max: 999999999 },
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
      {}
      <Card className="border border-gray-100 shadow-sm bg-white">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            {}
            <div className="flex-1 relative">
              <div className="flex items-center bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center px-3 py-3 border-r border-gray-200">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by: Job title, Position, Keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-3 text-sm placeholder-gray-400 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            
            {}
            <div className="w-px h-12 bg-gray-200"></div>
            
            {}
            <div className="flex-1 relative">
              <div className="flex items-center bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center px-3 py-3 border-r border-gray-200">
                  <Crosshair className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="City, state or zip code"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 px-3 py-3 text-sm placeholder-gray-400 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <div className="px-3 py-3">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
            
            {}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-gray-50 border-gray-200 hover:bg-gray-100"
              >
                <Sliders className="w-4 h-4" />
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
              <Button 
                onClick={handleSearch}
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-white px-6"
              >
                {loading ? "Searching..." : "Find Job"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {}
      {hasActiveFilters && (
        <div className="flex items-center justify-end">
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear all filters
          </Button>
        </div>
      )}

      {}
      {showFilters && (
        <Card className="border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Advanced Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {}
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

            {}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <IndianRupee className="w-4 h-4" />
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

            {}
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

      {}
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
