import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import errorMiddleware from "./middleware/error.middleware.js";
import notFoundMiddleware from "./middleware/notFound.middleware.js";

import orderRoutes from "./routes/order.route.js";
import archiveRoutes from "./routes/archive.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use(express.urlencoded({ 
  extended: true
}));

// Health check endpoint
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is running successfully"
  });
});

app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1", archiveRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;