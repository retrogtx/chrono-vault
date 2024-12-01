declare module '@radix-ui/react-toast' {
  import { ComponentPropsWithoutRef, ElementRef } from 'react'
  export const Root: React.FC<any>
  export const Viewport: React.FC<any>
  export const Action: React.FC<any>
  export const Close: React.FC<any>
  export const Title: React.FC<any>
  export const Description: React.FC<any>
}

declare module 'class-variance-authority' {
  export function cva(base: string, config?: any): any
  export type VariantProps<T> = any
}

declare module 'lucide-react' {
  export const X: React.FC<any>
}

declare module '@web3-storage/w3up-client' {
  export function create(): Promise<any>
  export interface W3Client {
    uploadFile(file: File): Promise<{ toString(): string }>
    login(email: string): Promise<void>
    setCurrentSpace(space: string): Promise<void>
  }
}

declare module '@solana/web3.js' {
  export function clusterApiUrl(network: string): string
  export class PublicKey {
    constructor(key: string)
    toString(): string
  }
}

declare module '@solana/wallet-adapter-base' {
  export const WalletAdapterNetwork: {
    Devnet: string
    Mainnet: string
    Testnet: string
  }
}

declare module '@solana/wallet-adapter-react-ui/styles.css' 