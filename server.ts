import express from "express";
import cors from "cors";
import { NODE_ENV, FILEBASE_BUCKET, FILE_SERVER_URL, PORT, s3 } from "./config";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import * as qrcode from "qrcode";
import { v4 as uuid } from "uuid";
import fs from "fs";
import path from "path";
import rateLimit from "express-rate-limit";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/bucket", express.static(path.join(__dirname, "bucket")));

app.get("/", (req, res) => res.send({ environment: NODE_ENV }));

const uploadLimiter = rateLimit({
  windowMs: 1000 * 60 * 15, //15 minutes,
  limit: 20, //20 requests per 15 minutes
  message: "Too many requests, please try again later.",
});

app.post("/generate-qrcode", uploadLimiter, async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Generate the QR code as a Buffer
    const qrCodeBuffer = await qrcode.toBuffer(url);

    // Define the file name and path for the QR code image
    const fileName = `${uuid()}.png`;

    if (NODE_ENV === "development") {
      const localFilePath = path.join(__dirname, "bucket", fileName);

      fs.mkdirSync(path.dirname(localFilePath), { recursive: true });

      fs.writeFileSync(localFilePath, qrCodeBuffer);

      const qrCodeUrl = `${FILE_SERVER_URL}/bucket/${fileName}`;
      return res.json({ data: { qrCodeUrl } });
    } else {
      // Upload the QR code buffer to S3

      const commandPutObject = new PutObjectCommand({
        Bucket: FILEBASE_BUCKET,
        Key: fileName,
        Body: qrCodeBuffer,
        ContentType: "image/png",
      });
      await s3.send(commandPutObject);

      const commandGetObject = new GetObjectCommand({
        Bucket: FILEBASE_BUCKET,
        Key: fileName,
      });
      const response = await s3.send(commandGetObject);
      // Respond with the URL to access the QR code
      const qrCodeUrl = `${FILE_SERVER_URL}/${response.Metadata?.cid}`;

      return res.json({ data: { qrCodeUrl } });
    }
  } catch (error) {
    console.error("Error generating or uploading QR code:", error);
    return res
      .status(500)
      .json({ error: "Failed to generate or upload QR code" });
  }
});

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
