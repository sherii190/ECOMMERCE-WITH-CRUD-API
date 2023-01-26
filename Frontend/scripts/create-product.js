// Get the form element
let form = document.querySelector("#create-product-form");

// Add a submit event listener to the form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the form data
  let title = form.querySelector("#title").value;
  let description = form.querySelector("#description").value;
  let price = form.querySelector("#price").value;
  let stock = form.querySelector("#stock").value;
  let category = form.querySelector("#category").value;

  price = Number(price);
  stock = Number(stock);

  let token = document.cookie.split("=")[1];
  token = token.split(";")[0];

  if (!token) {
    window.location.href = "http://localhost:5000/login";
  } 


  // Send a POST request to the server to create a new product
  const POST_PRODUCT_URL = "http://localhost:5000/product/add";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, price, stock, category }),
  };
  console.log(options.body);
  //   log the data type of price and stock

  fetch(POST_PRODUCT_URL, options)
    .then((response) => response.json())
    .then(() => window.location.replace("manage-products.html"))
    .catch((error) => console.log(error));
});
