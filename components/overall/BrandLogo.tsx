import { Logo } from "@component/overall/Icons";

export default function BrandLogo({ fontSize = "text-md" }) {
  return (
    <div className={`inline-flex gap-1.5 ${fontSize}`}>
      <span aria-hidden="true" role="img">
        <Logo className="h-8 w-8" />
      </span>
      <span className="font-medium text-gray-900 mt-[6px]">UniswapHooks</span>
    </div>
  );
}
