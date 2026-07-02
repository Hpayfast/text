async function signup() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const status = document.getElementById("status");

  if (username === "" || password === "") {
    status.innerText = "Please enter username and password";
    return;
  }

  try {
    const { data: userCheck, error: checkError } = await supabase
      .from("users")
      .select("username")
      .eq("username", username);

    if (checkError) {
      status.innerText = checkError.message;
      return;
    }

    if (userCheck.length > 0) {
      status.innerText = "Username already exists";
      return;
    }

    const { error } = await supabase.from("users").insert({
      id: crypto.randomUUID(),
      username: username,
      password: password
    });

    if (error) {
      status.innerText = error.message;
    } else {
      status.innerText = "Signup Successful";
    }

  } catch (err) {
    status.innerText = err.message;
  }
}

function login() {
  document.getElementById("status").innerText =
    "Login function will be added in next step";
}