'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet, type WalletContextState } from '@solana/wallet-adapter-react'
import { clusterApiUrl, ComputeBudgetProgram, Connection } from '@solana/web3.js'
import dynamic from 'next/dynamic'
import CapsulesDashboard from '@/components/CapsulesDashboard'
import { Program, AnchorProvider, BN, web3 } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { useToast } from "@/hooks/use-toast"
import { IDL } from './idl/time_capsule'
import { encryptFile } from '@/lib/crypto'
import { useStorage } from '@/components/providers/StorageProvider'
import { TimeCapsule } from './idl/time_capsule'

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
)

interface ProgramType {
  program: Program<TimeCapsule>;
  connection: Connection;
}

export default function Home() {
  const wallet = useWallet()
  const { uploadFile } = useStorage()
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [recipientAddress, setRecipientAddress] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const program = useMemo<ProgramType | null>(() => {
    if (!wallet.publicKey) return null;
    
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
    
    const walletAdapter: WalletContextState = {
      publicKey: wallet.publicKey,  
      signTransaction: wallet.signTransaction,
      signAllTransactions: wallet.signAllTransactions,
      signMessage: wallet.signMessage,
      connected: wallet.connected
    }
    
    const provider = new AnchorProvider(
      connection,
      walletAdapter,
      {
        commitment: 'confirmed',
        preflightCommitment: 'confirmed',
        skipPreflight: true,
      }
    )
    
    return {
      program: new Program<TimeCapsule>(
        IDL as TimeCapsule,
        new PublicKey("EmxCJ3fwCbbHKTjpP1qSQsGeVCy1abkfEqabsBBnwRCw"),
        provider
      ),
      connection
    };
  }, [wallet.publicKey, wallet.signTransaction, wallet.signAllTransactions, wallet.signMessage, wallet.connected]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !recipientAddress || !releaseDate || !wallet.publicKey || !program) return

    try {
      setIsSubmitting(true)
      const { program: anchorProgram, connection } = program

      const recipientPubkey = new PublicKey(recipientAddress)
      const { encryptedFile, encryptedKey } = await encryptFile(file, recipientPubkey)
      const cid = await uploadFile(encryptedFile)
      const releaseTimestamp = Math.floor(new Date(releaseDate).getTime() / 1000)

      const signature = await anchorProgram.methods
        .createCapsule(
          recipientPubkey,
          new BN(releaseTimestamp),
          encryptedKey,
          cid
        )
        .accounts({
          capsule: (await web3.PublicKey.findProgramAddress(
            [
              Buffer.from("capsule"),
              Buffer.from(wallet.publicKey.toBytes()),
              Buffer.from(recipientPubkey.toBytes()),
              Buffer.from(releaseTimestamp.toString().slice(0, 8))
            ],
            anchorProgram.programId
          ))[0],
          creator: wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .preInstructions([
          ComputeBudgetProgram.setComputeUnitLimit({ units: 300_000 }),
          ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 1 })
        ])
        .rpc()

      await connection.confirmTransaction(signature, { commitment: 'confirmed' })

      toast({
        title: "Success!",
        description: "Time capsule created successfully",
      })

      setFile(null)
      setRecipientAddress('')
      setReleaseDate('')

    } catch (error) {
      console.error('Error creating time capsule:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create time capsule",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex flex-col gap-8">
        <Card className="w-full max-w-md mx-auto">
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
                disabled={!wallet.publicKey || !file || !recipientAddress || !releaseDate || isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Time Capsule"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <CapsulesDashboard />
      </div>
    </main>
  )
}
