const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// ─── MIDDLEWARE ───────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── DATABASE CONNECTION ──────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ─── USER SCHEMA ──────────────────────────────────────────
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// ─── REGISTER ─────────────────────────────────────────────
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).send('Username and password are required');

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).send('Username already taken');

    await User.create({ username, password });
    res.status(201).send('Account created');

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// ─── LOGIN ────────────────────────────────────────────────
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).send('Username and password are required');

    const user = await User.findOne({ username, password });
    if (!user)
      return res.status(401).send('Invalid username or password');

    res.status(200).send('Login successful');

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// ─── START SERVER ─────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));