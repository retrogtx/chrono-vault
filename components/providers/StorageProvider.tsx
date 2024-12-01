'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { create } from '@web3-storage/w3up-client'
import type { ReactNode } from 'react'

interface StorageContextType {
  client: any
  uploadFile: (file: File) => Promise<string>
  isReady: boolean
}

const StorageContext = createContext<StorageContextType>({
  client: null,
  uploadFile: async () => '',
  isReady: false
})

export function StorageProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<any>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    async function initStorage() {
      try {
        const client = await create()
        // Register with your email
        await client.login(process.env.NEXT_PUBLIC_W3_EMAIL as string)
        // Set your space
        await client.setCurrentSpace(process.env.NEXT_PUBLIC_W3_SPACE as string)
        
        setClient(client)
        setIsReady(true)
      } catch (error) {
        console.error('Failed to initialize storage:', error)
      }
    }

    initStorage()
  }, [])

  const uploadFile = async (file: File): Promise<string> => {
    if (!client) throw new Error('Storage client not initialized')

    try {
      const cid = await client.uploadFile(file)
      return cid.toString()
    } catch (error) {
      console.error('Failed to upload file:', error)
      throw error
    }
  }

  return (
    <StorageContext.Provider value={{ client, uploadFile, isReady }}>
      {children}
    </StorageContext.Provider>
  )
}

export const useStorage = () => useContext(StorageContext) 