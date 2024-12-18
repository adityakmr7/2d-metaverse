import express from "express";
import { router } from "./routes/v1";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`HTTP on ${PORT}`);
});
