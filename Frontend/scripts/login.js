const loginButton = document.getElementById("login-button");
//stop default form submission

loginButton.addEventListener("click", login);

// Function to handle user login
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email, password);

  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        // Store the token in a cookie
        document.cookie = `token=${data.token}`;
        // Redirect to the products page
        window.location.href = "products.html";
      } else {
        alert("Invalid login credentials. Please try again.");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Invalid login credentials. Please try again.");
    });
}
