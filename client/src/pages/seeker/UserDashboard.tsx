import UserLayout from "../../components/layouts/UserLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Calendar,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const recentApplications = [
    {
      id: 1,
      jobTitle: "Social Media Assistant",
      company: "Nomad",
      location: "Paris, France",
      status: "In Review",
      appliedDate: "24 July 2021",
      companyLogo: "N",
      logoColor: "bg-green-500",
    },
    {
      id: 2,
      jobTitle: "Social Media Assistant",
      company: "Udacity",
      location: "New York, USA",
      status: "Shortlisted",
      appliedDate: "23 July 2021",
      companyLogo: "U",
      logoColor: "bg-blue-500",
    },
    {
      id: 3,
      jobTitle: "Social Media Assistant",
      company: "Packer",
      location: "Madrid, Spain",
      status: "Declined",
      appliedDate: "22 July 2021",
      companyLogo: "P",
      logoColor: "bg-red-500",
    },
  ];

  const upcomingInterviews = [
    {
      id: 1,
      time: "10:00 AM",
      interviewer: "Joe Bartmann",
      position: "HR Manager at Divvy",
      isHighlighted: false,
    },
    {
      id: 2,
      time: "10:30 AM",
      interviewer: "Joe Bartmann",
      position: "HR Manager at Divvy",
      isHighlighted: true,
    },
    {
      id: 3,
      time: "11:00 AM",
      interviewer: "Joe Bartmann",
      position: "HR Manager at Divvy",
      isHighlighted: false,
    },
  ];

  const navigate = useNavigate();

  return (
    <UserLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="text-gray-600" onClick={() => navigate('/')}>
                Back to homepage
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
              </Button>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Jul 19 - Jul 25</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Welcome Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Good morning, Jake
            </h2>
            <p className="text-gray-600">
              Here is what's happening with your job search applications from
              July 19 - July 25.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Jobs Applied */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Total Jobs Applied
                    </p>
                    <p className="text-3xl font-bold text-gray-900">45</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interviewed */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Interviewed
                    </p>
                    <p className="text-3xl font-bold text-gray-900">18</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Jobs Applied Status Chart */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-600">
                    Jobs Applied Status
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 text-sm"
                  >
                    View All Applications →
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative w-24 h-24">
                    {/* Donut Chart */}
                    <div className="absolute inset-0 rounded-full border-8 border-purple-200"></div>
                    <div
                      className="absolute inset-0 rounded-full border-8 border-blue-400"
                      style={{
                        clipPath:
                          "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-700">
                        40%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-200 rounded-full"></div>
                      <span className="text-gray-600">60% Unsuitable</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-600">40% Interviewed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Interviews */}
          <Card className="bg-white border border-gray-200 mb-8">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Upcoming Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    Today, 26 November
                  </span>
                  <Button variant="ghost" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {upcomingInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className={`p-4 rounded-lg border ${
                      interview.isHighlighted
                        ? "bg-purple-50 border-purple-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium text-gray-900 min-w-[80px]">
                        {interview.time}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {interview.interviewer}
                            </p>
                            <p className="text-sm text-gray-600">
                              {interview.position}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Applications History */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Recent Applications History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div
                    key={application.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 ${application.logoColor} rounded-lg flex items-center justify-center text-white font-semibold`}
                      >
                        {application.companyLogo}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {application.jobTitle}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {application.company} • {application.location} •
                          Full-Time
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {application.appliedDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant="secondary"
                        className={`${
                          application.status === "In Review"
                            ? "bg-yellow-100 text-yellow-800"
                            : application.status === "Shortlisted"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {application.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <Button variant="ghost" className="text-blue-600">
                  View all applications history →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
