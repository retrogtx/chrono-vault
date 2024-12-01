declare module '@solana/web3.js' {
  export class Connection {
    constructor(endpoint: string, commitment?: string);
    confirmTransaction(signature: string, commitment?: { commitment: string }): Promise<any>;
    getLatestBlockhash(): Promise<{ blockhash: string; lastValidBlockHeight: number }>;
  }
  export class PublicKey {
    constructor(value: string | number[] | Uint8Array | Buffer);
    toString(): string;
    toBytes(): Uint8Array;
  }
  export function clusterApiUrl(cluster: string): string;
  export class ComputeBudgetProgram {
    static setComputeUnitLimit(params: { units: number }): TransactionInstruction;
    static setComputeUnitPrice(params: { microLamports: number }): TransactionInstruction;
  }
  export class TransactionInstruction {
    programId: PublicKey;
    keys: Array<{ pubkey: PublicKey; isSigner: boolean; isWritable: boolean }>;
    data: Buffer;
  }
  export class Transaction {
    recentBlockhash: string | null;
    feePayer: PublicKey | null;
    add(...instructions: TransactionInstruction[]): Transaction;
  }
}

declare module '@project-serum/anchor' {
  import { Connection, PublicKey, Transaction as SolanaTransaction } from '@solana/web3.js';

  export namespace web3 {
    export class Connection extends import('@solana/web3.js').Connection {
      getLatestBlockhash(): Promise<{ blockhash: string; lastValidBlockHeight: number }>;
    }

    export class Transaction extends SolanaTransaction {
      recentBlockhash: string | null;
      feePayer: PublicKey | null;
      add(...instructions: TransactionInstruction[]): Transaction;
    }

    export const PublicKey: {
      new(value: string | number[] | Uint8Array | Buffer): PublicKey;
      findProgramAddress(seeds: Buffer[], programId: PublicKey): Promise<[PublicKey, number]>;
    };
    export const SystemProgram: {
      programId: PublicKey;
    };
    export const ComputeBudgetProgram: {
      setComputeUnitLimit(params: { units: number }): any;
      setComputeUnitPrice(params: { microLamports: number }): any;
    };
  }

  export class Program<IDL extends IdlTypes = any> {
    constructor(
      idl: IDL,
      programId: PublicKey,
      provider: AnchorProvider
    );
    public programId: PublicKey;
    public methods: any;
  }

  export class AnchorProvider {
    constructor(connection: Connection, wallet: any, opts: any);
    static env(): AnchorProvider;
  }

  export function setProvider(provider: AnchorProvider): void;

  export class BN {
    constructor(value: number | string);
  }

  interface IdlTypes {
    version: string;
    name: string;
    instructions: any[];
    accounts: any[];
  }
}

declare module '@solana/wallet-adapter-base' {
  import { PublicKey } from '@solana/web3.js';
  import { Transaction } from '@solana/web3.js';

  export interface WalletContextState {
    publicKey: PublicKey | null;
    signTransaction: ((transaction: Transaction) => Promise<Transaction>) | undefined;
    signAllTransactions: ((transactions: Transaction[]) => Promise<Transaction[]>) | undefined;
    signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined;
  }

  export const WalletAdapterNetwork: {
    Devnet: string;
    Mainnet: string;
    Testnet: string;
  };
} 