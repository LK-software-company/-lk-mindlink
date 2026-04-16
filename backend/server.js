const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("LK MindLink Server Running");
});

// Handle all other routes
app.get("*", (req, res) => {
  res.send("Route not found");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started");
});