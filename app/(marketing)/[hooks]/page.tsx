export default function Page({ params }: { params: { hooks: string } }) {
  return (
    <h1>
      Marketing Hooks of
      {params.hooks}!
    </h1>
  );
}
