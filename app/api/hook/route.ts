import { db } from "@lib/prisma";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { title, description, creator, github, website, categoryId } = body;

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

    if (!categoryId || categoryId === "") {
      categoryId = "from-the-community";
    }

    const newHook = await db.hook.create({
      data: {
        title,
        description,
        creator,
        github,
        website,
        // @ts-ignore: Unreachable code error
        userId: session.user.id,
        categoryId,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Hook created successfully",
        data: newHook,
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
    const hooks = await db.hook.findMany({
      include: {
        category: true,
        user: true,
      },
    });
    return new Response(
      JSON.stringify({
        message: "Hooks fetched successfully",
        data: hooks,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err: any) {
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
      title,
      description,
      creator,
      github,
      status,
      categoryId,
    } = body;

    const updatedHook = await db.hook.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        creator,
        github,
        status,
        categoryId,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Hook updated successfully",
        data: updatedHook,
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

    const deletedHook = await db.hook.delete({
      where: {
        id,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Hook deleted successfully",
        data: deletedHook,
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
