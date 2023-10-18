import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import path from "path";


import { errorHandler } from "./middlewares/errorHandler";
import { authRoutes } from "./routes/auth.routes";
import { categoryRoutes } from "./routes/categories.routes";
import { dayOfWeekRoutes } from "./routes/dayOfWeek.routes";
import { productRoutes } from "./routes/product.routes";
import { refreshRouter } from "./routes/refresh.routes";
import { fileRoutes } from "./routes/uploadFile.routes";
import { userRoutes } from "./routes/users.routes";
import { envs } from "./shared/envs";

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

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/dayofweek", dayOfWeekRoutes);
app.use("/login", authRoutes);
app.use("/refresh", refreshRouter);
app.use("/uploads", fileRoutes)

if (envs.nodeEnv === "development") {
    app.use(
        "/public/files",
        express.static(path.resolve(__dirname, "shared", "infra", "temp")),
    );
}

app.use("/public/static", express.static(path.resolve(__dirname, "public")));

export default app;
