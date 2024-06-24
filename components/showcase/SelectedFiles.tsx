"use client"

import Link from "next/link"

import { TreeFile } from "@/types/tree"

import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/Card"
import { useSelectedPath } from "@/components/config/FileSelected"
import { Icons } from "@/components/shared/icons"

export function SelectedFiles({
  selected,
  link,
}: {
  selected: TreeFile
  link: string
}) {
  const { selectedPaths, removeSelectedPath } = useSelectedPath()

  return (
    <nav className="max-w-[90%] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
      {selectedPaths.length === 0 ? (
        <Card className="min-w-0 flex-none rounded-lg">
          <div className="flex items-center justify-between p-2">
            <CardTitle className="text-sm font-semibold">
              {selected.name}
            </CardTitle>
            <Button variant="outline" size="icon" className="ml-2">
              <Icons.close className="h-3 w-3" />
            </Button>
          </div>
        </Card>
      ) : (
        <div className="flex  space-x-2 p-2 ">
          {selectedPaths.reverse().map((path) => {
            return (
              <Link key={path} href={`${link}?path=${path}`}>
                <Card
                  className={`min-w-0 flex-none rounded-lg ${
                    selected.path === path ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between p-2">
                    <CardTitle className="text-sm font-semibold">
                      {path}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="icon"
                      className="ml-2"
                      onClick={() => removeSelectedPath(path)}
                    >
                      <Icons.close className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
