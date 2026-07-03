async function signup() {

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const status = document.getElementById("status");

  if (!username || !password) {
    status.innerText = "Enter username and password";
    return;
  } 

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);

  if (user && user.length > 0) {
    status.innerText = "Username already exists";
    return;
  }

  const { error } = await supabase
    .from("users")
    .insert([
      {
        id: crypto.randomUUID(),
        username: username,
        password: password
      }
    ]);

  if (error) {
    status.innerText = error.message;
  } else {
    status.innerText = "Signup Successful";
  }

}

async function login() {

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const status = document.getElementById("status");

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("password", password);

  if (error) {
    status.innerText = error.message;
    return;
  }

  if (data.length === 0) {
    status.innerText = "Wrong username or password";
} else {
    status.innerText = "Login Successful";

    localStorage.setItem("username", username);

    window.location.href = "chat.html";
}