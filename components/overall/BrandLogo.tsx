import Image from "next/image"

export function BrandLogo({ fontSize = "text-md" }) {
  return (
    <div className={`inline-flex ${fontSize}`}>
      <Image
        src="/uniswap-hooks-text.png"
        alt="Uniswap Hooks"
        className="mt-1 h-8 w-auto"
        width={3964}
        height={749}
      />
    </div>
  )
}
