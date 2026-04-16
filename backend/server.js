const express = require("express");

const app = express();

// Root route
app.get("/", (req, res) => {
  res.send("LK MindLink Server Running");
});

// Catch-all
app.get("*", (req, res) => {
  res.send("Route not found");
});

// IMPORTANT: Render requires this
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});