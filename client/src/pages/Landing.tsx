import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PublicHeader from "@/components/layouts/PublicHeader";
import PublicFooter from "@/components/layouts/PublicFooter";
import {
  Search,
  MapPin,
  Users,
  Briefcase,
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Globe,
  Award,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <section className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-5"></div>
        <div className="absolute top-10 right-10 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
          <div className="text-primary text-2xl">✦</div>
        </div>
        <div className="absolute bottom-20 left-10 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
          <div className="text-primary text-xl">✦</div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Get The Most{" "}
              <span className="text-primary bg-primary/10 px-2 rounded">
                Reliable Job
              </span>{" "}
              in your city
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Find your dream job from thousands of opportunities. Connect with
              top companies and build your career with confidence.
            </p>

            <div className="bg-card rounded-lg p-6 shadow-2xl shadow-primary/10 max-w-3xl mx-auto border border-border hover:shadow-3xl hover:shadow-primary/15 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Job title, keywords, or company"
                    className="pl-10 h-12 border-border"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="City, state, or remote"
                    className="pl-10 h-12 border-border"
                  />
                </div>
                <Button 
                  className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  asChild
                >
                  <a href="/jobs">Find Jobs</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-background border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 md:space-x-12 opacity-60">
            <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity duration-300">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="3"
                  fill="#18BFFF"
                />
                <rect x="6" y="6" width="12" height="2" fill="white" />
                <rect x="6" y="10" width="8" height="2" fill="white" />
                <rect x="6" y="14" width="10" height="2" fill="white" />
              </svg>
              <span className="text-lg font-semibold text-muted-foreground">
                AirTable
              </span>
            </div>
            <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity duration-300">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#4285F4" />
                <path
                  d="M16.5 10.5l-3.5 3.5-1.5-1.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-lg font-semibold text-muted-foreground">
                Search
              </span>
            </div>
            <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity duration-300">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#EA4C89" />
                <circle cx="12" cy="12" r="3" fill="white" />
              </svg>
              <span className="text-lg font-semibold text-muted-foreground">
                Dribbble
              </span>
            </div>
            <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity duration-300">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="4"
                  fill="#4A154B"
                />
                <path d="M8 8h8v2H8V8zm0 4h6v2H8v-2z" fill="white" />
              </svg>
              <span className="text-lg font-semibold text-muted-foreground">
                Slack
              </span>
            </div>
            <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity duration-300">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="3"
                  fill="#00D924"
                />
                <circle cx="8" cy="8" r="2" fill="white" />
                <circle cx="16" cy="8" r="2" fill="white" />
                <path
                  d="M8 14h8"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-lg font-semibold text-muted-foreground">
                LiveChat
              </span>
            </div>
            <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity duration-300">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="3"
                  fill="#FC6D26"
                />
                <path d="M12 6l-2 6h4l-2-6z" fill="white" />
                <path d="M8 12l-2 6h4l-2-6z" fill="white" />
                <path d="M16 12l-2 6h4l-2-6z" fill="white" />
              </svg>
              <span className="text-lg font-semibold text-muted-foreground">
                GitLab
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How expert jobs work
            </h2>
            <div className="absolute right-20 mt-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
              <div className="text-primary">✦</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Create Account",
                desc: "Sign up and create your professional profile",
              },
              {
                icon: Search,
                title: "Search Jobs",
                desc: "Browse thousands of job opportunities",
              },
              {
                icon: Briefcase,
                title: "Apply Jobs",
                desc: "Apply to jobs that match your skills",
              },
              {
                icon: CheckCircle,
                title: "Get Hired",
                desc: "Connect with employers and get hired",
              },
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300 group-hover:scale-105">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-pretty">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Featured Jobs
            </h2>
            <p className="text-muted-foreground">
              Discover the best job opportunities from top companies
            </p>
            <div className="absolute right-10 top-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
              <div className="text-primary text-xl">+</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                company: "Dribbble",
                role: "Full-stack developer",
                location: "Remote",
                type: "Full-time",
                logo: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                    <circle cx="12" cy="12" r="10" fill="#EA4C89" />
                    <circle cx="12" cy="12" r="3" fill="white" />
                  </svg>
                ),
                color: "bg-pink-500",
              },
              {
                company: "LinkedIn",
                role: "UI/UX designer (Senior)",
                location: "New York",
                type: "Full-time",
                logo: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="3"
                      fill="#0077B5"
                    />
                    <rect x="6" y="6" width="3" height="12" fill="white" />
                    <rect x="11" y="9" width="3" height="9" fill="white" />
                    <circle cx="7.5" cy="7.5" r="1.5" fill="white" />
                  </svg>
                ),
                color: "bg-blue-600",
              },
              {
                company: "Upwork",
                role: "Senior front-end designer",
                location: "Remote",
                type: "Contract",
                logo: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                    <circle cx="12" cy="12" r="10" fill="#14A800" />
                    <path
                      d="M8 10c0-2 2-4 4-4s4 2 4 4-2 4-4 4-4-2-4-4z"
                      fill="white"
                    />
                  </svg>
                ),
                color: "bg-green-500",
              },
              {
                company: "Figma",
                role: "Senior designer",
                location: "San Francisco",
                type: "Full-time",
                logo: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                    <rect
                      x="6"
                      y="2"
                      width="6"
                      height="6"
                      rx="3"
                      fill="#F24E1E"
                    />
                    <rect
                      x="12"
                      y="2"
                      width="6"
                      height="6"
                      rx="3"
                      fill="#A259FF"
                    />
                    <rect
                      x="6"
                      y="8"
                      width="6"
                      height="6"
                      rx="3"
                      fill="#1ABCFE"
                    />
                    <rect
                      x="12"
                      y="8"
                      width="6"
                      height="6"
                      rx="3"
                      fill="#0ACF83"
                    />
                    <circle cx="15" cy="17" r="3" fill="#FF7262" />
                  </svg>
                ),
                color: "bg-purple-500",
              },
              {
                company: "Microsoft",
                role: "UI/UX designer (Senior) mobile",
                location: "Seattle",
                type: "Full-time",
                logo: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                    <rect x="3" y="3" width="8" height="8" fill="#F25022" />
                    <rect x="13" y="3" width="8" height="8" fill="#7FBA00" />
                    <rect x="3" y="13" width="8" height="8" fill="#00A4EF" />
                    <rect x="13" y="13" width="8" height="8" fill="#FFB900" />
                  </svg>
                ),
                color: "bg-blue-500",
              },
              {
                company: "Webflow",
                role: "Senior Mobile Expert",
                location: "Remote",
                type: "Full-time",
                logo: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="4"
                      fill="#4353FF"
                    />
                    <path d="M7 8l5 8 5-8H7z" fill="white" />
                  </svg>
                ),
                color: "bg-indigo-500",
              },
            ].map((job, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 bg-card border border-border group hover:scale-[1.02]"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg shadow-gray-200/50 group-hover:shadow-xl group-hover:shadow-gray-200/70 transition-all duration-300">
                      {job.logo}
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-primary text-primary-foreground shadow-sm"
                    >
                      {job.type}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {job.role}
                  </h3>
                  <p className="text-primary font-medium mb-2">{job.company}</p>
                  <p className="text-muted-foreground text-sm mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </p>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Search desired job by categories
            </h2>
            <p className="text-muted-foreground">
              Find opportunities in your field of expertise
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Accounting",
              "Creative",
              "Development",
              "Marketing",
              "Legal",
              "Commercial",
              "Business",
              "Finance",
            ].map((category) => (
              <Button
                key={category}
                variant="outline"
                className="rounded-full bg-transparent hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What our clients say
            </h2>
            <Button
              variant="outline"
              className="mt-4 bg-primary text-primary-foreground border-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                rating: 5,
                text: "Amazing platform! Found my dream job within a week. The interface is user-friendly and the job recommendations are spot on.",
                author: "Sarah Johnson",
                role: "Software Engineer",
              },
              {
                rating: 5,
                text: "As an employer, this platform has been incredible for finding top talent. The quality of candidates is exceptional.",
                author: "Mike Chen",
                role: "HR Director",
              },
              {
                rating: 5,
                text: "The best job portal I've used. Great filtering options and excellent customer support throughout the process.",
                author: "Emily Davis",
                role: "Marketing Manager",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group hover:scale-[1.02]"
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 text-pretty">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 shadow-sm group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                We Have the largest job Network all over the world
              </h2>
              <p className="text-muted-foreground mb-8 text-pretty">
                Connect with millions of job seekers and thousands of companies
                worldwide. Our platform has helped countless professionals find
                their perfect career match.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-3" />
                  <span className="text-foreground">
                    Over 2 million active job seekers
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-3" />
                  <span className="text-foreground">
                    50,000+ companies trust our platform
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-3" />
                  <span className="text-foreground">
                    Available in 150+ countries worldwide
                  </span>
                </div>
              </div>
              <Button className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                Learn More
              </Button>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group hover:scale-105">
                  <div className="text-3xl font-bold text-primary mb-2">
                    +102
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Job Categories
                  </div>
                </Card>
                <Card className="text-center p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group hover:scale-105">
                  <div className="text-3xl font-bold text-primary mb-2">
                    2M+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Active Users
                  </div>
                </Card>
                <Card className="text-center p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group hover:scale-105">
                  <div className="text-3xl font-bold text-primary mb-2">
                    50K+
                  </div>
                  <div className="text-sm text-muted-foreground">Companies</div>
                </Card>
                <Card className="text-center p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group hover:scale-105">
                  <div className="text-3xl font-bold text-primary mb-2">
                    98%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Success Rate
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group hover:scale-[1.02]">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-4">
                Recruiting?
              </h3>
              <p className="text-muted-foreground mb-6 text-pretty">
                Find the best talent for your company with our advanced
                recruiting tools.
              </p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                Start Recruiting
              </Button>
            </Card>
            <Card className="text-center p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group hover:scale-[1.02]">
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-4">
                Looking for Job?
              </h3>
              <p className="text-muted-foreground mb-6 text-pretty">
                Discover thousands of job opportunities that match your skills
                and experience.
              </p>
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                asChild
              >
                <a href="/jobs">Find Jobs</a>
              </Button>
            </Card>
            <Card className="text-center p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group hover:scale-[1.02]">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-4">
                King Expert
              </h3>
              <p className="text-muted-foreground mb-6 text-pretty">
                Join our expert network and showcase your skills to top
                companies worldwide.
              </p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                Become Expert
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recent Articles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "/person-typing.png",
                title: "10 Tips to Improve Your Resume and Land Your Dream Job",
                excerpt:
                  "Learn the essential strategies to make your resume stand out from the competition.",
                date: "Dec 15, 2024",
              },
              {
                image: "/business-meeting-office.png",
                title: "How to Ace Your Next Job Interview: A Complete Guide",
                excerpt:
                  "Master the art of interviewing with these proven techniques and strategies.",
                date: "Dec 12, 2024",
              },
              {
                image: "/remote-work-setup.png",
                title: "The Future of Remote Work: Trends and Opportunities",
                excerpt:
                  "Explore the evolving landscape of remote work and how to thrive in it.",
                date: "Dec 10, 2024",
              },
            ].map((article, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group hover:scale-[1.02]"
              >
                <div className="aspect-video bg-muted"></div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2 text-balance">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 text-pretty">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {article.date}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
                    >
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="px-8 bg-transparent hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              View More
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default Landing;
