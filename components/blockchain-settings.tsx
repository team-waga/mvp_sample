"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useWallet } from "@/hooks/use-wallet"
import { useBlockchainFeatures } from "@/hooks/use-blockchain-features"
import { ShieldCheck, AlertTriangle } from "lucide-react"
import { cn, web3ButtonStyles } from "@/lib/utils"
import { WalletConnect } from "@/components/wallet-connect"

export function BlockchainSettings() {
  const { toast } = useToast()
  const { account, isConnected } = useWallet()
  const { features, toggleFeature } = useBlockchainFeatures()

  const [contractAddress, setContractAddress] = useState("0x1234567890abcdef1234567890abcdef12345678")
  const [rpcUrl, setRpcUrl] = useState("https://polygon-rpc.com")

  const handleSaveSettings = () => {
    toast({
      title: "Blockchain Settings Saved",
      description: "Your blockchain settings have been saved successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Wallet Connection</CardTitle>
          <CardDescription>Connect your wallet to interact with blockchain features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isConnected ? (
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <AlertTitle>Wallet Connected</AlertTitle>
              <AlertDescription>
                <p className="mb-2">Your wallet is connected to the application.</p>
                <p className="font-mono text-xs">{account}</p>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertTitle>Wallet Not Connected</AlertTitle>
              <AlertDescription>Connect your wallet to enable blockchain features.</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end">
            <WalletConnect variant={isConnected ? "secondary" : "primary"} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Blockchain Configuration</CardTitle>
          <CardDescription>Configure blockchain settings for the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="contract-address">Token Contract Address</Label>
            <Input id="contract-address" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} />
            <p className="text-xs text-muted-foreground">
              The address of the ERC-1155 token contract for coffee batches.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rpc-url">RPC URL</Label>
            <Input id="rpc-url" value={rpcUrl} onChange={(e) => setRpcUrl(e.target.value)} />
            <p className="text-xs text-muted-foreground">The RPC URL for connecting to the blockchain network.</p>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} className={cn(web3ButtonStyles("primary"))}>
              Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feature Toggles</CardTitle>
          <CardDescription>Enable or disable blockchain features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-minting">Enable Minting</Label>
              <p className="text-sm text-muted-foreground">Enable minting of tokens for coffee batches.</p>
            </div>
            <Switch
              id="enable-minting"
              checked={features.ENABLE_MINTING}
              onCheckedChange={() => toggleFeature("ENABLE_MINTING")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-verification">Enable Verification</Label>
              <p className="text-sm text-muted-foreground">Enable verification of coffee batches on the blockchain.</p>
            </div>
            <Switch
              id="enable-verification"
              checked={features.ENABLE_VERIFICATION}
              onCheckedChange={() => toggleFeature("ENABLE_VERIFICATION")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-redemption">Enable Redemption</Label>
              <p className="text-sm text-muted-foreground">Enable redemption of tokens for physical coffee.</p>
            </div>
            <Switch
              id="enable-redemption"
              checked={features.ENABLE_REDEMPTION}
              onCheckedChange={() => toggleFeature("ENABLE_REDEMPTION")}
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} className={cn(web3ButtonStyles("primary"))}>
              Save Feature Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

