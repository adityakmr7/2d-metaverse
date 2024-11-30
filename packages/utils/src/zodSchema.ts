import { z } from "zod";

export const SignupSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
  type: z.enum(["user", "admin"]),
});

export const SigninSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});

export const UpdateMetadataSchema = z.object({
  avatarId: z.string(),
});

export const CreateSpaceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dimensions: z
    .string()
    .regex(/^[0-9]{1,4}x[0-9]{1,4}$/, "Invalid dimensions format"),
  mapId: z.string().optional(),
  thumbnail: z.string().optional(),
});

export const AddElementSchema = z.object({
  spaceId: z.string(),
  elementId: z.string(),
  x: z.number(),
  y: z.number(),
});

export const CreateElementSchema = z.object({
  imageUrl: z.string().url("Invalid URL"),
  width: z.number().min(1, "Width must be at least 1"),
  height: z.number().min(1, "Height must be at least 1"),
  static: z.boolean(),
});

export const UpdateElementSchema = z.object({
  imageUrl: z.string(),
});

export const CreateAvatarSchema = z.object({
  name: z.string(),
  imageUrl: z.string(),
});

export const CreateMapSchema = z.object({
  thumbnail: z.string().url("Invalid URL"),
  dimensions: z
    .string()
    .regex(/^[0-9]{1,4}x[0-9]{1,4}$/, "Invalid dimensions format"),
  name: z.string().min(1, "Name is required"),
  defaultElements: z.array(
    z.object({
      elementId: z.string().min(1, "Element ID is required"),
      x: z.number().min(0, "X must be at least 0"),
      y: z.number().min(0, "Y must be at least 0"),
    }),
  ),
});

export const DeleteElementSchema = z.object({
  id: z.string(),
});
