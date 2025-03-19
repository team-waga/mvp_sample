"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useBlockchainFeatures } from "@/hooks/use-blockchain-features"
import { useToast } from "@/components/ui/use-toast"

export default function BlockchainSettings() {
  const { features, toggleFeature, resetFeatures } = useBlockchainFeatures()
  const { toast } = useToast()
  const [isResetting, setIsResetting] = useState(false)

  const handleReset = () => {
    setIsResetting(true)
    setTimeout(() => {
      resetFeatures()
      setIsResetting(false)
      toast({
        title: "Settings Reset",
        description: "Blockchain features have been reset to default values",
      })
    }, 500)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Blockchain Settings</h1>
      <p className="text-muted-foreground mb-8">
        Configure blockchain integration features. Disabling features will fall back to mock data.
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Feature Toggles</CardTitle>
          <CardDescription>Enable or disable blockchain features to control application behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Wallet Connection</h3>
              <p className="text-sm text-muted-foreground">Enable wallet connection for blockchain interactions</p>
            </div>
            <Switch
              checked={features.ENABLE_WALLET_CONNECT}
              onCheckedChange={() => toggleFeature("ENABLE_WALLET_CONNECT")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Minting</h3>
              <p className="text-sm text-muted-foreground">Enable blockchain minting for batches and tokens</p>
            </div>
            <Switch checked={features.ENABLE_MINTING} onCheckedChange={() => toggleFeature("ENABLE_MINTING")} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Redemption</h3>
              <p className="text-sm text-muted-foreground">Enable blockchain redemption verification</p>
            </div>
            <Switch checked={features.ENABLE_REDEMPTION} onCheckedChange={() => toggleFeature("ENABLE_REDEMPTION")} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Marketplace</h3>
              <p className="text-sm text-muted-foreground">Enable blockchain marketplace functionality</p>
            </div>
            <Switch checked={features.ENABLE_MARKETPLACE} onCheckedChange={() => toggleFeature("ENABLE_MARKETPLACE")} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Distributor Registration</h3>
              <p className="text-sm text-muted-foreground">Enable blockchain distributor registration</p>
            </div>
            <Switch
              checked={features.ENABLE_DISTRIBUTOR_REGISTRATION}
              onCheckedChange={() => toggleFeature("ENABLE_DISTRIBUTOR_REGISTRATION")}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="destructive" onClick={handleReset} disabled={isResetting}>
          {isResetting ? "Resetting..." : "Reset to Defaults"}
        </Button>
      </div>
    </div>
  )
}

