export default function BrandLogo({ fontSize = "text-md" }) {
  return (
    <div className={`inline-flex gap-1.5 ${fontSize}`}>
      <span aria-hidden="true" role="img">
        🚀
      </span>
      <span className="font-medium text-gray-900">UniswapHooks</span>
    </div>
  );
}
