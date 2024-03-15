import * as z from "zod";
import { getServerSession } from "next-auth";

import { db } from "@lib/prisma";
import { authOptions } from "@lib/auth";

const routeContextSchema = z.object({
  params: z.object({
    resourceId: z.string(),
  }),
});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const resource = await db.resource.findUnique({
      where: {
        id: params.resourceId,
      },
    });

    if (!resource) {
      return new Response(null, { status: 404 });
    }

    return new Response(JSON.stringify(resource), {
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

    if (!(await verifyCurrentUserHasAccessToPost(params.resourceId))) {
      return new Response(null, { status: 403 });
    }

    await db.resource.delete({
      where: {
        id: params.resourceId,
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
    const { title, description, section, status, resourceUrl, emoji } =
      await req.json();

    if (!(await verifyCurrentUserHasAccessToPost(params.resourceId))) {
      return new Response(null, { status: 403 });
    }

    await db.resource.update({
      where: {
        id: params.resourceId,
      },
      data: {
        emoji,
        title,
        description,
        section,
        status,
        resourceUrl,
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

async function verifyCurrentUserHasAccessToPost(resourceId: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return false;
  }

  const count = await db.resource.count({
    where: {
      id: resourceId,
      userId: session.user.id,
    },
  });

  return count > 0 || session.user.role === "admin";
}
