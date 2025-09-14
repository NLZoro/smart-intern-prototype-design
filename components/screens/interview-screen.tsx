"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, Mic, MicOff, Send, Bot, User, Clock, CheckCircle } from "lucide-react"

interface InterviewScreenProps {
  onNext: () => void
}

interface Message {
  id: string
  type: "ai" | "user"
  content: string
  timestamp: Date
}

interface Question {
  id: string
  question: string
  category: string
  followUp?: string
}

export function InterviewScreen({ onNext }: InterviewScreenProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isInterviewComplete, setIsInterviewComplete] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const questions: Question[] = [
    {
      id: "1",
      question: "Tell me about yourself and why you're interested in product management.",
      category: "Background",
      followUp: "What specific aspects of product management excite you the most?",
    },
    {
      id: "2",
      question: "Describe a time when you had to work with a team to solve a complex problem. What was your role?",
      category: "Teamwork",
      followUp: "How did you handle any conflicts or disagreements within the team?",
    },
    {
      id: "3",
      question:
        "If you were tasked with improving a popular mobile app, how would you approach identifying areas for improvement?",
      category: "Product Thinking",
      followUp: "How would you prioritize these improvements?",
    },
    {
      id: "4",
      question: "Tell me about a project you're particularly proud of. What made it successful?",
      category: "Achievement",
      followUp: "What would you do differently if you could start over?",
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Start with welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      type: "ai",
      content:
        "Hello! I'm your AI interviewer. I'll be asking you a few questions to assess your readiness for PM internships. Take your time with each answer, and feel free to use the voice input if you prefer speaking. Let's begin!",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])

    // Ask first question after a delay
    setTimeout(() => {
      askQuestion(0)
    }, 2000)
  }, [])

  const askQuestion = (questionIndex: number) => {
    if (questionIndex >= questions.length) {
      completeInterview()
      return
    }

    setIsTyping(true)
    setTimeout(() => {
      const question = questions[questionIndex]
      const questionMessage: Message = {
        id: `question-${question.id}`,
        type: "ai",
        content: question.question,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, questionMessage])
      setIsTyping(false)
    }, 1500)
  }

  const completeInterview = () => {
    setIsTyping(true)
    setTimeout(() => {
      const completionMessage: Message = {
        id: "completion",
        type: "ai",
        content:
          "Great job! You've completed the AI interview. I've analyzed your responses and will now generate personalized internship recommendations based on your answers. Your readiness score and skill gaps will also be calculated.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, completionMessage])
      setIsInterviewComplete(true)
      setIsTyping(false)
    }, 1500)
  }

  const handleSendMessage = () => {
    if (!currentInput.trim() || isInterviewComplete) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: currentInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setCurrentInput("")

    // Simulate AI processing and ask follow-up or next question
    setTimeout(() => {
      const currentQuestion = questions[currentQuestionIndex]
      if (currentQuestion.followUp && Math.random() > 0.5) {
        // Ask follow-up question
        const followUpMessage: Message = {
          id: `followup-${currentQuestion.id}`,
          type: "ai",
          content: currentQuestion.followUp,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, followUpMessage])
      } else {
        // Move to next question
        const nextIndex = currentQuestionIndex + 1
        setCurrentQuestionIndex(nextIndex)
        askQuestion(nextIndex)
      }
    }, 2000)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Simulate voice recording
    if (!isRecording) {
      setTimeout(() => {
        setCurrentInput("This is a simulated voice input response...")
        setIsRecording(false)
      }, 3000)
    }
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Interview Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle>AI Virtual Interview</CardTitle>
                <CardDescription>
                  {isInterviewComplete
                    ? "Interview Complete!"
                    : `Question ${Math.min(currentQuestionIndex + 1, questions.length)} of ${questions.length}`}
                </CardDescription>
              </div>
            </div>
            {!isInterviewComplete && (
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                ~15 min
              </Badge>
            )}
          </div>
          {!isInterviewComplete && <Progress value={progress} className="h-2 mt-4" />}
        </CardHeader>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[500px] flex flex-col">
        <CardContent className="flex-1 p-0">
          <div className="h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "ai" && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  {message.type === "user" && (
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted text-muted-foreground rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {!isInterviewComplete ? (
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      placeholder="Type your answer here..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="pr-12 h-12"
                      disabled={isTyping}
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant={isRecording ? "destructive" : "ghost"}
                      onClick={toggleRecording}
                      className="absolute right-1 top-1 h-10 w-10 p-0"
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button onClick={handleSendMessage} disabled={!currentInput.trim() || isTyping} className="h-12 px-4">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {isRecording && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-destructive">
                    <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                    Recording... Speak clearly into your microphone
                  </div>
                )}
              </div>
            ) : (
              <div className="border-t p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-primary mb-4">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Interview completed successfully!</span>
                </div>
                <Button onClick={onNext} className="w-full h-12">
                  View My Recommendations
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Interview Tips */}
      {!isInterviewComplete && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <MessageSquare className="h-3 w-3" />
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Interview Tips:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Be specific and provide concrete examples</li>
                  <li>• Use the STAR method (Situation, Task, Action, Result)</li>
                  <li>• Take your time to think before answering</li>
                  <li>• Use voice input for more natural responses</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
