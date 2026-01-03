import { z } from "zod";

export const promoSchema = z.object({
  promo: z.string().optional()
});
