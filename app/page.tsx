'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useFileUpload } from './hooks/useFileUpload';
import { useRef } from 'react';
import ClientWalletButton from './components/ClientWalletProvider';

export default function Home() {
  const { connected } = useWallet();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { file, error, onDrop, onFileSelect } = useFileUpload();

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-8 sm:p-20">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Chrono Vault</h1>
          <span className="font-[family-name:var(--font-geist-mono)] text-sm">
            Time Capsule
          </span>
        </div>
        <ClientWalletButton />
      </header>

      <main className="flex flex-col items-center justify-center gap-8">
        {!connected ? (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Welcome to ChronoVault</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Connect your wallet to create or view time capsules
            </p>
          </div>
        ) : (
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Create Time Capsule</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload a video and set a future date for your recipient to view it
              </p>
            </div>

            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={onDrop}
                className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={onFileSelect}
                  className="hidden"
                />
                <div className="space-y-2">
                  <div className="text-4xl mb-2">
                    {file ? '📼' : '📤'}
                  </div>
                  <div className="text-sm font-medium">
                    {file ? file.name : 'Drop your video here or click to browse'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {error ? (
                      <span className="text-red-500">{error}</span>
                    ) : (
                      file ? `${(file.size / (1024 * 1024)).toFixed(2)}MB` : 'Maximum file size: 500MB'
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Recipient&apos;s Wallet Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"
                    placeholder="Enter Solana wallet address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Release Date
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>

                <button 
                  className="w-full bg-foreground text-background rounded-full py-3 font-medium hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!file}
                >
                  Create Time Capsule
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center text-sm text-gray-500 dark:text-gray-400">
        Powered by Solana blockchain
      </footer>
    </div>
  );
}
