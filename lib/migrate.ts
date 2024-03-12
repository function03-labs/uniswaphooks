import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import csvParser from "csv-parser";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function migrateHooks() {
  console.log("Migrating hooks...");
  const filePath = path.join(process.cwd(), "data", "Hook_rows.csv");

  const results: any[] = [];
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    console.error("You are not authorized to perform this action");
    return;
  }

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      console.log("CSV file successfully processed");

      for (const row of results) {
        console.log(`Migrating hook: ${row.title}`);
        const hook = {
          title: row.title,
          description: row.description,
          creator: row.creator,
          github: row.github,
          status: row.status,
          userId: session.user.id,
          categoryId: row.categoryId,
        };

        try {
          console.log(`Migrating hook: ${row.title}`);
          await prisma.hook.create({
            data: hook,
          });
        } catch (error) {
          console.error(`Error creating hook: ${error}`);
        }
      }
    });
}

export async function migrateResources() {
  console.log("Migrating resources...");
  const filePath = path.join(process.cwd(), "data", "Resource_rows.csv");

  const results: any[] = [];

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    console.error("You are not authorized to perform this action");
    return;
  }
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      console.log("CSV file successfully processed");

      for (const row of results) {
        const resource = {
          title: row.title,
          section: row.section,
          emoji: row.emoji,
          description: row.description,
          resourceUrl: row.resourceUrl,
          status: row.status,
          tag: row.tag,
          userId: session.user.id,
        };

        try {
          console.log(`Migrating resource: ${row.title}`);
          await prisma.resource.create({
            data: resource,
          });
        } catch (error) {
          console.error(`Error creating resource: ${error}`);
        }
      }
    });
}
