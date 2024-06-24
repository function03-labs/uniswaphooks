"use client"

import Link from "next/link"
import { cn } from "@lib/utils"
import { emojisplosion } from "emojisplosion"
import { SplashButtonProps } from "@/types/splash-button"

export function SplashButton(props: SplashButtonProps) {
  const handleClick = () => {
    const element = document.getElementById(props.id)
    setTimeout(() => {}, 500)

    if (element instanceof HTMLElement) {
      let cumulativeOffset = function (element: HTMLElement): {
        top: number
        left: number
      } {
        let top = 0,
          left = 0
        do {
          top += element.offsetTop || 0
          left += element.offsetLeft || 0
          element = element.offsetParent as HTMLElement
        } while (element)

        return { top, left }
      }

      emojisplosion({
        physics: {
          fontSize: {
            max: 43,
            min: 24,
          },
        },
        emojis: ["🪝", "🦄"],
        position() {
          const offset = cumulativeOffset(element)
          return {
            x: offset.left + element.clientWidth / 2,
            y: offset.top + element.clientHeight / 2,
          }
        },
      })
    } else {
      console.error("Element not found")
    }
  }

  return (
    <div className="flex justify-center">
      <Link
        className={cn(
          props.className,
          "inline-flex items-center rounded-md border-2 border-current px-3 py-1.5 text-xs font-semibold transition hover:-rotate-2 hover:scale-110 focus:outline-none focus:ring active:text-pink-500"
        )}
        id={props.id}
        href={props.href}
        onClick={() => {
          handleClick()
        }}
      >
        {props.children}
      </Link>
    </div>
  )
}
