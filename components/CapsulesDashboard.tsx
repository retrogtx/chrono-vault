'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Program, AnchorProvider, web3 } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { IDL } from '../app/idl/time_capsule' // You'll need to generate this using anchor build

interface Capsule {
  creator: PublicKey
  recipient: PublicKey
  releaseTime: number
  videoCid: string
  createdAt: number
  accessed: boolean
}

export default function CapsulesDashboard() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [receivedCapsules, setReceivedCapsules] = useState<Capsule[]>([])
  const [createdCapsules, setCreatedCapsules] = useState<Capsule[]>([])

  useEffect(() => {
    if (!publicKey) return

    const fetchCapsules = async () => {
      try {
        const provider = new AnchorProvider(connection, window.solana, {})
        const program = new Program(IDL, new PublicKey("EmxCJ3fwCbbHKTjpP1qSQsGeVCy1abkfEqabsBBnwRCw"), provider)

        // Fetch capsules where current wallet is recipient
        const receivedAccounts = await program.account.capsule.all([
          {
            memcmp: {
              offset: 32, // After creator pubkey
              bytes: publicKey.toBase58()
            }
          }
        ])

        // Fetch capsules where current wallet is creator
        const createdAccounts = await program.account.capsule.all([
          {
            memcmp: {
              offset: 0,
              bytes: publicKey.toBase58()
            }
          }
        ])

        setReceivedCapsules(receivedAccounts.map(acc => acc.account))
        setCreatedCapsules(createdAccounts.map(acc => acc.account))
      } catch (error) {
        console.error('Error fetching capsules:', error)
      }
    }

    fetchCapsules()
  }, [publicKey, connection])

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString()
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Received Time Capsules</CardTitle>
          <CardDescription>
            Time capsules sent to your wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {receivedCapsules.map((capsule, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <p>From: {capsule.creator.toString()}</p>
                <p>Release Date: {formatDate(capsule.releaseTime)}</p>
                <p>Status: {Date.now() / 1000 > capsule.releaseTime ? 'Available' : 'Locked'}</p>
              </div>
            ))}
            {receivedCapsules.length === 0 && (
              <p className="text-muted-foreground">No capsules received yet</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Created Time Capsules</CardTitle>
          <CardDescription>
            Time capsules you've created for others
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {createdCapsules.map((capsule, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <p>To: {capsule.recipient.toString()}</p>
                <p>Release Date: {formatDate(capsule.releaseTime)}</p>
                <p>Created: {formatDate(capsule.createdAt)}</p>
              </div>
            ))}
            {createdCapsules.length === 0 && (
              <p className="text-muted-foreground">No capsules created yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 