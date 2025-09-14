"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { LoginScreen } from "@/components/screens/login-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { InterviewScreen } from "@/components/screens/interview-screen"
import { RecommendationsScreen } from "@/components/screens/recommendations-screen"
import { ReadinessScreen } from "@/components/screens/readiness-screen"
import { ChatbotScreen } from "@/components/screens/chatbot-screen"

export default function SmartInternApp() {
  const [currentScreen, setCurrentScreen] = useState("login")

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return <LoginScreen onNext={() => setCurrentScreen("profile")} />
      case "profile":
        return <ProfileScreen onNext={() => setCurrentScreen("interview")} />
      case "interview":
        return <InterviewScreen onNext={() => setCurrentScreen("recommendations")} />
      case "recommendations":
        return <RecommendationsScreen onNext={() => setCurrentScreen("readiness")} />
      case "readiness":
        return <ReadinessScreen onNext={() => setCurrentScreen("chatbot")} />
      case "chatbot":
        return <ChatbotScreen />
      default:
        return <LoginScreen onNext={() => setCurrentScreen("profile")} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} />

      <main className="md:ml-64">
        <div className="container mx-auto px-4 py-6 max-w-4xl">{renderScreen()}</div>
      </main>
    </div>
  )
}
