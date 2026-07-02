async function signup() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        document.getElementById("status").innerText = "Enter username and password";
        return;
    }

    const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single();

    if (existingUser) {
        document.getElementById("status").innerText = "Username already exists";
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
        document.getElementById("status").innerText = error.message;
    } else {
        document.getElementById("status").innerText = "Signup Successful";
    }
}