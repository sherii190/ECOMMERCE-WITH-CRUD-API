const categories = {
  1: "Electronics",
  2: "Books",
  3: "Clothing",
  4: "Furniture",
};

const body = document.getElementById("products");

//Get token from the cookie

let token = document.cookie.split("=")[1];
token = token.split(";")[0];

if (!token) {
  window.location.href = "http://localhost:5000/login";
} 

// Fetch products from API
const GET_PRODUCTS_URL = "http://localhost:5000/product/";
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
};

const getProducts = async () => {
  const response = await fetch(GET_PRODUCTS_URL, options);
  const products = await response.json();
  return products;
};

// Display products
const displayProducts = async () => {
  const products = await getProducts();
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
            <div class="card m-1" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${categories[product.category]}</h6>
                    <p class="card-text">${product.description}</p>
                    <a href="product.html?id=${product._id}" class = " float-left">Details</a>
                    <h5 class="card-title float-right">$${product.price}
                    </h5>
                </div>
            </div>  
        `;
    body.appendChild(productDiv);
  });
};

displayProducts();
