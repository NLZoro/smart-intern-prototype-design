"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, MapPin, BookOpen, Briefcase, Upload, Plus, X, CheckCircle } from "lucide-react"

interface ProfileScreenProps {
  onNext: () => void
}

export function ProfileScreen({ onNext }: ProfileScreenProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  const [newInterest, setNewInterest] = useState("")
  const [resumeUploaded, setResumeUploaded] = useState(false)

  const [formData, setFormData] = useState({
    education: "",
    experience: "",
    location: "",
    bio: "",
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()])
      setNewInterest("")
    }
  }

  const removeInterest = (interestToRemove: string) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove))
  }

  const handleFileUpload = () => {
    // Simulate file upload
    setResumeUploaded(true)
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      onNext()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="education" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Education Level
              </Label>
              <Input
                id="education"
                placeholder="e.g., Bachelor's in Business Administration"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Previous Experience
              </Label>
              <Textarea
                id="experience"
                placeholder="Describe any relevant work experience, projects, or leadership roles..."
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="min-h-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Preferred Location
              </Label>
              <Input
                id="location"
                placeholder="e.g., Mumbai, Delhi, Remote"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="h-12"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">Skills</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill (e.g., Project Management)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  className="h-10"
                />
                <Button type="button" onClick={addSkill} size="sm" className="px-3">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Interests</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add an interest (e.g., Product Strategy)"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addInterest()}
                  className="h-10"
                />
                <Button type="button" onClick={addInterest} size="sm" className="px-3">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge key={interest} variant="outline" className="gap-1">
                    {interest}
                    <button onClick={() => removeInterest(interest)} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bio">Personal Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself, your career goals, and what you're looking for in an internship..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="min-h-32"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Resume Upload</Label>
              <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  {resumeUploaded ? (
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Resume uploaded successfully!</span>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleFileUpload}
                          className="mb-2 bg-transparent"
                        >
                          Choose File
                        </Button>
                        <p className="text-sm text-muted-foreground">Upload your resume (PDF, DOC, DOCX)</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const stepTitles = ["Basic Information", "Skills & Interests", "Bio & Resume"]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Setup
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <CardDescription className="mt-2">{stepTitles[currentStep - 1]}</CardDescription>
        </CardHeader>
      </Card>

      {/* Form Content */}
      <Card>
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        {currentStep > 1 && (
          <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
            Back
          </Button>
        )}
        <Button onClick={handleNext} className="flex-1">
          {currentStep === totalSteps ? "Complete Profile" : "Next Step"}
        </Button>
      </div>
    </div>
  )
}
