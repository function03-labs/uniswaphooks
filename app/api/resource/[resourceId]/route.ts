export async function POST(req: Request) {
  return new Response(
    JSON.stringify({
      message: "Resource created successfully",
      data: {},
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
