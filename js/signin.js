const loginForm = document.getElementById("login-form");
const messageEl = document.getElementById("message");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const userData = {
    email: event.target.email.value,
    password: event.target.password.value,
  };
  //console.log(userData);
  fetchLogin(userData);
});

async function fetchLogin(userData) {
  const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) messageEl.textContent = "Successful authentification!";
  else messageEl.textContent = "Authentification error!";
}
