import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@component/overall/Icons";

import { uniswaplabs } from "@data/uniswaplabs-hooks";

export default function VerifiedHooks() {
  const hooks = uniswaplabs.sort(() => Math.random() - 0.5);

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
          <Icons.more className="w-5 h-5 pr-2 -mt-2 pt-2" />
          View more
        </Badge>
      </Link>
    </>
  );
}
