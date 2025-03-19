"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Wallet, Check, Coffee, Tag, Shield, FileText } from "lucide-react"

export default function DistributorRegistrationPage() {
  const { toast } = useToast()
  const router = useRouter()

  // Form state
  const [companyName, setCompanyName] = useState("")
  const [contactName, setContactName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [yearsInOperation, setYearsInOperation] = useState("")
  const [monthlyVolume, setMonthlyVolume] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)

  // Wallet state
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationComplete, setRegistrationComplete] = useState(false)

  const connectWallet = async () => {
    // Simulate wallet connection
    setIsSubmitting(true)

    setTimeout(() => {
      // Generate a random wallet address
      const randomAddress =
        "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

      setWalletAddress(randomAddress)
      setWalletConnected(true)
      setIsSubmitting(false)

      toast({
        title: "Wallet Connected",
        description: `Successfully connected wallet: ${randomAddress.substring(0, 6)}...${randomAddress.substring(38)}`,
      })
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (
      !companyName ||
      !contactName ||
      !email ||
      !phone ||
      !businessType ||
      !address ||
      !city ||
      !country ||
      !acceptTerms
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and accept the terms and conditions.",
        variant: "destructive",
      })
      return
    }

    if (!walletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to verify your identity.",
        variant: "destructive",
      })
      return
    }

    // Submit form
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setRegistrationComplete(true)

      toast({
        title: "Registration Successful",
        description: "Your distributor registration has been submitted successfully.",
      })
    }, 2000)
  }

  const redirectToDashboard = () => {
    router.push("/distributor/dashboard")
  }

  if (registrationComplete) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Registration Complete</CardTitle>
            <CardDescription>Your distributor account has been created successfully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle>Registration Successful</AlertTitle>
              <AlertDescription>
                Your distributor account has been created and is now pending verification. You will receive an email
                when your account is approved.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Account Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Company:</p>
                    <p className="font-medium">{companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact Person:</p>
                    <p className="font-medium">{contactName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email:</p>
                    <p className="font-medium">{email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Wallet Address:</p>
                    <p className="font-medium">
                      {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Next Steps</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Our team will review your application (typically within 1-2 business days)</li>
                  <li>You will receive an email notification when your account is approved</li>
                  <li>Once approved, you can start requesting coffee batches and managing your inventory</li>
                  <li>Complete your profile by adding payment methods and shipping preferences</li>
                </ol>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={redirectToDashboard}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none"
            >
              Go to Distributor Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Distributor Registration</h1>
        <p className="text-muted-foreground">
          Register as a WAGA Coffee distributor to access premium coffee batches and blockchain verification
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-amber-500" />
              Wallet Verification
            </CardTitle>
            <CardDescription>Connect your wallet to verify your identity</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertTitle>Wallet Connection Required</AlertTitle>
              <AlertDescription>
                To register as a distributor, you need to connect your wallet. This wallet will be used to verify your
                identity and manage your coffee batches.
              </AlertDescription>
            </Alert>

            {walletConnected ? (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <h3 className="font-medium">Wallet Connected</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Your wallet has been successfully connected and verified.
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Address:</span>
                  <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">
                    {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
                  </code>
                </div>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none"
              >
                {isSubmitting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Distributor Benefits</CardTitle>
            <CardDescription>Advantages of becoming a WAGA Coffee distributor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg h-fit">
                  <Coffee className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Premium Coffee Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Get first access to rare, limited-edition coffee batches from Ethiopia and other premium origins.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg h-fit">
                  <Tag className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Preferential Pricing</h3>
                  <p className="text-sm text-muted-foreground">
                    Enjoy volume-based discounts and special pricing tiers available only to registered distributors.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg h-fit">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Blockchain Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Provide your customers with verifiable proof of authenticity and origin for every coffee batch.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg h-fit">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Custom Batch Requests</h3>
                  <p className="text-sm text-muted-foreground">
                    Request custom roast profiles and processing methods tailored to your specific market needs.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>Complete the form below to register as a distributor</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="company" className="mb-6">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="company">Company Information</TabsTrigger>
                  <TabsTrigger value="business">Business Details</TabsTrigger>
                  <TabsTrigger value="address">Address</TabsTrigger>
                </TabsList>

                <TabsContent value="company" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Person *</Label>
                      <Input
                        id="contactName"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="business" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type *</Label>
                      <select
                        id="businessType"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Select business type</option>
                        <option value="cafe">Café / Coffee Shop</option>
                        <option value="roaster">Coffee Roaster</option>
                        <option value="retailer">Retailer</option>
                        <option value="wholesaler">Wholesaler</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearsInOperation">Years in Operation</Label>
                      <Input
                        id="yearsInOperation"
                        type="number"
                        min="0"
                        value={yearsInOperation}
                        onChange={(e) => setYearsInOperation(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="monthlyVolume">Monthly Coffee Volume (kg)</Label>
                      <Input
                        id="monthlyVolume"
                        type="number"
                        min="0"
                        value={monthlyVolume}
                        onChange={(e) => setMonthlyVolume(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Approximate monthly volume of coffee your business handles
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="address" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State / Province</Label>
                      <Input id="state" value={state} onChange={(e) => setState(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Tell us more about your business and how you plan to use WAGA Coffee"
                    rows={4}
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean") {
                        setAcceptTerms(checked)
                      }
                    }}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions, including the privacy policy and distributor agreement
                  </Label>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting || !walletConnected}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none"
                >
                  {isSubmitting ? "Submitting..." : "Complete Registration"}
                </Button>
                {!walletConnected && (
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Please connect your wallet above to complete registration
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

