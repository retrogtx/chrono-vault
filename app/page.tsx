import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-8 sm:p-20">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="ChronoVault Logo"
            width={120}
            height={25}
            priority
          />
          <span className="font-[family-name:var(--font-geist-mono)] text-sm">
            Time Capsule
          </span>
        </div>
        <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] px-4 py-2 text-sm">
          Connect Wallet
        </button>
      </header>

      <main className="flex flex-col items-center justify-center gap-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Create Time Capsule</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Upload a video and set a future date for your recipient to view it
            </p>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
              <div className="space-y-2">
                <div className="text-4xl mb-2">📤</div>
                <div className="text-sm font-medium">
                  Drop your video here or click to browse
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Maximum file size: 500MB
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
                />
              </div>

              <button className="w-full bg-foreground text-background rounded-full py-3 font-medium hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors">
                Create Time Capsule
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-sm text-gray-500 dark:text-gray-400">
        Powered by Solana blockchain
      </footer>
    </div>
  );
}
