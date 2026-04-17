const express = require("express");

const app = express();

app.use(express.json()); // IMPORTANT for handling data

// Temporary storage (we'll use database later)
let users = [];

// Register
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  users.push({ username, password });

  res.send("User registered");
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.send("Login successful");
  } else {
    res.send("Invalid credentials");
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("LK MindLink Server Running");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});