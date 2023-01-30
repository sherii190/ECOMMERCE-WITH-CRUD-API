// Get the form element
let form = document.querySelector("#create-product-form");

function uploadImage() {
  let formData = new FormData();
  if (document.getElementById("image-file").files[0] == undefined) {
    return false;
  }
  let imageFile = document.getElementById("image-file").files[0];
  formData.append("image", imageFile);

  try {
    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    }).then((response) => {
      console.log(response.status);
      console.log(response.statusText);
    });
  } catch (error) {
    console.log(error);
  }

  return imageFile.name;
}

// Add a submit event listener to the form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let image = uploadImage();
  if (!image) {
    image = "img/placeholder.png";
  } else {
    image = `img/` + image;
  }
  // Get the form data
  let title = form.querySelector("#title").value;
  let description = form.querySelector("#description").value;
  let price = form.querySelector("#price").value;
  let stock = form.querySelector("#stock").value;
  let category = document.getElementById("category").value;

  price = Number(price);
  stock = Number(stock);

  let token = document.cookie.split("token=")[1];
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
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, price, stock, category, image }),
  };
  fetch(POST_PRODUCT_URL, options)
    .then((response) => {
      response.json();
      console.log(response.status);
      console.log(response.statusText);
    })
    .then(() => window.location.replace("manage-products.html"))
    .catch((error) => console.log(error));
});
