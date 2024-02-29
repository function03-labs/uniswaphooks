"use client"

import { GeistProvider, CssBaseline } from '@geist-ui/core'

export default function GeistProviderUI({ children }: {
    children: React.ReactNode

}) {
    return (
        <GeistProvider>
            {/*             <CssBaseline />*/}
            {children}
        </GeistProvider>
    )
}
