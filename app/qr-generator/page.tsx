import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QRCodeGenerator } from "@/components/qr-code-generator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function QRGeneratorPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">QR Code Generator</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate QR Codes</CardTitle>
          <CardDescription>Create QR codes for batches, tokens, or redemption requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="generator">
            <TabsList className={cn("bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300")}>
              <TabsTrigger value="generator">Generator</TabsTrigger>
              <TabsTrigger value="about">About QR Codes</TabsTrigger>
            </TabsList>
            <TabsContent value="generator" className="mt-6">
              <QRCodeGenerator />
            </TabsContent>
            <TabsContent value="about" className="mt-6">
              <div className="space-y-4">
                <p>
                  QR codes provide a convenient way to access information about coffee batches, tokens, and redemption
                  requests. These codes can be scanned with a smartphone camera or QR code reader app to quickly access
                  detailed information.
                </p>

                <div className="space-y-2">
                  <h3 className="font-medium">Batch QR Codes</h3>
                  <p className="text-sm text-muted-foreground">
                    Batch QR codes link to detailed information about a specific coffee batch, including its origin,
                    processing methods, and certifications. These codes can be printed on packaging or displayed on
                    websites.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Token QR Codes</h3>
                  <p className="text-sm text-muted-foreground">
                    Token QR codes represent ownership of a specific amount of coffee from a batch. These codes can be
                    used to verify ownership or initiate a redemption request.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Redemption Request QR Codes</h3>
                  <p className="text-sm text-muted-foreground">
                    Redemption request QR codes link to information about a specific redemption request, including its
                    status and delivery details. These codes can be used to track the status of a redemption request.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Usage Guidelines</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Use batch QR codes on packaging, marketing materials, and websites</li>
                    <li>Include token QR codes in digital wallets or certificates of ownership</li>
                    <li>Share redemption request QR codes with customers for easy tracking</li>
                    <li>Ensure QR codes are printed at a sufficient size for reliable scanning</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>QR Code Use Cases</CardTitle>
            <CardDescription>How QR codes enhance the coffee traceability system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Consumer Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Consumers can scan QR codes on coffee packaging to view detailed information about the coffee's
                  origin, processing methods, and journey from farm to cup.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Supply Chain Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Supply chain partners can scan QR codes to verify the authenticity of coffee batches and tokens,
                  ensuring transparency and traceability throughout the supply chain.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Redemption Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Token holders can scan QR codes to track the status of their redemption requests, providing a seamless
                  and transparent redemption experience.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recently Generated QR Codes</CardTitle>
            <CardDescription>Your recently generated QR codes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=40x40&data=waga:batch:1042"
                      alt="QR Code"
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Batch #1042</p>
                    <p className="text-xs text-muted-foreground">Ethiopia Sidama</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=40x40&data=waga:token:1042-001"
                      alt="QR Code"
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Token #1042-001</p>
                    <p className="text-xs text-muted-foreground">Ethiopia Sidama</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">5 hours ago</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=40x40&data=waga:redemption:123"
                      alt="QR Code"
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Redemption #123</p>
                    <p className="text-xs text-muted-foreground">Coffee Shop A</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

