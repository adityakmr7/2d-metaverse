import { Router } from "express";
import { userRouter } from "./user";
import { adminRouter } from "./admin";
import { spaceRouter } from "./space";
import { SigninSchema, SignupSchema } from "@repo/utils/zodSchema";
import client from "@repo/db/client";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "@repo/utils/config";
import { compare, hash } from "../../scrypt";

export const router = Router();

router.post("/signup", async (req, res, next) => {
  const parsedData = SignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Validation failed",
      error: parsedData.error,
    });
    return;
  }
  const hashedPassword = await hash(parsedData?.data.password);
  try {
    const user = await client.user.create({
      data: {
        username: parsedData.data.username,
        password: hashedPassword,
        role: parsedData.data.type === "admin" ? "Admin" : "User",
      },
    });
    res.status(200).json({
      userId: user.id,
    });
  } catch (e) {
    res.status(400).json({
      message: "User already exist",
    });
  }
});

router.post("/signin", async (req, res, next) => {
  const parseData = SigninSchema.safeParse(req.body);
  if (!parseData.success) {
    res.status(403).json({
      message: "Validation failed",
    });
    return;
  }
  try {
    const user = await client.user.findUnique({
      where: {
        username: parseData.data.username,
      },
    });
    if (!user) {
      res.status(403).json({
        message: "User not found",
      });
      return;
    }
    const isValid = await compare(parseData.data.password, user.password);
    if (!isValid) {
      res.status(403).json({ message: "Invalid password" });
      return;
    }
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      JWT_PASSWORD,
    );
    res.status(200).json({
      token: token,
      user: {
        userId: user.id,
        username: user.username,
      },
    });
  } catch (e) {
    res.status(400).json({
      message: "Internal server error",
    });
  }
});

router.get("/elements", async (req, res) => {
  const elements = await client.element.findMany();
  res.json({
    elements: elements.map((e) => ({
      id: e.id,
      imageUrl: e.imageUrl,
      width: e.width,
      height: e.height,
      static: e.static,
    })),
  });
});

router.get("/avatars", async (req, res) => {
  const avatars = await client.avatar.findMany();
  res.json({
    avatars: avatars.map((x) => ({
      id: x.id,
      imageUrl: x.imageUrl,
      name: x.name,
    })),
  });
});

router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/space", spaceRouter);
