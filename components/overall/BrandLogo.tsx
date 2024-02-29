import { Logo } from "@component/overall/Icons";
import Image from "next/image";

export default function BrandLogo({ fontSize = "text-md" }) {
  return (
    <div className={`inline-flex ${fontSize}`}>
      <Image
        src="/uniswap-hooks-text.png"
        alt="Uniswap Hooks"
        className="w-auto h-8 mt-1"
        width={3964}
        height={749}
      />
    </div>
  );
}
