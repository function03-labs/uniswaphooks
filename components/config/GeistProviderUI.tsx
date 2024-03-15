"use client"

import { GeistProvider } from '@geist-ui/core'

export default function GeistProviderUI({ children }: {
    children: React.ReactNode

}) {
    return (
        <GeistProvider>
            {children}
        </GeistProvider>
    )
}
