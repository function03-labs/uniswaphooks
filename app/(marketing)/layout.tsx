import { redirect } from "next/navigation";
import { getCurrentUser } from "@lib/session";

import Header from "@component/navigation/Header";
import Footer from "@component/navigation/Footer";

// import HeaderBanner from "@component/section/HeaderBanner";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} />
      {/* <HeaderBanner /> */}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
