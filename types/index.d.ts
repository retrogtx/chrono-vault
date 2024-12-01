declare module '@solana/wallet-adapter-base' {
  export const WalletAdapterNetwork: {
    Devnet: string;
    Mainnet: string;
    Testnet: string;
  };
}

declare module '@solana/wallet-adapter-react' {
  import { FC, ReactNode } from 'react';
  export const ConnectionProvider: FC<{ endpoint: string; children: ReactNode }>;
  export const WalletProvider: FC<{ wallets: any[]; children: ReactNode; autoConnect?: boolean }>;
}

declare module '@solana/wallet-adapter-react-ui' {
  import { FC, ReactNode } from 'react';
  export const WalletModalProvider: FC<{ children: ReactNode }>;
  export const WalletMultiButton: FC;
}

declare module '@solana/wallet-adapter-wallets' {
  export class PhantomWalletAdapter {
    constructor();
  }
  export class SolflareWalletAdapter {
    constructor();
  }
}

declare module 'web3.storage' {
  export class Web3Storage {
    constructor(options: { token: string });
    put(files: File[], options?: { name?: string; maxRetries?: number }): Promise<string>;
  }
} 