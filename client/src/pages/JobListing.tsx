import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  Briefcase,
  Home
} from "lucide-react";
import JobCard from "@/components/jobs/JobCard";
import JobSearchFilters from "@/components/jobs/JobSearchFilters";
import { jobApi } from "@/api/job.api";
import type { JobPostingResponse, JobPostingQuery } from "@/types/job";
import PublicHeader from "@/components/layouts/PublicHeader";
import PublicFooter from "@/components/layouts/PublicFooter";

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
  const [viewMode] = useState<'grid' | 'list'>('grid');

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

  const handleApplyJob = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth/login?redirect=/jobs');
      return;
    }
    
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

    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4 text-gray-400" />
      </button>
    );

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
            i === currentPage
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          {i.toString().padStart(2, '0')}
        </button>
      );
    }

    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4 text-primary" />
      </button>
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
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-medium text-foreground">Find Job</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Home className="w-4 h-4" />
              <span>/</span>
              <span className="text-foreground">Find job</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <JobSearchFilters onSearch={handleSearch} loading={searchLoading} />
        </div>

        {!loading && !error && jobs.length > 0 && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-foreground">
                {pagination.total} job{pagination.total !== 1 ? 's' : ''} found
              </h2>
              {currentQuery.search && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  "{currentQuery.search}"
                </Badge>
              )}
              {currentQuery.location && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {currentQuery.location}
                </Badge>
              )}
            </div>
          </div>
        )}

        {loading && renderLoadingState()}

        {error && !loading && renderErrorState()}

        {!loading && !error && jobs.length === 0 && renderEmptyState()}

        {!loading && !error && jobs.length > 0 && (
          <>
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
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

            {renderPagination()}
          </>
        )}
      </div>

      <PublicFooter />
    </div>
  );
};

export default JobListing;
