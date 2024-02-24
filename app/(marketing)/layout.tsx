import Header from "@component/navigation/Header";
import Footer from "@component/navigation/Footer";

import HeaderBanner from "@component/section/HeaderBanner";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeaderBanner />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
