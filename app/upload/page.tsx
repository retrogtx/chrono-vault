'use client'

import { useStorage } from '@/components/providers/StorageProvider'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import type { ChangeEvent } from 'react'

export default function UploadPage() {
  const { uploadFile, isReady } = useStorage()
  const { publicKey } = useWallet()
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [recipientAddress, setRecipientAddress] = useState('')
  const [uploading, setUploading] = useState(false)
  const [releaseDate, setReleaseDate] = useState('')
  const [error, setError] = useState('')

  const validateSolanaAddress = (address: string) => {
    try {
      new PublicKey(address)
      return true
    } catch {
      return false
    }
  }

  const validateReleaseDate = (date: string) => {
    const selectedDate = new Date(date)
    const now = new Date()
    const minDate = new Date(now.getTime() + 24 * 60 * 60 * 1000) // Minimum 24 hours from now
    const maxDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000) // Maximum 1 year from now

    if (selectedDate <= now) {
      return 'Release date must be in the future'
    }
    if (selectedDate < minDate) {
      return 'Release date must be at least 24 hours from now'
    }
    if (selectedDate > maxDate) {
      return 'Release date cannot be more than 1 year in the future'
    }
    return null
  }

  const handleUpload = async () => {
    if (!isReady || !publicKey || !file) return
    setError('')

    // Validate recipient address
    if (!validateSolanaAddress(recipientAddress)) {
      setError('Invalid recipient Solana address')
      return
    }

    // Validate release date
    const dateError = validateReleaseDate(releaseDate)
    if (dateError) {
      setError(dateError)
      return
    }

    try {
      setUploading(true)
      const cid = await uploadFile(file)
      
      toast({
        title: "Success!",
        description: `Your time capsule has been created with ID: ${cid.slice(0, 8)}...`,
      })

      // Reset form
      setFile(null)
      setRecipientAddress('')
      setReleaseDate('')
      
    } catch (error) {
      console.error('Upload failed:', error)
      setError('Upload failed. Please try again.')
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create time capsule. Please try again.",
      })
    } finally {
      setUploading(false)
    }
  }

  // Get min and max dates for the datetime input
  const getMinDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 1) // Add 24 hours
    return date.toISOString().slice(0, 16) // Format: YYYY-MM-DDTHH:mm
  }

  const getMaxDate = () => {
    const date = new Date()
    date.setFullYear(date.getFullYear() + 1) // Add 1 year
    return date.toISOString().slice(0, 16)
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Time Capsule</CardTitle>
          <CardDescription>
            Create a time-locked capsule that can only be opened after the release date
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end">
            <WalletMultiButton />
          </div>
          
          {error && (
            <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient&apos;s Solana Address</Label>
            <Input 
              id="recipient"
              placeholder="Enter recipient&apos;s Solana address"
              value={recipientAddress}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRecipientAddress(e.target.value)}
              disabled={!publicKey || uploading}
            />
            <p className="text-muted-foreground text-sm">
              The wallet address that will be able to open this capsule
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="releaseDate">Release Date</Label>
            <Input 
              id="releaseDate"
              type="datetime-local"
              min={getMinDate()}
              max={getMaxDate()}
              value={releaseDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setReleaseDate(e.target.value)}
              disabled={!publicKey || uploading}
            />
            <p className="text-muted-foreground text-sm">
              Must be between 24 hours and 1 year from now
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Select File</Label>
            <Input 
              id="file" 
              type="file" 
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)}
              disabled={!publicKey || uploading}
            />
            <p className="text-muted-foreground text-sm">
              Supported formats: Images, Videos, Audio, PDF, DOC, TXT
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleUpload}
            disabled={!publicKey || !file || !recipientAddress || !releaseDate || uploading || !isReady}
            className="w-full"
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span> Creating Time Capsule...
              </span>
            ) : (
              'Create Time Capsule'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 