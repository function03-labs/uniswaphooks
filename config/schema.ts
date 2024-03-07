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
  status: z.string().optional(),
});

export const userAuthSchema = z.object({
  email: z.string().email(),
});

export const hookSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2),
  github: z.string().url(),
  website: z.string().optional(),
  status: z.string().optional(),
  categoryId: z.string().optional(),
});

export const hookEditSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2).max(50),
  description: z.string().min(2),
  github: z.string().url(),
  creator: z.string(),
  website: z.string().optional(),
  status: z.string().optional(),
  userId: z.string(),

  categoryId: z.string().optional(),

  networkId: z.string().optional().nullable(),
  network: z
    .object({
      id: z.string(),
      name: z.string(),
      imageUrl: z.string(),
      verified: z.boolean(),
    })
    .optional()
    .nullable(),

  contractId: z.string().optional().nullable(),
  contract: z
    .object({
      id: z.string(),
      deploymentAddress: z.string(),
      contractName: z.string(),
      compilerVersion: z.string(),
      creator: z.string(),
      transactionHash: z.string(),
    })
    .optional()
    .nullable(),

  deploymentDateId: z.string().optional().nullable(),
  deploymentDate: z
    .object({
      id: z.string(),
      date: z.string(),
      datetime: z.string(),
    })
    .optional()
    .nullable(),

  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const deployHookSchema = z.object({
  deploymentAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  network: z.string().min(1),
});

export const userSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email(),
});
