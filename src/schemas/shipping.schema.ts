import { z } from "zod";

export const shippingSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters"),
  email: z
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters"),
  city: z
    .string()
    .min(2, "City must be at least 2 characters"),
  state: z
    .string()
    .min(2, "State is required"),
  pincode: z
    .string()
    .length(6, "Pincode must be exactly 6 digits"), 
  shippingMethod: z.enum(["free"]),
});
