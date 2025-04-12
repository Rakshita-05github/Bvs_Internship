import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/form_db";

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

export async function connect() {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
