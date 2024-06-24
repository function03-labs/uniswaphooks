import { authOptions } from "@lib/auth"
import { db } from "@lib/prisma"
import { getServerSession } from "next-auth"
import * as z from "zod"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function PUT(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  const { params } = routeContextSchema.parse(context)
  const { name, email, image } = await req.json()

  if (!(await verifyCurrentUser(params.userId))) {
    return new Response(null, { status: 403 })
  }

  const user = await db.user.update({
    where: {
      id: params.userId,
    },
    data: {
      name,
      email,
      image,
    },
  })

  return new Response(JSON.stringify(user), {
    headers: {
      "content-type": "application/json",
    },
  })
}

async function verifyCurrentUser(userId: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return false
  }

  const count = await db.user.count({
    where: {
      id: userId,
    },
  })

  return count > 0
}
