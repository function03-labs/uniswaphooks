export function PreviewStatus({ tagType = "published" }) {
  const isPublished = tagType === "published";
  const isPending = tagType === "pending";
  const isDraft = tagType === "draft";
  const isDeclined = tagType === "declined";

  if (!isPublished && !isPending && !isDeclined && !isDraft) {
    return <></>;
  }

  return (
    <button className="block mt-1">
      <span
        className={`inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 border-gray-900 ${
          isPublished && "bg-green-700 text-green-100"
        } ${isPending && "bg-yellow-700 text-yellow-100"} ${
          isDeclined && "bg-red-700 text-red-100"
        } ${isDraft && "bg-gray-700 text-gray-100"}`}
      >
        <span className="text-xs font-medium">
          {tagType.charAt(0).toUpperCase() + tagType.slice(1)}
        </span>
      </span>
    </button>
  );
}
