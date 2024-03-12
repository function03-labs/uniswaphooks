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

    const newHook = await db.hook.create({
      data: {
        title,
        description,
        creator,
        github,
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
        network: true,
        contract: true,
        deploymentDate: true,
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
