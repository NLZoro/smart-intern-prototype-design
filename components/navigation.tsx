"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, MessageSquare, Target, Award, MessageCircle, ArrowLeft, Menu, X } from "lucide-react"

interface NavigationProps {
  currentScreen: string
  onScreenChange: (screen: string) => void
}

export function Navigation({ currentScreen, onScreenChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const screens = [
    { id: "login", label: "Login", icon: User },
    { id: "profile", label: "Profile", icon: User },
    { id: "interview", label: "Interview", icon: MessageSquare },
    { id: "recommendations", label: "Jobs", icon: Target },
    { id: "readiness", label: "Badge", icon: Award },
    { id: "chatbot", label: "Chat", icon: MessageCircle },
  ]

  const currentScreenData = screens.find((s) => s.id === currentScreen)

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {currentScreen !== "login" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const currentIndex = screens.findIndex((s) => s.id === currentScreen)
                if (currentIndex > 0) {
                  onScreenChange(screens[currentIndex - 1].id)
                }
              }}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            {currentScreenData?.icon && <currentScreenData.icon className="h-5 w-5" />}
            <h1 className="font-semibold text-lg">{currentScreenData?.label || "SmartIntern"}</h1>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setIsMenuOpen(false)}>
          <Card className="absolute top-16 right-4 left-4 p-4">
            <div className="grid gap-2">
              {screens.map((screen) => {
                const Icon = screen.icon
                return (
                  <Button
                    key={screen.id}
                    variant={currentScreen === screen.id ? "default" : "ghost"}
                    className="justify-start gap-3"
                    onClick={() => {
                      onScreenChange(screen.id)
                      setIsMenuOpen(false)
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {screen.label}
                  </Button>
                )
              })}
            </div>
          </Card>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-card border-r">
        <div className="flex items-center gap-2 p-6 border-b">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Target className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="font-bold text-xl text-card-foreground">SmartIntern</h1>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {screens.map((screen) => {
              const Icon = screen.icon
              return (
                <Button
                  key={screen.id}
                  variant={currentScreen === screen.id ? "default" : "ghost"}
                  className="w-full justify-start gap-3"
                  onClick={() => onScreenChange(screen.id)}
                >
                  <Icon className="h-4 w-4" />
                  {screen.label}
                </Button>
              )
            })}
          </div>
        </nav>
      </div>
    </>
  )
}
