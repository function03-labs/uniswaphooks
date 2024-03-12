import * as z from "zod";
import { getServerSession } from "next-auth";

import { db } from "@lib/prisma";
import { authOptions } from "@lib/auth";

const routeContextSchema = z.object({
  params: z.object({
    hookId: z.string(),
  }),
});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const hook = await db.hook.findUnique({
      where: {
        id: params.hookId,
      },
      include: {
        network: true,
        contract: true,
        deploymentDate: true,
      },
    });

    if (!hook) {
      return new Response(null, { status: 404 });
    }

    return new Response(JSON.stringify(hook), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await verifyCurrentUserHasAccessToPost(params.hookId))) {
      return new Response(null, { status: 403 });
    }

    await db.hook.delete({
      where: {
        id: params.hookId,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const {
      title,
      description,
      github,
      creator,
      categoryId,
      network,
      status,
      contract,
      deploymentDate,
    } = await req.json();

    if (!(await verifyCurrentUserHasAccessToPost(params.hookId))) {
      return new Response(null, { status: 403 });
    }

    await db.hook.update({
      where: { id: params.hookId },
      data: {
        title,
        description,
        github,
        creator,
        status,
        ...(categoryId ? { category: { connect: { id: categoryId } } } : {}),
        ...(network
          ? {
              network: {
                create: network,
              },
            }
          : {}),
        ...(contract
          ? {
              contract: {
                create: contract,
              },
            }
          : {}),
        ...(deploymentDate
          ? {
              deploymentDate: {
                create: deploymentDate,
              },
            }
          : {}),
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.log("Error", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

async function verifyCurrentUserHasAccessToPost(hookId: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return false;
  }

  const count = await db.hook.count({
    where: {
      id: hookId,
      userId: session.user.id,
    },
  });

  return count > 0 || session.user.role === "admin";
}
