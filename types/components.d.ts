import type { ReactNode, ElementRef, ComponentPropsWithoutRef } from 'react'
import type { VariantProps } from 'class-variance-authority'

// Toast component types
export interface ToastProps extends ComponentPropsWithoutRef<'div'> {
  variant?: 'default' | 'destructive'
  className?: string
  children?: ReactNode
}

export interface ToastViewportProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  ref?: ElementRef<'div'>
}

export interface ToastActionProps extends ComponentPropsWithoutRef<'button'> {
  className?: string
  ref?: ElementRef<'button'>
}

// Provider types
export interface StorageProviderProps {
  children: ReactNode
}

export interface WalletProviderProps {
  children: ReactNode
} 