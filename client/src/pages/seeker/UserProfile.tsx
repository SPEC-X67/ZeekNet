import UserLayout from "../../components/layouts/UserLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Edit,
  Download,
  Share,
  Award,
  Briefcase,
  GraduationCap,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Star,
  CheckCircle,
  Clock,
  Eye,
} from "lucide-react";

const UserProfile = () => {
  // Dummy data for the profile
  const userProfile = {
    personalInfo: {
      name: "Jake Wilson",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      email: "jake.wilson@email.com",
      phone: "+1 (555) 123-4567",
      bio: "Passionate frontend developer with 5+ years of experience building scalable web applications. I love creating intuitive user experiences and staying up-to-date with the latest technologies.",
      avatar: "/api/placeholder/150/150",
      joinDate: "January 2020",
      profileViews: 1247,
      lastActive: "2 hours ago"
    },
    skills: [
      { name: "React", level: "Expert", years: 5 },
      { name: "TypeScript", level: "Advanced", years: 4 },
      { name: "Node.js", level: "Advanced", years: 3 },
      { name: "Python", level: "Intermediate", years: 2 },
      { name: "AWS", level: "Intermediate", years: 2 },
      { name: "Docker", level: "Intermediate", years: 2 },
      { name: "GraphQL", level: "Advanced", years: 3 },
      { name: "MongoDB", level: "Advanced", years: 3 }
    ],
    experience: [
      {
        id: 1,
        company: "TechCorp Inc.",
        position: "Senior Frontend Developer",
        location: "San Francisco, CA",
        startDate: "March 2022",
        endDate: "Present",
        isCurrent: true,
        description: "Lead frontend development for multiple client projects, mentoring junior developers, and implementing best practices for code quality and performance.",
        achievements: [
          "Improved application performance by 40% through code optimization",
          "Led a team of 3 junior developers",
          "Implemented CI/CD pipeline reducing deployment time by 60%"
        ]
      },
      {
        id: 2,
        company: "StartupXYZ",
        position: "Frontend Developer",
        location: "Remote",
        startDate: "June 2020",
        endDate: "February 2022",
        isCurrent: false,
        description: "Developed responsive web applications using React and TypeScript, collaborated with design team to implement pixel-perfect UIs.",
        achievements: [
          "Built 15+ responsive web applications",
          "Reduced bundle size by 30% through code splitting",
          "Implemented automated testing increasing coverage to 85%"
        ]
      },
      {
        id: 3,
        company: "WebDev Agency",
        position: "Junior Frontend Developer",
        location: "New York, NY",
        startDate: "January 2020",
        endDate: "May 2020",
        isCurrent: false,
        description: "Created landing pages and marketing websites for various clients using HTML, CSS, and JavaScript.",
        achievements: [
          "Delivered 20+ client projects on time",
          "Learned React and modern JavaScript frameworks",
          "Improved client satisfaction scores by 25%"
        ]
      }
    ],
    education: [
      {
        id: 1,
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science in Computer Science",
        location: "Berkeley, CA",
        startDate: "2016",
        endDate: "2020",
        gpa: "3.8/4.0",
        relevantCoursework: [
          "Data Structures and Algorithms",
          "Software Engineering",
          "Database Systems",
          "Web Development",
          "Machine Learning"
        ]
      }
    ],
    certifications: [
      {
        id: 1,
        name: "AWS Certified Developer - Associate",
        issuer: "Amazon Web Services",
        issueDate: "March 2023",
        expiryDate: "March 2026",
        credentialId: "AWS-DEV-123456"
      },
      {
        id: 2,
        name: "React Developer Certification",
        issuer: "Meta",
        issueDate: "January 2023",
        expiryDate: "January 2025",
        credentialId: "META-REACT-789012"
      }
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/jakewilson",
      github: "https://github.com/jakewilson",
      twitter: "https://twitter.com/jakewilson",
      website: "https://jakewilson.dev"
    },
    availability: {
      status: "Open to opportunities",
      noticePeriod: "2 weeks",
      preferredLocation: "San Francisco, CA or Remote",
      salaryExpectation: "$120,000 - $150,000"
    }
  };

  const getSkillColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-green-500";
      case "Advanced": return "bg-blue-500";
      case "Intermediate": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <UserLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">My Public Profile</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="text-gray-600">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 max-w-4xl mx-auto">
          {/* Profile Header Card */}
          <Card className="bg-white border border-gray-200 mb-6">
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userProfile.personalInfo.avatar} alt={userProfile.personalInfo.name} />
                  <AvatarFallback className="text-2xl">
                    {userProfile.personalInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        {userProfile.personalInfo.name}
                      </h2>
                      <p className="text-lg text-gray-600 mb-2">
                        {userProfile.personalInfo.title}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{userProfile.personalInfo.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>{userProfile.personalInfo.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>{userProfile.personalInfo.phone}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        {userProfile.personalInfo.bio}
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center space-x-1 mb-1">
                        <Eye className="h-4 w-4" />
                        <span>{userProfile.personalInfo.profileViews} profile views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Last active {userProfile.personalInfo.lastActive}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex items-center space-x-4">
                    <a href={userProfile.socialLinks.linkedin} className="text-blue-600 hover:text-blue-700">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={userProfile.socialLinks.github} className="text-gray-600 hover:text-gray-700">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href={userProfile.socialLinks.twitter} className="text-blue-400 hover:text-blue-500">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href={userProfile.socialLinks.website} className="text-gray-600 hover:text-gray-700">
                      <Globe className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability Status */}
          <Card className="bg-white border border-gray-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-gray-900">{userProfile.availability.status}</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Available
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <span>Notice Period: {userProfile.availability.noticePeriod}</span>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <p>Preferred Location: {userProfile.availability.preferredLocation}</p>
                <p>Salary Expectation: {userProfile.availability.salaryExpectation}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Skills Section */}
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-purple-600" />
                    <span>Skills & Technologies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userProfile.skills.map((skill, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{skill.name}</span>
                          <Badge variant="secondary" className={`${getSkillColor(skill.level)} text-white`}>
                            {skill.level}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          {skill.years} years experience
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Experience Section */}
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-purple-600" />
                    <span>Work Experience</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {userProfile.experience.map((exp) => (
                      <div key={exp.id} className="relative">
                        <div className="flex items-start space-x-4">
                          <div className="w-3 h-3 bg-purple-600 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                                <p className="text-gray-600">{exp.company}</p>
                                <p className="text-sm text-gray-500">{exp.location}</p>
                              </div>
                              <div className="text-right text-sm text-gray-500">
                                <p>{exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}</p>
                                {exp.isCurrent && (
                                  <Badge variant="secondary" className="bg-green-100 text-green-800 mt-1">
                                    Current
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-700 mt-2">{exp.description}</p>
                            <div className="mt-3">
                              <h5 className="font-medium text-gray-900 mb-2">Key Achievements:</h5>
                              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                {exp.achievements.map((achievement, idx) => (
                                  <li key={idx}>{achievement}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        {exp.id < userProfile.experience.length && (
                          <div className="absolute left-2 top-8 w-px h-16 bg-gray-200"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education Section */}
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                    <span>Education</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userProfile.education.map((edu) => (
                    <div key={edu.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                          <p className="text-gray-600">{edu.institution}</p>
                          <p className="text-sm text-gray-500">{edu.location}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <p>{edu.startDate} - {edu.endDate}</p>
                          <p>GPA: {edu.gpa}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <h5 className="font-medium text-gray-900 mb-2">Relevant Coursework:</h5>
                        <div className="flex flex-wrap gap-2">
                          {edu.relevantCoursework.map((course, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Certifications */}
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    <span>Certifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userProfile.certifications.map((cert) => (
                      <div key={cert.id} className="p-3 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-900 text-sm">{cert.name}</h4>
                        <p className="text-xs text-gray-600">{cert.issuer}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Issued: {cert.issueDate}
                        </p>
                        {cert.expiryDate && (
                          <p className="text-xs text-gray-500">
                            Expires: {cert.expiryDate}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          ID: {cert.credentialId}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Profile Stats */}
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle>Profile Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Profile Views</span>
                      <span className="font-medium">{userProfile.personalInfo.profileViews}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Member Since</span>
                      <span className="font-medium">{userProfile.personalInfo.joinDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Active</span>
                      <span className="font-medium">{userProfile.personalInfo.lastActive}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Skills Listed</span>
                      <span className="font-medium">{userProfile.skills.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Experience</span>
                      <span className="font-medium">{userProfile.experience.length} positions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Certifications</span>
                      <span className="font-medium">{userProfile.certifications.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserProfile;

