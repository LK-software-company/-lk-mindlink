// LOGIN FUNCTION
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    document.getElementById("result").innerText = "Fill all fields";
    document.getElementById("result").style.color = "red";
    return;
  }

  try {
    const res = await fetch(URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const result = await res.text();
    document.getElementById("result").innerText = result;

    if (res.ok) {  // ✅ Check HTTP status instead of text
      document.getElementById("result").style.color = "green";
      localStorage.setItem("user", username);
      window.location.href = "world.html";
    } else {
      document.getElementById("result").style.color = "red";
    }
  } catch (err) {
    document.getElementById("result").innerText = "Server error. Try again.";
    document.getElementById("result").style.color = "red";
  }
}

// REGISTER FUNCTION
async function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    document.getElementById("result").innerText = "Fill all fields";
    document.getElementById("result").style.color = "red";
    return;
  }

  try {
    const res = await fetch(URL + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const result = await res.text();
    document.getElementById("result").innerText = result;

    if (res.ok) {  // ✅ Auto-login after register
      document.getElementById("result").style.color = "green";
      localStorage.setItem("user", username);
      window.location.href = "world.html";  // ✅ Now redirects!
    } else {
      document.getElementById("result").style.color = "red";
    }
  } catch (err) {
    document.getElementById("result").innerText = "Server error. Try again.";
    document.getElementById("result").style.color = "red";
  }
}