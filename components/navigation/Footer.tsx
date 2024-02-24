import Link from "next/link";
import { siteConfig } from "@config/site";
import { marketingConfig } from "@config/marketing";

import Container from "@component/overall/Container";
import BrandLogo from "@component/overall/BrandLogo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <Container classNames="py-8 lg:py-12">
        <Link href="/">
          <div className={`inline-flex gap-1.5 text-lg`}>
            <BrandLogo />
          </div>
        </Link>

        <div className="mt-6">
          <p className="max-w-md leading-relaxed text-gray-600">
            Open source Uniswap v4 hooks. Community-contributed hooks directory.
          </p>

          <div className="mt-4 lg:flex lg:items-end lg:justify-between">
            <ul className="flex gap-4">
              {marketingConfig.footerLinks.map((menuLink) => (
                <li key={menuLink.href}>
                  <Link href={menuLink.href}>
                    <div className="block text-sm font-medium text-gray-900 hover:opacity-75">
                      {menuLink.title}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-sm text-gray-600 lg:mt-0">
              Created by{" "}
              <Link
                href={siteConfig.links.twitter}
                rel="noreferrer"
                target="_blank"
                className="inline-block font-medium text-gray-700 hover:text-gray-900"
              >
                Aiden
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
