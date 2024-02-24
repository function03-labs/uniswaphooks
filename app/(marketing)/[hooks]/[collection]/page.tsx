export default function Page({ params }: { params: { collection: string } }) {
  return (
    <h1>
      Marketing Collection of
      {params.collection}!
    </h1>
  );
}
