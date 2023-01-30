const body = document.querySelector("body");
const categories = {
  1: "Chips",
  2: "Candy",
  3: "Drinks",
  4: "Nuts",
};

let token = document.cookie.split("token=")[1];
token = token.split(";")[0];
let userID = document.cookie.split("userID=")[1];
userID = userID.split(";")[0];

if (!token) {
  window.location.href = "http://localhost:5000/login";
}

const GET_PRODUCTS_URL = "http://localhost:5000/product/";
const GET_USERS_URL = "http://localhost:5000/users/" + userID;
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const fetchItems = async (url) => {
  const response = await fetch(url, options);
  const items = await response.json();
  return items;
};

const displayProducts = async () => {
  let total = 0;
  const user = await fetchItems(GET_USERS_URL);
  user["cart"].forEach((productID) => {
    console.log(productID);
    fetchItems(GET_PRODUCTS_URL + productID, options).then((product) => {
      let row = document.createElement("tr");
      total += product.price;
      console.log(total);
      document.querySelector("#total").innerHTML = total;

      row.innerHTML = `
            <td>${product.title}</td>
            <td>$${product.price}</td>
            <td>${categories[product.category[0]]}</td>
            <td>
              <button class="btn cart-btn btn-danger " onclick="removeProduct('${
                product._id
              }')">Remove</button>
            </td>
          `;
      document.querySelector("tbody").appendChild(row);
    });
  });
};

const removeProduct = (productID) => {
  const DELETE_PRODUCT_URL = `http://localhost:5000/users/removeCart/${userID}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productID }),
  };
  console.log(options.body);
  fetch(DELETE_PRODUCT_URL, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
    });
};

displayProducts();
