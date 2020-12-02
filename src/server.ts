import bodyParser from "body-parser";
import express, { Request, Response } from "express";

import connectDB from "../config/database";
import auth from "./routes/api/auth";
import user from "./routes/api/user";

import { getIcon } from "./utils";

const app = express();

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test API
// @access  Public
app.get("/", (_req: Request, res: Response) => {
  res.json({ msg: "Hello" });
});

// @route   GET /
// @desc    Test Base64 API
// @access  Public
app.get("/api/id/:w", (req: Request, res: Response) => {
  try {
    var img = getIcon(req.params.w); // example function that returns an arrayBuffer
    var data = Buffer.from(img).toString("base64");

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": data.length,
    });
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

app.use("/api/auth", auth);
app.use("/api/user", user);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
