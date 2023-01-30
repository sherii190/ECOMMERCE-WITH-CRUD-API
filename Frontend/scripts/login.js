const loginButton = document.getElementById("login-button");
//stop default form submission
let id;

loginButton.addEventListener("click", login);

// Function to handle user login
function login() {
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  console.log(email);

  console.log("htts://localhost:5000/users/email/" + email);
  fetch("http://localhost:5000/users/email/" + email, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      id = data._id;
      console.log(id);
    });

  //add delay to allow fetch to complete
  setTimeout(() => {
    logIn();
  }, 1000);

  function logIn() {
    console.log(id);
    console.log(email, password);

    const LOGIN_URL = "http://localhost:5000/login";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    console.log(options.body);
    fetch(LOGIN_URL, options)
      .then((response) => response.json())
      .then((data) => {
        if (data["message"]) {
          alert(data["message"]);
          return;
        }
        //Delete previous cookie if exists
        document.cookie = "name=token; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        // Store the token in a cookie
        document.cookie = ` userID=${id}`;
        document.cookie = `token=${data.token}`;
        // Redirect to the products page
        // console.log(data);
        window.location.href = "products.html";
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
