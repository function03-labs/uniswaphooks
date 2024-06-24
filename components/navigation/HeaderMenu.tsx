import { MainNavItem } from "@/types"

import { HeaderMenuLinks } from "@/components/navigation/HeaderMenuLinks"
import { IconMenu } from "@/components/shared/icons"

export function HeaderMenu({
  showMenu,
  handleSetShowMenu,
  menuLinks,
}: {
  showMenu: boolean
  handleSetShowMenu: (showMenu: boolean) => void
  menuLinks: MainNavItem[]
}) {
  return (
    <div className="flex items-center lg:hidden">
      <button
        onClick={() => handleSetShowMenu(!showMenu)}
        className="text-gray-900"
      >
        <IconMenu />

        <span className="sr-only">Toggle menu</span>
      </button>

      {showMenu && (
        <div className="absolute inset-x-0 top-14 px-2">
          <HeaderMenuLinks
            menuLinks={menuLinks}
            navClass="bg-white border p-4 border-gray-200 shadow-lg rounded-lg"
            ulClass="space-y-4"
          />
        </div>
      )}
    </div>
  )
}
