import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.post("/user/:id/json", async (req, res) => {
  try {
    await redis.set(`user:${req.params.id}:json`, JSON.stringify(req.body));
    res.json({ savedAs: "json" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save user" });
  }
});

app.get("/user/:id/json", async (req, res) => {
  try {
    const raw = await redis.get(`user:${req.params.id}:json`);
    res.json({ user: raw ? JSON.parse(raw) : null });
  } catch (err) {
    res.status(500).json({ error: "Failed to get user" });
  }
});

app.post("/user/:id/hash", async (req, res) => {
  try {
    await redis.hset(`user:${req.params.id}:hash`, req.body);
    res.json({ savedAs: "hash" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save user" });
  }
});

app.get("/user/:id/hash", async (req, res) => {
  try {
    const user = await redis.hgetall(`user:${req.params.id}:hash`);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to get user" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});