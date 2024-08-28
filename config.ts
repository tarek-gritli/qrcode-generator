import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT =
  NODE_ENV === "production" ? 8080 : parseInt(process.env.PORT || "3000", 10);
export const FILE_SERVER_URL =
  NODE_ENV === "production"
    ? process.env.FILE_SERVER_URL
    : "http://localhost:3000";
export const FILEBASE_BUCKET = process.env.FILEBASE_BUCKET || "";
const FILEBASE_ACCESS_KEY = process.env.FILEBASE_ACCESS_KEY || "";
const FILEBASE_SECRET_KEY = process.env.FILEBASE_SECRET_KEY || "";
const FILEBASE_REGION = process.env.FILEBASE_REGION || "";

export const s3 = new S3Client({
  region: FILEBASE_REGION,
  endpoint: "https://s3.filebase.com",
  credentials: {
    accessKeyId: FILEBASE_ACCESS_KEY,
    secretAccessKey: FILEBASE_SECRET_KEY,
  },
});
