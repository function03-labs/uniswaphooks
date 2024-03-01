import { getServerSession } from "next-auth";
import * as z from "zod";

import { db } from "@lib/prisma";
import { authOptions } from "@lib/auth";
import { hookSchema } from "@config/schema";

const routeContextSchema = z.object({
  params: z.object({
    hookId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await verifyCurrentUserHasAccessToPost(parseInt(params.hookId)))) {
      return new Response(null, { status: 403 });
    }

    await db.hook.delete({
      where: {
        id: parseInt(params.hookId),
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

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await verifyCurrentUserHasAccessToPost(parseInt(params.hookId)))) {
      return new Response(null, { status: 403 });
    }

    const json = await req.json();
    const body = hookSchema.parse(json);

    await db.hook.update({
      where: {
        id: parseInt(params.hookId),
      },
      data: {
        title: body.title,
        description: body.description,
        github: body.github,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

async function verifyCurrentUserHasAccessToPost(hookId: number) {
  const session = await getServerSession(authOptions);
  const count = await db.hook.count({
    where: {
      id: hookId,
      authorId: session?.user.id,
    },
  });

  return count > 0;
}
