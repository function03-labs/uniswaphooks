"use client"

import React, { createContext, useContext, useState } from "react"

interface SelectedPathContextProps {
  selectedPaths: string[]
  addSelectedPath: (path: string) => void
  removeSelectedPath: (path: string) => void
}

const SelectedPathContext = createContext<SelectedPathContextProps | undefined>(
  undefined
)

export const useSelectedPath = () => {
  const context = useContext(SelectedPathContext)

  if (context === undefined) {
    throw new Error(
      "useSelectedPath must be used within a SelectedPathProvider"
    )
  }

  return context
}

export function FileSelected({ children }: { children: React.ReactNode }) {
  const [selectedPaths, setSelectedPaths] = useState<string[]>([])

  const addSelectedPath = (path: string) => {
    setSelectedPaths((prevPaths) => {
      if (!prevPaths.includes(path)) {
        return [...prevPaths, path]
      }
      return prevPaths
    })
  }

  const removeSelectedPath = (path: string) => {
    setSelectedPaths((prevPaths) => prevPaths.filter((p) => p !== path))
  }

  return (
    <SelectedPathContext.Provider
      value={{ selectedPaths, addSelectedPath, removeSelectedPath }}
    >
      {children}
    </SelectedPathContext.Provider>
  )
}
