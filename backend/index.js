import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import appRouter from "./routes/app.router.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", appRouter);

// Check database connection
async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit process if DB is not connected
  }
}

app.listen(port, async () => {
  console.log(`🚀 Server is running on port: ${port}`);
  await checkDatabaseConnection();
});
