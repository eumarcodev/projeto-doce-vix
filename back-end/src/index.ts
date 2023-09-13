import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import path from "path";
import { envs } from "./shared/envs";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.get("/", (req, res) => {
    res.json({
        timestamp: new Date(),
    });
});

if (envs.nodeEnv === "development") {
    app.use(
        "/public/files",
        express.static(path.resolve(__dirname, "shared", "infra", "temp")),
    );
}

app.use("/public/static", express.static(path.resolve(__dirname, "public")));

export default app;

