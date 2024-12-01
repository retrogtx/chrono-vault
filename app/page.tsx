'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from '@solana/wallet-adapter-react'
import dynamic from 'next/dynamic'

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
)

export default function Home() {
  const { publicKey } = useWallet()
  const [file, setFile] = useState<File | null>(null)
  const [recipientAddress, setRecipientAddress] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !recipientAddress || !releaseDate || !publicKey) return

    try {
      // TODO: Implement file encryption and upload
      // 1. Generate AES key
      // 2. Encrypt file
      // 3. Upload to IPFS
      // 4. Encrypt AES key with recipient's public key
      // 5. Create time capsule on Solana
    } catch (error) {
      console.error('Error creating time capsule:', error)
    }
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create Time Capsule</CardTitle>
            <CardDescription>
              Upload a video and set a future date for your recipient to view it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wallet">Wallet Connection</Label>
                <WalletMultiButton className="w-full" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file">Video File</Label>
                <Input
                  id="file"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient&apos;s Wallet Address</Label>
                <Input
                  id="recipient"
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Enter Solana wallet address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="release">Release Date</Label>
                <Input
                  id="release"
                  type="datetime-local"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!publicKey || !file || !recipientAddress || !releaseDate}
              >
                Create Time Capsule
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
