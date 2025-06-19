"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Calendar, User, Building } from "lucide-react"

interface TransferRumour {
  id: number
  playerName: string
  currentClub: string
  rumourType: "In" | "Out"
  source: string
  date: string
  description: string
}

const mockRumours: TransferRumour[] = [
  {
    id: 1,
    playerName: "João Silva",
    currentClub: "Sporting CP",
    rumourType: "In",
    source: "Sky Sports",
    date: "2025-01-19",
    description: "Celtic reportedly interested in Portuguese midfielder, with talks ongoing.",
  },
  {
    id: 2,
    playerName: "Callum McGregor",
    currentClub: "Celtic",
    rumourType: "Out",
    source: "BBC Sport",
    date: "2025-01-19",
    description: "Premier League clubs monitoring Celtic captain's situation.",
  },
  {
    id: 3,
    playerName: "Erik Andersson",
    currentClub: "Malmö FF",
    rumourType: "In",
    source: "The Herald",
    date: "2025-01-18",
    description: "Swedish defender linked with January move to Parkhead.",
  },
  {
    id: 4,
    playerName: "Liam Henderson",
    currentClub: "Empoli",
    rumourType: "In",
    source: "Celtic FC News",
    date: "2025-01-18",
    description: "Former Celtic youth player could return to Glasgow in summer.",
  },
  {
    id: 5,
    playerName: "Matt O'Riley",
    currentClub: "Celtic",
    rumourType: "Out",
    source: "Daily Record",
    date: "2025-01-17",
    description: "European clubs circle for Danish international midfielder.",
  },
]

export default function CelticTransferRumours() {
  const [rumours, setRumours] = useState<TransferRumour[]>(mockRumours)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, this would fetch new data
    // For now, we'll just shuffle the existing data
    const shuffled = [...rumours].sort(() => Math.random() - 0.5)
    setRumours(shuffled)
    setIsRefreshing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700 mb-2">🍀 Celtic FC Transfer Rumours</h1>
          <p className="text-green-600 text-lg">Latest transfer news and rumours</p>
          <div className="mt-4">
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-green-700 hover:bg-green-800 text-white"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh Rumours"}
            </Button>
          </div>
        </div>

        {/* Rumours List */}
        <div className="space-y-4">
          {rumours.map((rumour) => (
            <Card key={rumour.id} className="border-l-4 border-l-green-600 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {rumour.playerName}
                  </CardTitle>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      rumour.rumourType === "In" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {rumour.rumourType === "In" ? "→ Incoming" : "← Outgoing"}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      <span>{rumour.currentClub}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(rumour.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{rumour.description}</p>
                  <div className="text-sm text-green-600 font-medium">Source: {rumour.source}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>🍀 Hail Hail! 🍀</p>
          <p className="mt-1">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
