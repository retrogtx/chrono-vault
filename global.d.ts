import { ReactNode } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

declare module '@solana/wallet-adapter-base' {
  export const WalletAdapterNetwork: {
    Devnet: string
    Mainnet: string
    Testnet: string
  }
}

declare module 'web3.storage' {
  export class Web3Storage {
    constructor(options: { token: string })
    put(files: File[], options?: { name?: string; maxRetries?: number }): Promise<string>
  }
} 