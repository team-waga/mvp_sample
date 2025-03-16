"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { QrCode, Download, Copy, Check } from "lucide-react"

export function QRCodeGenerator() {
  const { toast } = useToast()
  const [qrValue, setQrValue] = useState("")
  const [qrType, setQrType] = useState("batch")
  const [qrSize, setQrSize] = useState("200")
  const [copied, setCopied] = useState(false)
  const [qrGenerated, setQrGenerated] = useState(false)

  // Memoize this function to prevent unnecessary recalculations during renders
  const getQRValue = useCallback(() => {
    let prefix = ""

    switch (qrType) {
      case "batch":
        prefix = "waga:batch:"
        break
      case "token":
        prefix = "waga:token:"
        break
      case "redemption":
        prefix = "waga:redemption:"
        break
      default:
        prefix = ""
    }

    return prefix + qrValue
  }, [qrType, qrValue])

  // Memoize the QR code URL to prevent unnecessary recalculations
  const getQRCodeUrl = useCallback(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(getQRValue())}`
  }, [qrSize, getQRValue])

  const generateQRCode = () => {
    if (!qrValue) {
      toast({
        title: "Error",
        description: "Please enter a value for the QR code",
        variant: "destructive",
      })
      return
    }

    setQrGenerated(true)

    toast({
      title: "QR Code Generated",
      description: "Your QR code has been generated successfully.",
    })
  }

  const downloadQRCode = () => {
    const qrUrl = getQRCodeUrl()
    const downloadLink = document.createElement("a")
    downloadLink.href = qrUrl
    downloadLink.download = `${qrType}-${qrValue}-qrcode.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)

    toast({
      title: "QR Code Downloaded",
      description: "Your QR code has been downloaded successfully.",
    })
  }

  const copyQRCode = () => {
    // Copy the QR code URL to clipboard
    navigator.clipboard.writeText(getQRCodeUrl())

    // Show copied state
    setCopied(true)

    // Reset copied state after 2 seconds
    const timer = setTimeout(() => {
      setCopied(false)
    }, 2000)

    // Clean up timer
    return () => clearTimeout(timer)
  }

  // Only calculate the QR code URL when needed
  const qrCodeUrl = qrGenerated ? getQRCodeUrl() : null

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qrType">QR Code Type</Label>
            <Select value={qrType} onValueChange={setQrType}>
              <SelectTrigger id="qrType">
                <SelectValue placeholder="Select QR code type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="batch">Batch</SelectItem>
                <SelectItem value="token">Token</SelectItem>
                <SelectItem value="redemption">Redemption Request</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qrValue">
              {qrType === "batch"
                ? "Batch ID"
                : qrType === "token"
                  ? "Token ID"
                  : qrType === "redemption"
                    ? "Redemption Request ID"
                    : "Custom Value"}
            </Label>
            <Input
              id="qrValue"
              placeholder={
                qrType === "batch"
                  ? "e.g. 1042"
                  : qrType === "token"
                    ? "e.g. 1042-001"
                    : qrType === "redemption"
                      ? "e.g. 123"
                      : "Enter custom value"
              }
              value={qrValue}
              onChange={(e) => setQrValue(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="qrSize">QR Code Size</Label>
            <Select value={qrSize} onValueChange={setQrSize}>
              <SelectTrigger id="qrSize">
                <SelectValue placeholder="Select QR code size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">Small (100x100)</SelectItem>
                <SelectItem value="200">Medium (200x200)</SelectItem>
                <SelectItem value="300">Large (300x300)</SelectItem>
                <SelectItem value="400">Extra Large (400x400)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={generateQRCode} className="w-full">
            <QrCode className="mr-2 h-4 w-4" />
            Generate QR Code
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center">
          {qrGenerated ? (
            <>
              <Card className="w-full flex items-center justify-center p-4">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center">
                    <div id="qr-container" className="flex items-center justify-center">
                      <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code" className="border p-2" />
                    </div>
                    <p className="text-sm text-center mt-2 text-muted-foreground">{getQRValue()}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    copyQRCode()
                    toast({
                      title: "QR Code URL Copied",
                      description: "The QR code URL has been copied to clipboard.",
                    })
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={downloadQRCode}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <QrCode className="h-16 w-16 text-muted-foreground opacity-20" />
              <p className="text-muted-foreground mt-4">Fill in the details and generate a QR code</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

