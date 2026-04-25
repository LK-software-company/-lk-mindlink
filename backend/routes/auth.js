app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).send("User not found");
    }

    if (user.rows[0].password !== password) {
      return res.status(400).send("Wrong password");
    }

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Login error");
  }
});