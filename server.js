import { connectdb } from "./config/db.js";
import { env } from "./config/env.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authrouter from "./routes/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views')); 
server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));

const start = async () => {
  try {
    await connectdb();
    server.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
};
start();

server.use("/auth" , authrouter);