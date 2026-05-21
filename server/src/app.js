import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

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

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

export default app;