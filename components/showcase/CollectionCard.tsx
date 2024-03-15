import Link from "next/link";
import CardTag from "@component/ui/CardTag";

export default function CollectionCard({
  componentData,
}: {
  componentData: {
    id: string;
    title: string;
    description: string;
    emoji: string;
    category: string;
    tag: string;
    count: number;
  };
}) {
  const hasTag = !!componentData.tag;
  return (
    <>
      {componentData.category === "hooks" && (
        <Link href={`/hooks/collection/${componentData.id}`}>
          <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
            <div className="rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 group-hover:-translate-x-2">
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <span
                    aria-hidden="true"
                    role="img"
                    className="text-lg sm:text-xl"
                  >
                    {componentData.emoji}
                  </span>

                  {hasTag && <CardTag tagType={componentData.tag} />}
                </div>

                <h2 className="mt-4 font-medium text-gray-900 sm:text-lg">
                  {componentData.title}
                </h2>

                <p className="mt-1 text-xs text-gray-700">
                  {componentData.count}{" "}
                  {componentData.count > 1 ? "Hooks" : "Hook"}
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}

      {componentData.category === "articles" && (
        <Link href={`/${componentData.id}`}>
          <div className="group relative block h-full bg-white before:absolute before:inset-0 hover:rounded-lg hover:border-2 hover:border-dashed hover:border-gray-900">
            <div className="animate-background rounded-md bg-gradient-to-r from-green-500 via-amber-800 to-lime-500 bg-[length:200%_200%] p-[2px] transition [animation-duration:_2s] group-hover:-translate-y-2 group-hover:-translate-x-2 md:block">
              <div className="rounded-md bg-white p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <span
                    aria-hidden="true"
                    role="img"
                    className="text-lg sm:text-xl"
                  >
                    {componentData.emoji}
                  </span>

                  {hasTag && <CardTag tagType={componentData.tag} />}
                </div>

                <h2 className="mt-4 font-medium text-gray-900 sm:text-lg">
                  {componentData.title}
                </h2>

                <p className="mt-1 text-xs text-gray-700">
                  {componentData.description}
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
