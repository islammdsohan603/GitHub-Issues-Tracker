const userInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const signInButton = document.getElementById("sign-in-button");

signInButton.addEventListener("click", () => {
  const username = userInput.value;
  const password = passwordInput.value;
  if (username === "admin" && password === "admin123") {
    window.location.href = "./home/index.html";
  } else {
    alert("Invalid username or password");
  }
});

