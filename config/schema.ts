import * as z from "zod";

export const resourceSchema = z.object({
  emoji: z.string().optional(),
  title: z
    .string()
    .min(3, {
      message: "You need to enter a title for the resource.",
    })
    .max(100),
  section: z
    .string()
    .min(3, {
      message: "You need to select a section for the resource.",
    })
    .max(100),
  description: z
    .string()
    .min(3, {
      message: "You need to enter a description for the resource.",
    })
    .max(500),
  resourceUrl: z.string().url({
    message: "You need to enter a valid URL for the resource.",
  }),
});
