import { env } from "./env.js";
import mongoose from "mongoose";

export const connectdb = async () => {
    mongoose.connection.on("disconnect", () => {
        console.error("mongo disconnected");
    })
    await mongoose.connect(env.mongoUri, {
        serverSelectionTimeoutMs: 10000,
    });
    console.log("mongo connected");
}

