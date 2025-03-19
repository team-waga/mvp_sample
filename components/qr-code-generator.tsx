"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useSearchParams } from "next/navigation"
import { QrCode, Download, Copy, Check } from "lucide-react"
import { cn, web3ButtonStyles } from "@/lib/utils"

export function QRCodeGenerator() {
  const { toast } = useToast()
  const searchParams = useSearchParams()

  const [qrType, setQrType] = useState("batch")
  const [qrValue, setQrValue] = useState("")
  const [qrSize, setQrSize] = useState("200")
  const [qrUrl, setQrUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [generated, setGenerated] = useState(false)

  // Use useCallback to memoize the generateQR function
  const generateQR = useCallback(
    (type = qrType, value = qrValue, size = qrSize) => {
      if (!value.trim()) {
        toast({
          title: "Error",
          description: "Please enter a value for the QR code",
          variant: "destructive",
        })
        return
      }

      try {
        // Create QR code URL with prefix based on type
        const prefix = type === "batch" ? "waga:batch:" : type === "token" ? "waga:token:" : "waga:redemption:"
        const qrData = encodeURIComponent(prefix + value)
        const sizeNum = Number.parseInt(size) || 200

        // Use QR Server API to generate QR code
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${sizeNum}x${sizeNum}&data=${qrData}`
        setQrUrl(url)
        setGenerated(true)
      } catch (error) {
        console.error("Error generating QR code:", error)
        toast({
          title: "Error",
          description: "Failed to generate QR code. Please try again.",
          variant: "destructive",
        })
      }
    },
    [toast],
  ) // Only depend on toast, not on state variables that change

  useEffect(() => {
    // Check if type and value are provided in URL
    const typeParam = searchParams.get("type")
    const valueParam = searchParams.get("value")

    if (typeParam && valueParam) {
      setQrType(typeParam)
      setQrValue(valueParam)

      // Use setTimeout to ensure state updates have completed
      setTimeout(() => {
        generateQR(typeParam, valueParam, qrSize)
      }, 0)
    }
  }, [searchParams, generateQR, qrSize]) // Include all dependencies

  const handleGenerate = () => {
    generateQR(qrType, qrValue, qrSize)
  }

  const handleDownload = () => {
    if (!qrUrl) return

    // Create a temporary link to download the QR code
    const link = document.createElement("a")
    link.href = qrUrl
    link.download = `waga-${qrType}-${qrValue}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "QR Code Downloaded",
      description: `The QR code has been downloaded successfully.`,
    })
  }

  const copyQrUrl = () => {
    if (!qrUrl) return

    navigator.clipboard.writeText(qrUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    toast({
      title: "URL Copied",
      description: "QR code URL has been copied to clipboard.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qr-type">QR Code Type</Label>
            <Select value={qrType} onValueChange={setQrType}>
              <SelectTrigger id="qr-type">
                <SelectValue placeholder="Select QR code type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="batch">Batch QR Code</SelectItem>
                <SelectItem value="token">Token QR Code</SelectItem>
                <SelectItem value="redemption">Redemption QR Code</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qr-value">
              {qrType === "batch" ? "Batch ID" : qrType === "token" ? "Token ID" : "Redemption ID"}
            </Label>
            <Input
              id="qr-value"
              placeholder={qrType === "batch" ? "e.g. 1042" : qrType === "token" ? "e.g. 1042-001" : "e.g. 123"}
              value={qrValue}
              onChange={(e) => setQrValue(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="qr-size">QR Code Size (px)</Label>
            <Input
              id="qr-size"
              type="number"
              min="100"
              max="500"
              step="50"
              value={qrSize}
              onChange={(e) => setQrSize(e.target.value)}
            />
          </div>

          <Button onClick={handleGenerate} className={cn(web3ButtonStyles("primary"))}>
            <QrCode className="mr-2 h-4 w-4" />
            Generate QR Code
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
          {generated ? (
            <>
              <div className="border p-4 rounded-lg bg-white">
                <img src={qrUrl || "/placeholder.svg"} alt="Generated QR Code" className="max-w-full" />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleDownload} className={cn(web3ButtonStyles("secondary"))}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" onClick={copyQrUrl} className={cn(web3ButtonStyles("secondary"))}>
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy URL
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <QrCode className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">QR code will appear here</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
        <h3 className="font-medium mb-2">QR Code Information</h3>
        <p className="text-sm text-muted-foreground">
          {qrType === "batch"
            ? "Batch QR codes link to detailed information about a specific coffee batch, including its origin, processing methods, and certifications."
            : qrType === "token"
              ? "Token QR codes represent ownership of a specific amount of coffee from a batch. These codes can be used to verify ownership or initiate a redemption request."
              : "Redemption request QR codes link to information about a specific redemption request, including its status and delivery details."}
        </p>
      </div>
    </div>
  )
}

