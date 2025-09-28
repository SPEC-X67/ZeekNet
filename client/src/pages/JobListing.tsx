import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  MapPin, 
  Filter, 
  Grid, 
  List,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  Briefcase
} from "lucide-react";
import JobCard from "@/components/jobs/JobCard";
import JobSearchFilters from "@/components/jobs/JobSearchFilters";
import { jobApi } from "@/api/job.api";
import type { JobPostingResponse, JobPostingQuery, PaginatedJobPostings } from "@/types/job";

const JobListing = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobPostingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });
  const [currentQuery, setCurrentQuery] = useState<JobPostingQuery>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (query: JobPostingQuery = {}, page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const searchQuery = {
        ...query,
        page,
        limit: pagination.limit,
      };

      const response = await jobApi.getAllJobs(searchQuery);
      
      if (response.success && response.data) {
        setJobs(response.data.jobs);
        setPagination(response.data.pagination);
        setCurrentQuery(query);
      } else {
        setError(response.message || 'Failed to fetch jobs');
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: JobPostingQuery) => {
    setSearchLoading(true);
    await fetchJobs(query, 1);
    setSearchLoading(false);
  };

  const handlePageChange = (page: number) => {
    fetchJobs(currentQuery, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyJob = (jobId: string) => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login with return URL
      navigate('/auth/login?redirect=/jobs');
      return;
    }
    
    // For now, just show an alert
    alert('Application feature coming soon!');
  };

  const handleViewDetails = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    const pages = [];
    const currentPage = pagination.page;
    const totalPages = pagination.totalPages;

    // Previous button
    pages.push(
      <Button
        key="prev"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>
    );

    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? "bg-primary text-white" : ""}
        >
          {i}
        </Button>
      );
    }

    // Next button
    pages.push(
      <Button
        key="next"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    );

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        {pages}
      </div>
    );
  };

  const renderLoadingState = () => (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-gray-600">Loading jobs...</p>
      </div>
    </div>
  );

  const renderErrorState = () => (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center space-y-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h3 className="text-lg font-semibold text-gray-900">Oops! Something went wrong</h3>
        <p className="text-gray-600 max-w-md">{error}</p>
        <Button onClick={() => fetchJobs()} className="mt-4">
          Try Again
        </Button>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center space-y-4 text-center">
        <Briefcase className="w-12 h-12 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900">No jobs found</h3>
        <p className="text-gray-600 max-w-md">
          We couldn't find any jobs matching your criteria. Try adjusting your search or filters.
        </p>
        <Button 
          variant="outline" 
          onClick={() => fetchJobs({})}
          className="mt-4"
        >
          View All Jobs
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Your Dream Job</h1>
              <p className="text-gray-600 mt-2">
                Discover {pagination.total > 0 ? pagination.total : 'thousands of'} amazing job opportunities
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="flex items-center gap-2"
              >
                <Grid className="w-4 h-4" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="flex items-center gap-2"
              >
                <List className="w-4 h-4" />
                List
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <JobSearchFilters onSearch={handleSearch} loading={searchLoading} />
        </div>

        {/* Results Header */}
        {!loading && !error && jobs.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {pagination.total} job{pagination.total !== 1 ? 's' : ''} found
              </h2>
              {currentQuery.search && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  "{currentQuery.search}"
                </Badge>
              )}
              {currentQuery.location && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {currentQuery.location}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && renderLoadingState()}

        {/* Error State */}
        {error && !loading && renderErrorState()}

        {/* Empty State */}
        {!loading && !error && jobs.length === 0 && renderEmptyState()}

        {/* Jobs Grid/List */}
        {!loading && !error && jobs.length > 0 && (
          <>
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={handleApplyJob}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {/* Pagination */}
            {renderPagination()}
          </>
        )}
      </div>
    </div>
  );
};

export default JobListing;
