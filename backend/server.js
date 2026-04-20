require('dotenv').config(); // ✅ ADD THIS FIRST

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ─── MIDDLEWARE ─────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── DATABASE ───────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// ─── USER MODEL ─────────────────────────────────────────
const User = mongoose.model("User", new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}));

// ─── POST MODEL ─────────────────────────────────────────
const Post = mongoose.model("Post", new mongoose.Schema({
  username: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
}));

// ─── HEALTH CHECK ───────────────────────────────────────
app.get("/", (req, res) => {
  res.send("LK MindLink Server Running");
});

// ─── REGISTER ───────────────────────────────────────────
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).send("Username and password are required.");

    if (password.length < 6)
      return res.status(400).send("Password must be at least 6 characters.");

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).send("Username already taken.");

    await User.create({ username, password });

    res.status(201).send("Account created");
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).send("Server error");
  }
});

// ─── LOGIN ──────────────────────────────────────────────
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).send("Username and password are required.");

    const user = await User.findOne({ username, password });
    if (!user)
      return res.status(401).send("Invalid username or password.");

    res.status(200).send("Login successful");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error");
  }
});

// ─── CREATE POST ────────────────────────────────────────
app.post("/posts", async (req, res) => {
  try {
    const { username, text } = req.body;

    if (!text)
      return res.status(400).send("Post cannot be empty");

    const newPost = new Post({ username, text });
    await newPost.save();

    res.send("Post created");
  } catch (err) {
    console.error("Post error:", err);
    res.status(500).send("Error creating post");
  }
});

// ─── GET POSTS ──────────────────────────────────────────
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).send("Error fetching posts");
  }
});

// ─── START SERVER ───────────────────────────────────────
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});