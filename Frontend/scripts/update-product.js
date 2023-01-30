// Get the form element
let form = document.querySelector("#update-product-form");

// Get the product ID from the URL
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");

let token = document.cookie.split("token=")[1];
token = token.split(";")[0];

if (!token) {
  window.location.href = "http://localhost:5000/login";
}

const GET_PRODUCT_URL = "http://localhost:5000/product/" + id;
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

function uploadImage() {
  let formData = new FormData();
  if (document.getElementById("image-file").files[0] == undefined) {
    console.log("No image selected");
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
// Fetch the product data from the server
fetch(GET_PRODUCT_URL, options)
  .then((response) => response.json())
  .then((data) => {
    // Pre-fill the form fields with the product data
    form.querySelector("#title").value = data.title;
    form.querySelector("#description").value = data.description;
    form.querySelector("#price").value = data.price;
    form.querySelector("#stock").value = data.stock;
    image = data.image;
    console.log(data.image);
  })
  .catch((error) => console.log(error));

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

  let upload = uploadImage();
  if (upload) {
    image = `img/` + upload;
    console.log(image);
  }

  PUT_PRODUCT_URL = "http://localhost:5000/product/update/" + id;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      price,
      stock,
      category,
      image,
    }),
  };
  // Send a PUT request to the server to update the product
  fetch(PUT_PRODUCT_URL, options)
    .then((response) => response.json())
    .then(() => window.location.replace("manage-products.html"))
    .catch((error) => console.log(error));
});
