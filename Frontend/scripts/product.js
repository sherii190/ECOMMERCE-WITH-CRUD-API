const categories = {
  1: "Chips",
  2: "Candy",
  3: "Drinks",
  4: "Nuts",
};

const body = document.getElementsByClassName("container-flush")[0];
let token = document.cookie.split("token=")[1];
token = token.split(";")[0];

if (!token) {
  window.location.href = "http://localhost:5000/login";
}

const urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");
const GET_PRODUCTS_URL = "http://localhost:5000/product/" + id;
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

// print detials of the product
const getProducts = async () => {
  const response = await fetch(GET_PRODUCTS_URL, options);
  const products = await response.json();
  return products;
};

const displayProduct = async () => {
  const products = await getProducts();
  body.innerHTML = `
  <img class="img" src="${products.image}" class="card-img-top" alt="...">
                <h2>${products.title}</h2>
                <p style="width:40vw; text-align: center;">${products.description}</p>
                <p>Price: $${products.price}</p>
                <p>Stock: ${products.stock} units</p>
                <p>Category: ${categories[products.category[0]]}</p><br>
                <a href="admin/update-product.html?id=${
                  products._id
                }" class="btn btn-primary">Update Product</a>
                <a href="products.html" class="btn btn-secondary">Back</a>`;
};

displayProduct();
