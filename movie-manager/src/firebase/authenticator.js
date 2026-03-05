export const validateLogin = (username, password) => {

  // Google login shortcut
  if (username === "google") {
    return { Login: true, message: "Login successful" };
  }

  // check if both username and password are met
  if (!username || !password) {
    return { Login: false, message: "Please enter a valid username and password." };
  }

  if (typeof username !== "string" || username.length < 5 || username.length > 30) {
    return { Login: false, message: "Username must be 5 characters." };
  }

  if (typeof password !== "string" || password.length < 5) {
    return { Login: false, message: "Password must be at least 5 characters." };
  }


  return { Login: true, message: "Login successful." };
};