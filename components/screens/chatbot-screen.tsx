"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  MessageCircle,
  Send,
  Phone,
  Video,
  MoreVertical,
  ArrowLeft,
  Paperclip,
  Smile,
  Mic,
  CheckCheck,
} from "lucide-react"

type ChatbotScreenProps = {}

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  status?: "sent" | "delivered" | "read"
  isTyping?: boolean
}

interface QuickReply {
  id: string
  text: string
  action: string
}

export function ChatbotScreen({}: ChatbotScreenProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initialize chat with welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      type: "bot",
      content:
        "Hi! 👋 I'm SmartIntern Bot. I can help you find PM internships, check application status, and answer questions about opportunities. How can I assist you today?",
      timestamp: new Date(),
      status: "read",
    }

    setMessages([welcomeMessage])
    setQuickReplies([
      { id: "find", text: "Find internships", action: "find_internships" },
      { id: "status", text: "Application status", action: "check_status" },
      { id: "tips", text: "Interview tips", action: "get_tips" },
      { id: "help", text: "Help", action: "show_help" },
    ])
  }, [])

  const addBotMessage = (content: string, delay = 1500) => {
    setIsTyping(true)
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        type: "bot",
        content,
        timestamp: new Date(),
        status: "read",
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, delay)
  }

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || currentInput.trim()
    if (!text) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: text,
      timestamp: new Date(),
      status: "read",
    }

    setMessages((prev) => [...prev, userMessage])
    setCurrentInput("")

    // Process user message and respond
    processUserMessage(text.toLowerCase())
  }

  const processUserMessage = (message: string) => {
    if (message.includes("find") && message.includes("internship")) {
      handleFindInternships()
    } else if (message.includes("status") || message.includes("application")) {
      handleCheckStatus()
    } else if (message.includes("tip") || message.includes("interview")) {
      handleGetTips()
    } else if (message.includes("help")) {
      handleShowHelp()
    } else if (message.includes("hello") || message.includes("hi")) {
      addBotMessage("Hello! How can I help you with your PM internship search today?")
    } else {
      addBotMessage(
        "I understand you're looking for help. Try asking me to 'find internships', 'check application status', or 'get interview tips'.",
      )
    }
  }

  const handleFindInternships = () => {
    addBotMessage("Great! Let me find the best PM internships for you based on your profile... 🔍")

    setTimeout(() => {
      const internshipMessage = `Here are 3 top matches for you:

🏢 *TechCorp Solutions*
📍 Mumbai, India | 💰 ₹25-35k/month
🎯 92% Match
Apply: techcorp.com/careers

🚀 *StartupHub*
📍 Bangalore, India | 💰 ₹30-40k/month
🎯 88% Match
Apply: startuphub.com/internships

💻 *E-commerce Giants*
📍 Remote | 💰 ₹20-30k/month
🎯 85% Match
Apply: ecommerce.com/jobs

Would you like more details about any of these positions?`

      addBotMessage(internshipMessage, 2000)

      setQuickReplies([
        { id: "more", text: "Show more", action: "more_internships" },
        { id: "details", text: "Get details", action: "get_details" },
        { id: "apply", text: "How to apply", action: "apply_help" },
      ])
    }, 2000)
  }

  const handleCheckStatus = () => {
    addBotMessage("Let me check your application status... 📋")

    setTimeout(() => {
      const statusMessage = `Here's your application status:

✅ *TechCorp Solutions* - Under Review
📅 Applied: 2 days ago
📊 Status: Your profile is being reviewed by the hiring team

⏳ *StartupHub* - Application Submitted
📅 Applied: 1 day ago
📊 Status: Application received, waiting for initial screening

🎯 *E-commerce Giants* - Interview Scheduled
📅 Applied: 5 days ago
📊 Status: Phone interview scheduled for tomorrow at 2 PM

Good luck with your interview tomorrow! 🍀`

      addBotMessage(statusMessage, 1500)

      setQuickReplies([
        { id: "prep", text: "Interview prep", action: "interview_prep" },
        { id: "reschedule", text: "Reschedule", action: "reschedule" },
        { id: "more_apps", text: "Apply to more", action: "find_internships" },
      ])
    }, 2000)
  }

  const handleGetTips = () => {
    addBotMessage("Here are some essential PM interview tips! 💡")

    setTimeout(() => {
      const tipsMessage = `🎯 *PM Interview Success Tips:*

1. *Product Thinking*
   • Practice product design questions
   • Think user-first, always
   • Use frameworks like CIRCLES

2. *Analytical Skills*
   • Prepare for case studies
   • Know your metrics (DAU, CAC, LTV)
   • Practice estimation problems

3. *Communication*
   • Structure your answers clearly
   • Tell stories with STAR method
   • Ask clarifying questions

4. *Behavioral Questions*
   • Prepare leadership examples
   • Show impact with numbers
   • Demonstrate learning mindset

Want me to send you a detailed prep guide?`

      addBotMessage(tipsMessage, 1500)

      setQuickReplies([
        { id: "guide", text: "Send prep guide", action: "send_guide" },
        { id: "practice", text: "Practice questions", action: "practice" },
        { id: "mock", text: "Mock interview", action: "mock_interview" },
      ])
    }, 2000)
  }

  const handleShowHelp = () => {
    addBotMessage("I'm here to help with your PM internship journey! Here's what I can do:")

    setTimeout(() => {
      const helpMessage = `🤖 *SmartIntern Bot Commands:*

🔍 *"Find internships"*
   Get personalized PM internship recommendations

📊 *"Application status"*
   Check your current application progress

💡 *"Interview tips"*
   Get PM interview preparation guidance

📱 *"Send updates"*
   Get daily internship alerts via WhatsApp

🎯 *"My profile"*
   View and update your profile information

📞 *"Contact support"*
   Connect with our career counselors

Just type what you need or use the quick reply buttons! 😊`

      addBotMessage(helpMessage, 1500)

      setQuickReplies([
        { id: "find", text: "Find internships", action: "find_internships" },
        { id: "updates", text: "Daily updates", action: "setup_updates" },
        { id: "support", text: "Contact support", action: "contact_support" },
      ])
    }, 2000)
  }

  const handleQuickReply = (action: string) => {
    switch (action) {
      case "find_internships":
        handleSendMessage("Find internships")
        break
      case "check_status":
        handleSendMessage("Check application status")
        break
      case "get_tips":
        handleSendMessage("Get interview tips")
        break
      case "show_help":
        handleSendMessage("Help")
        break
      default:
        addBotMessage("Thanks for your interest! This feature is coming soon. 🚀")
        break
    }
  }

  return (
    <div className="max-w-md mx-auto bg-background">
      {/* WhatsApp-style Header */}
      <Card className="rounded-none border-x-0 border-t-0">
        <CardHeader className="p-4 bg-primary text-primary-foreground">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-base">SmartIntern Bot</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-xs">
                Online • Typically replies instantly
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Video className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Phone className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto text-primary-foreground hover:bg-primary-foreground/20"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Chat Messages */}
      <div className="h-[500px] overflow-y-auto bg-gray-50 p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-white text-foreground rounded-bl-sm shadow-sm"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                {message.type === "user" && <CheckCheck className="h-3 w-3 opacity-70" />}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-lg rounded-bl-sm p-3 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {quickReplies.length > 0 && (
        <div className="p-3 bg-gray-50 border-t">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <Button
                key={reply.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickReply(reply.action)}
                className="text-xs bg-white hover:bg-gray-100"
              >
                {reply.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <Card className="rounded-none border-x-0 border-b-0">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <Paperclip className="h-5 w-5 text-muted-foreground" />
            </Button>
            <div className="flex-1 relative">
              <Input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-10 rounded-full border-gray-300"
              />
              <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 p-0 h-auto">
                <Smile className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
            {currentInput.trim() ? (
              <Button onClick={() => handleSendMessage()} size="sm" className="rounded-full w-10 h-10 p-0">
                <Send className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                <Mic className="h-5 w-5 text-muted-foreground" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp Integration Info */}
      <Card className="mt-4">
        <CardContent className="p-4 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <MessageCircle className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold mb-2">Get Updates on WhatsApp</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Receive daily internship alerts, application updates, and interview reminders directly on WhatsApp
          </p>
          <Button className="w-full bg-green-600 hover:bg-green-700">Connect WhatsApp</Button>
        </CardContent>
      </Card>
    </div>
  )
}
