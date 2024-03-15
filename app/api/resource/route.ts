import { db } from "@lib/prisma";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { emoji, title, section, description, resourceUrl } = body;

    const session = await getServerSession(authOptions);


    if (!session || !session.user) {
      return new Response(
        JSON.stringify({
          message: "You are not authorized to perform this action",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const newResource = await db.resource.create({
      data: {
        emoji,
        title,
        section,
        description,
        resourceUrl,
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
    const body = await req.json();
    const { id, emoji, title, section, description, resourceUrl, status } =
      body;

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
    const body = await req.json();
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
