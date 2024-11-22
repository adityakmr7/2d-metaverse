import { Router } from "express";
import { UpdateMetadataSchema } from "@repo/utils/zodSchema";
import { userMiddleware } from "../../middleware/user";
import client from "@repo/db/client";

export const userRouter = Router();

userRouter.post("/metadata", userMiddleware, async (req, res, next) => {
  const parsedData = UpdateMetadataSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Validation error",
    });
    return;
  }
  try {
    const user = await client.user.update({
      where: {
        id: req.userId,
      },
      data: {
        avatarId: parsedData.data.avatarId,
      },
    });
    res.status(200).json({
      message: "Meta data Updated",
    });
  } catch (e) {
    res.status(400).json({
      message: "Internal server error",
    });
  }
});

userRouter.get("/metadata/bulk", async (req, res, next) => {
  const userIdString = (req.query.ids ?? "[]") as string;
  const userIds = userIdString.slice(1, userIdString?.length - 1).split(",");
  const metadata = await client.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
    select: {
      avatar: true,
      id: true,
    },
  });
  res.json({
    avatars: metadata.map((m) => ({
      userId: m.id,
      avatarId: m.avatar?.imageUrl,
    })),
  });
});
