export default function CardTag({ tagType }: { tagType: string }) {
  const isNew = tagType === "new";
  const isSoon = tagType === "soon";
  const isUpdated = tagType === "updated";
  const isCustom = tagType === "community";

  if (!isNew && !isUpdated && !isSoon && !isCustom) {
    return <></>;
  }

  return (
    <span
      className={`-me-1.5 -mt-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium capitalize sm:-me-3 sm:-mt-3 ${
        isNew && "bg-green-100 text-green-700"
      } ${isUpdated && "bg-blue-100 text-blue-700"} ${
        isSoon && "bg-yellow-100 text-yellow-700"
      } ${isCustom && "bg-lime-100 text-lime-700"}`}
    >
      {tagType}
    </span>
  );
}
