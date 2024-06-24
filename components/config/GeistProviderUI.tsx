"use client"

import { GeistProvider } from "@geist-ui/core"

export function GeistProviderUI({ children }: { children: React.ReactNode }) {
  return <GeistProvider>{children}</GeistProvider>
}
