import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().min(1).max(65535).default(3333),
  // DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);