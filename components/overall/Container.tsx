export default function Container({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) {
  return (
    <div className={`mx-auto max-w-screen-2xl px-4 ${classNames}`}>
      {children}
    </div>
  );
}
