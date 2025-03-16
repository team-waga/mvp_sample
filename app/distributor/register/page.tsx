"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Check, Upload, Wallet, Package, BarChart3, ShieldCheck } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function DistributorRegistrationPage() {
  const { toast } = useToast()

  // Form state
  const [companyName, setCompanyName] = useState("")
  const [contactName, setContactName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [country, setCountry] = useState("")
  const [address, setAddress] = useState("")
  const [website, setWebsite] = useState("")
  const [description, setDescription] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [registrationId, setRegistrationId] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!companyName || !contactName || !email || !businessType || !country || !address) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (!acceptTerms) {
      toast({
        title: "Terms and conditions",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      })
      return
    }

    // Check if wallet is connected
    if (!window.ethereum?.selectedAddress) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet using the button in the top right corner before submitting.",
        variant: "destructive",
      })
      return
    }

    // Simulate form submission
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)

      // Generate a random registration ID
      const newRegistrationId =
        "DIST-" +
        Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")
      setRegistrationId(newRegistrationId)

      toast({
        title: "Registration submitted",
        description: `Your distributor registration has been submitted successfully with ID: ${newRegistrationId}`,
      })
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Distributor Registration</h1>
      </div>

      {submitted && registrationId ? (
        <Card>
          <CardHeader>
            <CardTitle>Registration Submitted</CardTitle>
            <CardDescription>Your registration has been submitted successfully</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 mb-6">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your distributor registration has been submitted successfully. Our team will review your application and
                get back to you within 2-3 business days.
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Registration Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Registration ID:</p>
                    <p className="font-medium">{registrationId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status:</p>
                    <p className="font-medium">Pending Review</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Company:</p>
                    <p className="font-medium">{companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact:</p>
                    <p className="font-medium">{contactName}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Return to Dashboard</Link>
                </Button>
                <Button asChild>
                  <Link href="/distributor/inventory">View Distributor Dashboard</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                    <CardDescription>Enter your company details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        placeholder="Enter your company name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select value={businessType} onValueChange={setBusinessType} required>
                        <SelectTrigger id="businessType">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="roaster">Coffee Roaster</SelectItem>
                          <SelectItem value="cafe">Café / Coffee Shop</SelectItem>
                          <SelectItem value="retailer">Retailer</SelectItem>
                          <SelectItem value="wholesaler">Wholesaler</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Select value={country} onValueChange={setCountry} required>
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                          <SelectItem value="jp">Japan</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Business Address *</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your business address"
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://www.example.com"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Business Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Tell us about your business and how you plan to use our platform"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Enter your contact details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        placeholder="Enter your full name"
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
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Blockchain Wallet</CardTitle>
                    <CardDescription>Connect your ERC1155 & ERC20 compatible wallet</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                      <Wallet className="h-4 w-4 text-blue-600" />
                      <AlertTitle>Connect Your Wallet</AlertTitle>
                      <AlertDescription>
                        <p className="text-sm mb-2">
                          Please connect your wallet using the "Connect Wallet" button in the top right corner of the
                          page before submitting this form.
                        </p>
                        <p className="text-sm">
                          Your connected wallet address will be automatically associated with your distributor account.
                        </p>
                      </AlertDescription>
                    </Alert>

                    <div className="flex items-center space-x-2 pt-4">
                      <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms and conditions and privacy policy
                      </label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Upload className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Registration"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-amber-600" />
                  Benefits of Registering
                </CardTitle>
                <CardDescription>Why you should register as a distributor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium flex items-center gap-2">
                    <Package className="h-4 w-4 text-amber-600" />
                    Tokenized Coffee Ownership
                  </h3>
                  <ul className="space-y-2 text-sm pl-6 list-disc">
                    <li>Receive ERC1155 tokens representing ownership of coffee batches</li>
                    <li>Transparent and immutable proof of ownership on the blockchain</li>
                    <li>Transfer ownership easily and securely</li>
                    <li>Access detailed batch information through token metadata</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-amber-600" />
                    Distributor Dashboard Access
                  </h3>
                  <ul className="space-y-2 text-sm pl-6 list-disc">
                    <li>Access specialized inventory management tools</li>
                    <li>Request new batch creation when inventory is low</li>
                    <li>View forecasting and analytics for your coffee inventory</li>
                    <li>Manage redemption requests from your customers</li>
                  </ul>
                </div>

                <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <Wallet className="h-4 w-4 text-blue-600" />
                  <AlertTitle>Compatible Wallets</AlertTitle>
                  <AlertDescription>
                    <p className="text-sm mb-2">
                      You'll need a wallet that supports ERC1155 and ERC20 standards. We recommend:
                    </p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>MetaMask</li>
                      <li>Trust Wallet</li>
                      <li>Coinbase Wallet</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Registration Process</CardTitle>
                <CardDescription>What happens after you register</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 list-decimal pl-5">
                  <li className="text-sm">
                    <span className="font-medium">Submit Registration</span>
                    <p className="text-muted-foreground">
                      Complete the form with your business details and wallet address
                    </p>
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Application Review</span>
                    <p className="text-muted-foreground">Our team reviews your application (2-3 business days)</p>
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Wallet Verification</span>
                    <p className="text-muted-foreground">We verify your wallet can receive ERC1155 tokens</p>
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Dashboard Access</span>
                    <p className="text-muted-foreground">
                      Gain access to the distributor dashboard and inventory management tools
                    </p>
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Start Trading</span>
                    <p className="text-muted-foreground">
                      Begin requesting, receiving, and managing tokenized coffee batches
                    </p>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

