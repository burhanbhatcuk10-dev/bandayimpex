import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { resources } from "./resources.js";
import { buildResourceRouter } from "./crud.js";
import authRoutes from "./routes/auth.js";
import submissionRoutes from "./routes/submissions.js";
import siteContentRoutes from "./routes/site-content.js";
import { notFound, errorHandler } from "./middleware/error.js";
import { isCloudinaryConfigured } from "./config/cloudinary.js";

dotenv.config();

export function createApp() {
  const app = express();

  app.use(cors({ origin: true }));
  app.options("*", cors({ origin: true }));
  app.use(express.json({ limit: "1mb" }));

  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      cloudinary: isCloudinaryConfigured() ? "configured" : "missing",
      resources: resources.map((r) => r.key),
    });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/submissions", submissionRoutes);
  app.use("/api/site-content", siteContentRoutes);

  for (const cfg of resources) {
    app.use(`/api/${cfg.key}`, buildResourceRouter(cfg));
  }

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
