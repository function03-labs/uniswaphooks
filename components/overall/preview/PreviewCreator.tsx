export default function PreviewCreator({
  creatorGithub,
}: {
  creatorGithub: string;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        Created by{" "}
        <a
          href={`#`}
          target="_blank"
          rel="noreferrer"
          className="underline transition hover:text-gray-600"
        >
          {creatorGithub}
        </a>
      </p>
    </div>
  );
}
