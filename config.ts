import dotenv from "dotenv";
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT =
  NODE_ENV === "production" ? 8080 : parseInt(process.env.PORT || "3000", 10);
export const FILE_SERVER_URL =
  process.env.FILE_SERVER_URL || "http://localhost:3000";
export const FILEBASE_BUCKET = process.env.FILEBASE_BUCKET || "";
export const FILEBASE_ACCESS_KEY = process.env.FILEBASE_ACCESS_KEY || "";
export const FILEBASE_SECRET_KEY = process.env.FILEBASE_SECRET_KEY || "";
export const FILEBASE_REGION = process.env.FILEBASE_REGION || "";
