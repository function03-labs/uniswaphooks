import { db } from "@lib/prisma";

export async function POST(req: Request) {
  try {
    const bodyAsString = await req.json();
    const body = JSON.parse(bodyAsString);
    const { emoji, title, section, description, resourceUrl } = body;

    const newResource = await db.resource.create({
      data: {
        emoji,
        title,
        section,
        description,
        resourceUrl,
        // @ts-ignore: Unreachable code error
        userId: session.user.id,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Resource created successfully",
        data: newResource,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err: any) {
    console.log(err);
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
        error: err.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function GET() {
  try {
    const resources = await db.resource.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(
      JSON.stringify({
        message: "Resources fetched successfully",
        data: resources,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err: any) {
    console.log(err);
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
        error: err.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const bodyAsString = await req.json();
    const body = JSON.parse(bodyAsString);
    const {
      id,
      emoji,
      title,
      section,
      description,
      resourceUrl,
      status,
    } = body;

    const updatedResource = await db.resource.update({
      where: {
        id,
      },
      data: {
        emoji,
        title,
        section,
        description,
        resourceUrl,
        status,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Resource updated successfully",
        data: updatedResource,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err: any) {
    console.log(err);
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
        error: err.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const bodyAsString = await req.json();
    const body = JSON.parse(bodyAsString);
    const { id } = body;

    const deletedResource = await db.resource.delete({
      where: {
        id,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Resource deleted successfully",
        data: deletedResource,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err: any) {
    console.log(err);
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
        error: err.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
