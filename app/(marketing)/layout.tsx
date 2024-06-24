import { getCurrentUser } from "@lib/session"

import { announcement } from "@/config/site"

import { NavigationHeader } from "@/components/layout/navigation-header"
import { Footer } from "@/components/navigation/Footer"
import { Header } from "@/components/navigation/Header"
import { AnnouncementBanner } from "@/components/shared/announcement-banner"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div>
      <AnnouncementBanner {...announcement} />
      <NavigationHeader {...user!} />
      <Header user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
