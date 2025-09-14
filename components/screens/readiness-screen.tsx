"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Award,
  TrendingUp,
  Target,
  BookOpen,
  Users,
  BarChart3,
  MessageSquare,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  Trophy,
  Zap,
} from "lucide-react"

interface ReadinessScreenProps {
  onNext: () => void
}

interface SkillArea {
  id: string
  name: string
  score: number
  maxScore: number
  description: string
  gaps: string[]
  recommendations: string[]
  icon: React.ComponentType<{ className?: string }>
}

interface Achievement {
  id: string
  title: string
  description: string
  completed: boolean
  points: number
}

export function ReadinessScreen({ onNext }: ReadinessScreenProps) {
  const [completedGaps, setCompletedGaps] = useState<string[]>([])

  // Calculate overall readiness score
  const skillAreas: SkillArea[] = [
    {
      id: "product-thinking",
      name: "Product Thinking",
      score: 78,
      maxScore: 100,
      description: "Understanding user needs, market analysis, and product strategy",
      gaps: [
        "Learn about user persona development",
        "Practice competitive analysis frameworks",
        "Study product-market fit concepts",
      ],
      recommendations: [
        "Read 'Inspired' by Marty Cagan",
        "Complete Google UX Design course",
        "Analyze 3 successful product launches",
      ],
      icon: Lightbulb,
    },
    {
      id: "analytical-skills",
      name: "Analytical Skills",
      score: 85,
      maxScore: 100,
      description: "Data analysis, metrics interpretation, and decision-making",
      gaps: ["Advanced SQL query writing", "A/B testing methodology", "Statistical significance understanding"],
      recommendations: ["Complete SQL fundamentals course", "Practice with real datasets", "Learn Google Analytics"],
      icon: BarChart3,
    },
    {
      id: "communication",
      name: "Communication",
      score: 72,
      maxScore: 100,
      description: "Stakeholder management, presentation skills, and documentation",
      gaps: ["Technical writing skills", "Stakeholder presentation techniques", "Cross-functional collaboration"],
      recommendations: [
        "Join Toastmasters or similar group",
        "Practice product requirement documents",
        "Lead a team project",
      ],
      icon: MessageSquare,
    },
    {
      id: "business-acumen",
      name: "Business Acumen",
      score: 68,
      maxScore: 100,
      description: "Market understanding, business models, and strategic thinking",
      gaps: ["Business model canvas understanding", "Revenue model analysis", "Market sizing techniques"],
      recommendations: [
        "Study successful startup case studies",
        "Learn about different business models",
        "Practice market sizing exercises",
      ],
      icon: TrendingUp,
    },
    {
      id: "leadership",
      name: "Leadership",
      score: 75,
      maxScore: 100,
      description: "Team collaboration, influence without authority, and project management",
      gaps: ["Conflict resolution skills", "Agile methodology knowledge", "Team motivation techniques"],
      recommendations: [
        "Get Scrum Master certification",
        "Lead a volunteer project",
        "Practice giving constructive feedback",
      ],
      icon: Users,
    },
  ]

  const achievements: Achievement[] = [
    {
      id: "profile-complete",
      title: "Profile Master",
      description: "Completed comprehensive profile setup",
      completed: true,
      points: 100,
    },
    {
      id: "interview-ace",
      title: "Interview Ace",
      description: "Successfully completed AI interview assessment",
      completed: true,
      points: 150,
    },
    {
      id: "first-application",
      title: "First Step",
      description: "Applied to your first internship",
      completed: false,
      points: 75,
    },
    {
      id: "skill-improver",
      title: "Skill Improver",
      description: "Completed 5 skill gap recommendations",
      completed: false,
      points: 200,
    },
  ]

  const overallScore = Math.round(skillAreas.reduce((acc, skill) => acc + skill.score, 0) / skillAreas.length)

  const getReadinessLevel = (score: number) => {
    if (score >= 85) return { level: "Ready", color: "text-green-600 bg-green-50", icon: Trophy }
    if (score >= 70) return { level: "Intermediate", color: "text-blue-600 bg-blue-50", icon: Star }
    return { level: "Beginner", color: "text-yellow-600 bg-yellow-50", icon: Target }
  }

  const readiness = getReadinessLevel(overallScore)
  const ReadinessIcon = readiness.icon

  const handleGapToggle = (gapId: string) => {
    setCompletedGaps((prev) => (prev.includes(gapId) ? prev.filter((id) => id !== gapId) : [...prev, gapId]))
  }

  const totalGaps = skillAreas.reduce((acc, skill) => acc + skill.gaps.length, 0)
  const completedGapsCount = completedGaps.length
  const gapProgress = (completedGapsCount / totalGaps) * 100

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Readiness Badge Header */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                <ReadinessIcon className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl">Your PM Readiness Badge</CardTitle>
                <CardDescription className="text-base">
                  Based on your profile, interview, and skill assessment
                </CardDescription>
              </div>
            </div>
            <div className="text-center">
              <Badge className={`${readiness.color} border-0 text-lg px-4 py-2 font-bold`}>{readiness.level}</Badge>
              <div className="text-3xl font-bold text-primary mt-2">{overallScore}/100</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{overallScore}%</div>
            <div className="text-sm text-muted-foreground">Overall Readiness</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-secondary">
              {completedGapsCount}/{totalGaps}
            </div>
            <div className="text-sm text-muted-foreground">Gaps Addressed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent">
              {achievements.filter((a) => a.completed).length}/{achievements.length}
            </div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Tabs defaultValue="skills" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="skills">Skill Breakdown</TabsTrigger>
          <TabsTrigger value="gaps">Skill Gaps</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {skillAreas.map((skill) => {
              const SkillIcon = skill.icon
              const percentage = (skill.score / skill.maxScore) * 100

              return (
                <Card key={skill.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <SkillIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{skill.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={percentage} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{skill.score}%</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Skill Gap Insights</CardTitle>
                  <CardDescription>Address these areas to improve your PM readiness</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Progress</div>
                  <div className="text-lg font-semibold">{Math.round(gapProgress)}%</div>
                </div>
              </div>
              <Progress value={gapProgress} className="h-2" />
            </CardHeader>
          </Card>

          <div className="space-y-4">
            {skillAreas.map((skill) => {
              const SkillIcon = skill.icon

              return (
                <Card key={skill.id}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <SkillIcon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{skill.name}</CardTitle>
                      <Badge variant="outline">{skill.score}%</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        Areas to Improve
                      </h4>
                      <div className="space-y-2">
                        {skill.gaps.map((gap, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Checkbox
                              id={`${skill.id}-gap-${index}`}
                              checked={completedGaps.includes(`${skill.id}-gap-${index}`)}
                              onCheckedChange={() => handleGapToggle(`${skill.id}-gap-${index}`)}
                            />
                            <label
                              htmlFor={`${skill.id}-gap-${index}`}
                              className={`text-sm cursor-pointer ${
                                completedGaps.includes(`${skill.id}-gap-${index}`)
                                  ? "line-through text-muted-foreground"
                                  : ""
                              }`}
                            >
                              {gap}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                        Recommended Actions
                      </h4>
                      <ul className="space-y-1">
                        {skill.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={achievement.completed ? "border-green-200 bg-green-50/50" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        achievement.completed ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      {achievement.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={achievement.completed ? "default" : "secondary"}>
                          {achievement.points} points
                        </Badge>
                        {achievement.completed && (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Next Steps */}
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Ready to explore more features?</h3>
          <p className="text-muted-foreground mb-4">Try our WhatsApp bot for quick internship searches and updates</p>
          <Button onClick={onNext} size="lg" className="gap-2">
            Try WhatsApp Bot
            <MessageSquare className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
