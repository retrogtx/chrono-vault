import { PublicKey } from '@solana/web3.js'

export async function encryptFile(
  file: File, 
  recipientPublicKey: PublicKey
): Promise<{ encryptedFile: File; encryptedKey: string }> {
  // Generate a random AES key
  const aesKey = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  )

  // Convert file to ArrayBuffer
  const fileBuffer = await file.arrayBuffer()
  
  // Generate IV
  const iv = window.crypto.getRandomValues(new Uint8Array(12))
  
  // Encrypt file with AES key
  const encryptedContent = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    aesKey,
    fileBuffer
  )

  // Export AES key
  const exportedKey = await window.crypto.subtle.exportKey('raw', aesKey)
  
  // For now, we'll just base64 encode the key
  // TODO: Implement proper key encryption with recipient's public key
  const encryptedKey = btoa(String.fromCharCode(...new Uint8Array(exportedKey)))

  // Create new File with encrypted content
  const encryptedFile = new File(
    [iv, new Uint8Array(encryptedContent)], // Prepend IV to encrypted content
    file.name,
    { type: 'application/octet-stream' }
  )

  return {
    encryptedFile,
    encryptedKey
  }
} 