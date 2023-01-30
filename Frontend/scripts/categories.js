const body = document.querySelector("body");
const title = document.querySelector("title");
const categories = {
  Chips: "1",
  Candy: "2",
  Drinks: "3",
  Nuts: "4",
};

// get category from url
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

title.innerHTML = category;

let token = document.cookie.split("token=")[1];
token = token.split(";")[0];
let userID = document.cookie.split("userID=")[1];
userID = userID.split(";")[0];

if (!token) {
  window.location.href = "http://localhost:5000/login";
}

// Fetch products from API
const GET_PRODUCTS_URL =
  "http://localhost:5000/product/category/" + categories[category];
console.log(GET_PRODUCTS_URL);
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const getProducts = async () => {
  const response = await fetch(GET_PRODUCTS_URL, options);
  const products = await response.json();
  return products;
};

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

let productIDs = [];
// Display products
const displayProducts = async () => {
  const products = await getProducts();
  let count = 0;
  products.forEach((product) => {
    productIDs.push(product._id);
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
            <div id="products"> 
            <div class="card m-1" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5><hr/>
                    <img class="img" src="${
                      product.image
                    }" class="card-img-top" alt="...">
                    <h6 class="card-subtitle mb-2 text-muted">${getKeyByValue(
                      categories,
                      product.category.toString()
                    )}</h6><hr/>
                    <p class="card-text">${product.description}</p>
                    <a href="product.html?id=${
                      product._id
                    }" class = "details">Details</a>
                    <h5 class="card-title float-right">$${product.price}<br/>
                    <button id="product-${count++}" type="button" class="btn btn-primary float-right">Add to cart</button>
                    </h5>
                </div>
            </div> 
            </div> 
        `;
    body.appendChild(productDiv);
  });
};

function setCartButtons() {
  // Add to cart
  productIDs.forEach((productID, i) => {
    const button = document.getElementById(`product-${i}`);
    if (button) {
      button.addEventListener("click", () => {
        const ADD_CART_URL = "http://localhost:5000/users/addCart/" + userID;
        console.log(ADD_CART_URL);
        fetch(ADD_CART_URL, {
          method: "PUT",
          body: JSON.stringify({ productID }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          console.log(response.status);
          console.log(response.statusText);
        });
      });
    }
  });
}

// wait for displayProducts to finish
displayProducts().then(() => {
  setCartButtons();
});
