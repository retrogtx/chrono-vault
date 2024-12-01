/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '@solana/wallet-adapter-base' {
  export const WalletAdapterNetwork: {
    Devnet: string;
    Mainnet: string;
    Testnet: string;
  };
}

declare module '@solana/wallet-adapter-react' {
  export function useWallet(): any;
  export const ConnectionProvider: React.FC<any>;
  export const WalletProvider: React.FC<any>;
}

declare module '@solana/wallet-adapter-react-ui' {
  export const WalletModalProvider: React.FC<any>;
  export const WalletMultiButton: React.FC<any>;
}

declare module '@solana/wallet-adapter-wallets' {
  export class PhantomWalletAdapter {
    constructor();
  }
  export class SolflareWalletAdapter {
    constructor();
  }
}

declare module 'helia' {
  export function createHelia(): any;
}

declare module '@helia/unixfs' {
  export function unixfs(client: any): any;
}

declare module 'multiformats/cid' {
  export class CID {
    toString(): string;
  }
} 