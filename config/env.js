import dotenv from "dotenv";

dotenv.config();

const required = ["MONGO_URI",  "JWT_SECRET"];
const missing = required.filter((key) => !process.env[key]);

// Fail fast: better to crash at start than fail mysteriously later
if (missing.length > 0) {
  throw new Error(`Missing env variables: ${missing.join(", ")}`);
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 8080,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
};