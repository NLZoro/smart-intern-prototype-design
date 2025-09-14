"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  MapPin,
  Clock,
  Building,
  Star,
  ExternalLink,
  TrendingUp,
  Users,
  Calendar,
  Briefcase,
} from "lucide-react"

interface RecommendationsScreenProps {
  onNext: () => void
}

interface Internship {
  id: string
  title: string
  company: string
  location: string
  duration: string
  matchPercentage: number
  description: string
  requirements: string[]
  benefits: string[]
  applicationDeadline: string
  applicants: number
  type: "remote" | "hybrid" | "onsite"
  salaryRange?: string
}

export function RecommendationsScreen({ onNext }: RecommendationsScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [appliedJobs, setAppliedJobs] = useState<string[]>([])

  const internships: Internship[] = [
    {
      id: "1",
      title: "Product Management Intern",
      company: "TechCorp Solutions",
      location: "Mumbai, India",
      duration: "3 months",
      matchPercentage: 92,
      description:
        "Join our product team to work on cutting-edge fintech solutions. You'll collaborate with cross-functional teams to define product roadmaps and analyze user feedback.",
      requirements: ["Business/Engineering background", "Analytical thinking", "Communication skills"],
      benefits: ["Mentorship program", "Real project ownership", "Certificate of completion"],
      applicationDeadline: "2024-02-15",
      applicants: 45,
      type: "hybrid",
      salaryRange: "₹25,000 - ₹35,000/month",
    },
    {
      id: "2",
      title: "Associate Product Manager Intern",
      company: "StartupHub",
      location: "Bangalore, India",
      duration: "6 months",
      matchPercentage: 88,
      description:
        "Work directly with our founding team on product strategy for our B2B SaaS platform. Perfect opportunity to learn product management from the ground up.",
      requirements: ["Problem-solving skills", "Data analysis", "User empathy"],
      benefits: ["Equity participation", "Flexible hours", "Learning stipend"],
      applicationDeadline: "2024-02-20",
      applicants: 32,
      type: "onsite",
      salaryRange: "₹30,000 - ₹40,000/month",
    },
    {
      id: "3",
      title: "Digital Product Intern",
      company: "E-commerce Giants",
      location: "Remote",
      duration: "4 months",
      matchPercentage: 85,
      description:
        "Support our digital product initiatives across mobile and web platforms. Gain experience in A/B testing, user research, and product analytics.",
      requirements: ["Digital marketing knowledge", "Basic SQL", "Project management"],
      benefits: ["Remote work", "Industry exposure", "Performance bonus"],
      applicationDeadline: "2024-02-25",
      applicants: 67,
      type: "remote",
      salaryRange: "₹20,000 - ₹30,000/month",
    },
    {
      id: "4",
      title: "Product Strategy Intern",
      company: "Innovation Labs",
      location: "Delhi, India",
      duration: "3 months",
      matchPercentage: 82,
      description:
        "Research market trends and competitive landscape to inform product strategy decisions. Work with senior PMs on go-to-market strategies.",
      requirements: ["Research skills", "Market analysis", "Presentation skills"],
      benefits: ["Networking opportunities", "Strategy exposure", "Recommendation letter"],
      applicationDeadline: "2024-03-01",
      applicants: 28,
      type: "hybrid",
      salaryRange: "₹22,000 - ₹32,000/month",
    },
    {
      id: "5",
      title: "Junior Product Analyst Intern",
      company: "DataDriven Co",
      location: "Pune, India",
      duration: "5 months",
      matchPercentage: 79,
      description:
        "Analyze user behavior data and create insights to drive product decisions. Learn advanced analytics tools and methodologies.",
      requirements: ["Statistics background", "Excel/SQL proficiency", "Curiosity for data"],
      benefits: ["Tool training", "Data certification", "Full-time opportunity"],
      applicationDeadline: "2024-03-05",
      applicants: 41,
      type: "onsite",
      salaryRange: "₹18,000 - ₹28,000/month",
    },
  ]

  const handleApply = (internshipId: string) => {
    setAppliedJobs([...appliedJobs, internshipId])
  }

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-50"
    if (percentage >= 80) return "text-blue-600 bg-blue-50"
    if (percentage >= 70) return "text-yellow-600 bg-yellow-50"
    return "text-gray-600 bg-gray-50"
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "remote":
        return "🏠"
      case "hybrid":
        return "🏢"
      case "onsite":
        return "🏛️"
      default:
        return "📍"
    }
  }

  const filteredInternships =
    selectedFilter === "all" ? internships : internships.filter((internship) => internship.type === selectedFilter)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle>Your Personalized Recommendations</CardTitle>
                <CardDescription>
                  Based on your profile and interview responses, here are the best PM internship matches
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              {internships.length} matches found
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <Tabs value={selectedFilter} onValueChange={setSelectedFilter}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({internships.length})</TabsTrigger>
              <TabsTrigger value="remote">Remote ({internships.filter((i) => i.type === "remote").length})</TabsTrigger>
              <TabsTrigger value="hybrid">Hybrid ({internships.filter((i) => i.type === "hybrid").length})</TabsTrigger>
              <TabsTrigger value="onsite">
                On-site ({internships.filter((i) => i.type === "onsite").length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Recommendations Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredInternships.map((internship) => (
          <Card key={internship.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight">{internship.title}</CardTitle>
                  <div className="flex items-center gap-1 mt-1">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">{internship.company}</span>
                  </div>
                </div>
                <Badge className={`${getMatchColor(internship.matchPercentage)} border-0 font-semibold`}>
                  {internship.matchPercentage}% Match
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
              {/* Location and Duration */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{internship.location}</span>
                  <span className="ml-1">{getTypeIcon(internship.type)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{internship.duration}</span>
                </div>
              </div>

              {/* Salary Range */}
              {internship.salaryRange && (
                <div className="flex items-center gap-1 text-sm font-medium text-primary">
                  <Briefcase className="h-4 w-4" />
                  <span>{internship.salaryRange}</span>
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{internship.description}</p>

              {/* Requirements */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Requirements:</h4>
                <div className="flex flex-wrap gap-1">
                  {internship.requirements.slice(0, 3).map((req, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Application Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{internship.applicants} applicants</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Deadline: {new Date(internship.applicationDeadline).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Apply Button */}
              <div className="pt-2">
                {appliedJobs.includes(internship.id) ? (
                  <Button disabled className="w-full bg-transparent" variant="outline">
                    Applied ✓
                  </Button>
                ) : (
                  <Button onClick={() => handleApply(internship.id)} className="w-full gap-2">
                    Apply Now
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{internships.length}</div>
              <div className="text-sm text-muted-foreground">Total Matches</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {Math.round(internships.reduce((acc, i) => acc + i.matchPercentage, 0) / internships.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Match</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{appliedJobs.length}</div>
              <div className="text-sm text-muted-foreground">Applied</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {internships.filter((i) => i.matchPercentage >= 85).length}
              </div>
              <div className="text-sm text-muted-foreground">High Matches</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Step */}
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Ready to see your readiness score?</h3>
          <p className="text-muted-foreground mb-4">
            Get insights into your PM readiness level and discover areas for improvement
          </p>
          <Button onClick={onNext} size="lg" className="gap-2">
            View My Readiness Badge
            <Star className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
