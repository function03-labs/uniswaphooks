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
      website,
      network,
      contract,
      deploymentDate,
    } = await req.json();

    if (!(await verifyCurrentUserHasAccessToPost(params.hookId))) {
      return new Response(null, { status: 403 });
    }

    await db.hook.update({
      where: {
        id: params.hookId,
      },
      data: {
        title,
        description,
        github,
        creator,
        status: "pending",
        website,
        network: {
          create: {
            name: network.name,
            imageUrl: network.imageUrl,
            verified: network.verified,
          },
        },
        contract: {
          create: {
            contractName: contract.name,
            compilerVersion: contract.compilerVersion,
            creator: contract.creator,
            transactionHash: contract.transactionHash,
          },
        },
        deploymentDate: {
          create: {
            date: deploymentDate.date,
            dateTime: deploymentDate.dateTime,
          },
        },
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.log(error);
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
      // @ts-ignore: id is not undefined
      userId: session.user!.id,
    },
  });

  return count > 0;
}
