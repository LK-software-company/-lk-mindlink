const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// 🔗 CONNECT TO MONGODB
mongoose.connect("mongodb+srv://lkadmin:lksoftwarecompany053409@lk-mindlink.lbadwhb.mongodb.net/lk_mindlink_db?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("Mongo Error:", err));

// 👤 USER SCHEMA
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", UserSchema);

// 📝 REGISTER
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send("User already exists");
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.send("User registered");
  } catch (err) {
    res.send("Error registering user");
  }
});

// 🔐 LOGIN
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (user) {
      res.send("Login successful");
    } else {
      res.send("Invalid credentials");
    }
  } catch (err) {
    res.send("Error logging in");
  }
});

// 🌐 TEST
app.get("/", (req, res) => {
  res.send("LK MindLink Server Running");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
const PostSchema = new mongoose.Schema({
  username: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", PostSchema);
app.post("/posts", async (req, res) => {
  const { username, text } = req.body;

  try {
    const newPost = new Post({ username, text });
    await newPost.save();
    res.send("Post created");
  } catch (err) {
    res.send("Error creating post");
  }
});app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.send("Error fetching posts");
  }
});