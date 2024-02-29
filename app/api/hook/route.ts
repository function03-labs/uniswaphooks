import { db } from "@lib/prisma";

export async function POST(req: Request) {
  try {
    const bodyAsString = await req.json();
    const body = JSON.parse(bodyAsString);
    let { title, description, creator, website, github, categoryId } = body;

    if (!categoryId || categoryId === "") {
      categoryId = "from-the-community";
    }

    const newHook = await db.hook.create({
      data: {
        title,
        description,
        creator,
        website,
        github,
        category: {
          connect: {
            id: categoryId,
          },
        },
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
      website,
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
        website,
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
