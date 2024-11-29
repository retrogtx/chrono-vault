'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';

export default function ClientWalletButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button 
        className="wallet-adapter-button"
        disabled
      >
        Connect Wallet
      </button>
    );
  }

  return <WalletMultiButton className="wallet-adapter-button" />;
} 