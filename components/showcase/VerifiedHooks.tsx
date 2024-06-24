import Link from "next/link"
import { uniswaplabs } from "@data/uniswaplabs-hooks"

import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/components/shared/icons"

export function VerifiedHooks() {
  const hooks = uniswaplabs.sort(() => Math.random() - 0.5)

  return (
    <>
      {hooks.slice(0, 5).map((item) => (
        <Link href={item.github} key={item.id} target="_blank">
          <Badge variant="default" className="mb-1 mr-1">
            🦄 {item.title}
          </Badge>
        </Link>
      ))}
      <Link href="/hooks/collection/uniswap-labs">
        <Badge variant="default" className="mb-1 mr-1">
          <Icons.more className="-mt-2 h-5 w-5 pr-2 pt-2" />
          View more
        </Badge>
      </Link>
    </>
  )
}
