import React from "react"
import Link from "next/link"
import { User } from "@prisma/client"

import { marketingConfig } from "@/config/marketing"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"
import { NumberTicker } from "@/components/ui/number-ticker"
import { StatusPointer } from "@/components/ui/status-pointer"
import { NavigationHeaderMobile } from "@/components/layout/navigation-header-mobile"
import { Icons, Logo } from "@/components/shared/icons"

async function getStars() {
  let stars = 2

  try {
    const response = await fetch(
      "https://github.com/function03-labs/uniswaphooks",
      {
        headers: process.env.GITHUB_TOKEN
          ? {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
              "Content-Type": "application/json",
            }
          : {},
        next: {
          revalidate: 3600,
        },
      }
    )

    if (response.ok) {
      const data = await response.json()
      stars = data.stargazers_count || stars
    }
  } catch (error) {
    console.error("Error fetching GitHub stars:", error)
  }
  return stars
}

function NavigationHeaderDefault() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="relative mr-6 flex items-center space-x-2">
        <Logo className="h-6 w-6" />
        <span className="hidden font-bold md:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="hidden items-center space-x-6 text-xs font-medium xl:flex">
        {marketingConfig.mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href!}
            className={cn(
              "flex items-center justify-center transition-colors hover:text-foreground/80"
            )}
          >
            {item.title}
            {item.active && (
              <StatusPointer bgColor="bg-sky-400" color="bg-sky-600/80" />
            )}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export async function NavigationHeader(user?: User) {
  const stars = await getStars()
  console.log(user)

  return (
    <header
      className={cn(
        "supports-backdrop-blur:bg-background/90 sticky top-0 z-40 w-full bg-background/40 backdrop-blur-lg"
      )}
    >
      <div className="container flex h-16 items-center">
        <NavigationHeaderDefault />
        <NavigationHeaderMobile />
        <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
          <Link
            href={user ? "/register" : "/dashboard"}
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "outline",
              }),
              "hidden border-2 border-primary text-primary md:flex"
            )}
          >
            {user ? "Get Started" : "Dashboard"}
          </Link>
          <Link
            className={cn(
              buttonVariants({
                size: "sm",
              }),
              "hidden max-w-32 gap-2 overflow-hidden whitespace-pre md:flex",
              "animate-shine inline-flex items-center justify-center border border-neutral-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 py-2 text-sm font-medium text-neutral-200 transition-colors"
            )}
            target="_blank"
            href={siteConfig.links.github}
          >
            <div className="flex items-center">
              <Icons.gitHub className="h-4 w-4" />
              <span className="ml-1">Star us</span>{" "}
            </div>
            <div className="ml-2 flex items-center gap-1 text-sm md:flex">
              <Icons.star className="h-4 w-4 text-gray-500 transition-all duration-300 hover:text-yellow-300" />
              <NumberTicker
                value={stars}
                className="font-display font-medium text-white dark:text-black"
              />
            </div>
          </Link>
        </div>
      </div>
      <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200/30 to-neutral-200/0" />
    </header>
  )
}
