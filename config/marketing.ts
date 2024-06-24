import { MarketingConfig } from "@/types"

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: "Chains",
      href: "/chains",
    },
    {
      title: "Community",
      href: "/community",
      active: true,
    },
    {
      title: "Tool",
      href: "/tool",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ],
  footerLinks: [
    {
      title: "FAQs",
      href: "/about/faqs",
    },
    {
      title: "Acknowledgements",
      href: "/about/acknowledgements",
    },
  ],
}
