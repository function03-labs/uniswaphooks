import Link from "next/link"
import { MainNavItem } from "@/types"

export function HeaderMenuLinks({
  menuLinks,
  navClass,
  ulClass,
}: {
  menuLinks: MainNavItem[]
  navClass?: string
  ulClass?: string
}) {
  return (
    <nav aria-label="Global" className={navClass && navClass}>
      <ul className={ulClass && ulClass}>
        {menuLinks.map((menuLink) => {
          return (
            <li key={menuLink.href}>
              <Link
                href={menuLink.href}
                className="block text-xs font-medium text-gray-900 hover:opacity-75"
              >
                {menuLink.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
