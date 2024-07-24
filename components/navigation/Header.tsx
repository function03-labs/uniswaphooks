"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { marketingConfig } from "@config/marketing"

import { SplashButton } from "@/components/ui/SplashButton"
import { HeaderMenu } from "@/components/navigation/HeaderMenu"
import { HeaderMenuLinks } from "@/components/navigation/HeaderMenuLinks"
import { BrandLogo } from "@/components/overall/BrandLogo"
import { Container } from "@/components/overall/Container"

export function Header({ user }: { user: any }) {
  const routerPathname = usePathname()

  const [showMenu, setShowMenu] = useState(false)
  useEffect(() => setShowMenu(false), [routerPathname])

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-gray-200 bg-white">
      <Container classNames="relative flex h-16 items-center justify-between gap-4 sm:gap-8">
        <div className="flex flex-1 items-center gap-4">
          <Link href="/">
            <BrandLogo fontSize="text-md" />
          </Link>
          <HeaderMenuLinks
            menuLinks={marketingConfig.mainNav}
            navClass="hidden lg:block lg:flex-1"
            ulClass="gap-4 flex"
          />
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-4">
          <div className="hidden sm:block">
            <SplashButton id="submit-button" href="/dashboard/hook/submit">
              <span className="mr-2">🎉</span> Submit A Hook
            </SplashButton>
          </div>

          <SplashButton
            id="submit-button"
            href={user ? "/dashboard" : "/register"}
            className="border-black bg-black text-white hover:border-black hover:bg-white hover:text-black"
          >
            <span className="mr-2">🔒</span>
            {user ? "Dashboard" : "Register"}
          </SplashButton>

          <HeaderMenu
            showMenu={showMenu}
            handleSetShowMenu={setShowMenu}
            menuLinks={marketingConfig.mainNav}
          />
        </div>
      </Container>
    </header>
  )
}
