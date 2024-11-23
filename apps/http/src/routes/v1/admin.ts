import { Router } from "express";
import { adminMiddleware } from "../../middleware/admin";
import {
  CreateAvatarSchema,
  CreateElementSchema,
  CreateMapSchema,
  UpdateElementSchema,
} from "@repo/utils/zodSchema";
import client from "@repo/db/client";

export const adminRouter = Router();

// create element.
adminRouter.post("/element", adminMiddleware, async (req, res, next) => {
  const parsedData = CreateElementSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Validation failed",
    });
    return;
  }

  const element = await client.element.create({
    data: {
      width: parsedData.data.width,
      height: parsedData.data.height,
      imageUrl: parsedData.data.imageUrl,
      static: parsedData.data.static,
    },
  });

  res.status(200).json({
    message: "Element created",
    id: element.id,
  });
});

adminRouter.put(
  "/element/:elementId",
  adminMiddleware,
  async (req, res, next) => {
    const parsedData = UpdateElementSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({
        message: "Validation failed",
      });
      return;
    }
    await client.element.update({
      where: {
        id: req.params.elementId,
      },
      data: {
        imageUrl: parsedData.data.imageUrl,
      },
    });
    res.status(200).json({
      message: "Element updated",
    });
  },
);

//create avatar
adminRouter.post("/avatar", adminMiddleware, async (req, res, next) => {
  const parsedData = CreateAvatarSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Validation failed",
    });
    return;
  }
  const avatar = await client.avatar.create({
    data: {
      imageUrl: parsedData.data.imageUrl,
      name: parsedData.data.name,
    },
  });
  res.json({ avatarId: avatar.id });
});

// create map
adminRouter.post("/map", async (req, res, next) => {
  const parsedData = CreateMapSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "validation failed",
    });
    return;
  }
  const map = await client.map.create({
    data: {
      name: parsedData.data.name,
      width: parseInt(<string>parsedData.data.dimensions.split("x")[0]),
      height: parseInt(<string>parsedData.data.dimensions.split("x")[1]),
      thumbnail: parsedData.data.thumbnail,
      mapElements: {
        create: parsedData.data.defaultElements.map((e) => ({
          elementId: e.elementId,
          x: e.x,
          y: e.y,
        })),
      },
    },
  });
  res.status(200).json({
    id: map.id,
  });
});

// GET all elements.
adminRouter.get("/elements/all", async (req, res, next) => {
  try {
    const elements = await client.element.findMany({
      include: {
        mapElements: true,
      },
    });
    res.status(200).json({
      data: elements,
    });
  } catch (e) {
    res.status(400).json({
      message: "something went wrong",
      error: e,
    });
  }
});

adminRouter.get("/map/all", async (req, res, next) => {
  try {
    const response = await client.map.findMany();
    res.status(200).json({
      data: response,
    });
  } catch (e) {
    res.status(400).json({
      message: "Something went wrong",
      error: e,
    });
  }
});
