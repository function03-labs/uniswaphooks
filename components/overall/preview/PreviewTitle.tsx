import Link from "next/link";

export default function PreviewTitle({
  componentTitle,
  componentId,
}: {
  componentTitle: string;
  componentId: string;
}) {
  return (
    <Link
      href={`#${componentId}`}
      className="group relative inline-flex items-start no-underline"
    >
      <span
        aria-hidden="true"
        className="hidden group-hover:opacity-25 text-xl lg:inline-block lg:-ml-4 lg:mr-2 lg:mt-0 lg:opacity-0 lg:transition"
      >
        #
      </span>
      <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
        {componentTitle}
      </h2>
    </Link>
  );
}
