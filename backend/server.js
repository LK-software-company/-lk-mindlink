const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// 🔗 CONNECT TO MONGODB
mongoose.connect("mongodb+srv://lkadmin:lksoftwarecompany053409@lk-mindlink.lbadwhb.mongodb.net/lk_mindlink_db?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 👤 USER MODEL
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// 📝 REGISTER
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({ username, password });
  await newUser.save();

  res.send("User registered");
});

// 🔐 LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (user) {
    res.send("Login successful");
  } else {
    res.send("Invalid credentials");
  }
});

// TEST
app.get("/", (req, res) => {
  res.send("LK MindLink Server Running");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});