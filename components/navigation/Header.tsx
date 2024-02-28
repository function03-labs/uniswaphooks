"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Container from "@component/overall/Container";
import BrandLogo from "@component/overall/BrandLogo";
import HeaderMenu from "@component/navigation/HeaderMenu";
import HeaderMenuLinks from "@component/navigation/HeaderMenuLinks";

import SplashButton from "@component/ui/SplashButton";

import { marketingConfig } from "@config/marketing";

export default function Header() {
  const routerPathname = usePathname();

  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => setShowMenu(false), [routerPathname]);

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
            <SplashButton
              id="submit-button"
              href="https://uniswaphooks.com/add-new-hook"
            >
              <span className="mr-2">🎉</span> Submit Hook
            </SplashButton>
          </div>

          {/*           <SplashButton
            id="submit-button"
            href="/register"
            className="bg-black text-white border-black hover:bg-white hover:text-black hover:border-black"
          >
            <span className="mr-2">🔒</span>
            Register
          </SplashButton> */}

          <HeaderMenu
            showMenu={showMenu}
            handleSetShowMenu={setShowMenu}
            menuLinks={marketingConfig.mainNav}
          />
        </div>
      </Container>
    </header>
  );
}
