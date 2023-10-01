import { createClient } from "redis";

export const redis = createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();
