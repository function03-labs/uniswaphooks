import Link from "next/link"
import { siteConfig } from "@config/site"

import { Container } from "@/components/overall/Container"

export default function HeaderBanner() {
  return (
    <section className="-mt-px border-y border-gray-200 bg-gray-100">
      <Container classNames="py-1.5">
        <Link
          href={siteConfig.links.github}
          rel="noreferrer"
          target="_blank"
          className="flex items-center justify-center gap-1.5 transition hover:opacity-75"
        >
          <span className="text-sm/tight font-medium">
            Enjoy UniswapHooks? Give it a star on GitHub
          </span>

          <span aria-hidden="true" role="img">
            🎉
          </span>
        </Link>
      </Container>
    </section>
  )
}
