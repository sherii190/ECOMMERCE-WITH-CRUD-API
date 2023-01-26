const categories = {
  1: "Electronics",
   2: "Books",
   3: "Clothing",
   4: "Furniture",
 }
 
 let token = document.cookie.split("=")[1];
 token = token.split(";")[0];
 
 if (!token) {
   window.location.href = "http://localhost:5000/login";
 } 
 
 
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
 
 const displayProducts = async () => {
   const products = await getProducts();
   products.forEach((product) => {
     let row = document.createElement("tr");
     //format the date
     let date = new Date(product.date);
     let formattedDate = `${date.getDate()}/${
       date.getMonth() + 1
     }/${date.getFullYear()}`;
 
     row.innerHTML = `
             <td>${product.title}</td>
             <td>$${product.price}</td>
             <td>${product.stock} units</td>
             <td>${formattedDate}</td>
             <td>${categories[product.category[0]]}</td>
             <td>
               <a href="update-product.html?id=${product._id}" class="btn btn-primary">Edit</a>
               <button class="btn btn-danger " onclick="deleteProduct('${product._id}')">Delete</button>
             </td>
           `;
     document.querySelector("tbody").appendChild(row);
   });
 };
 
 const deleteProduct = (id) => {
   const DELETE_PRODUCT_URL = `http://localhost:5000/product/${id}`;
   const options = {
     method: "DELETE",
     headers: {
       "Content-Type": "application/json",
       "Authorization": `Bearer ${token}`,
     },
   };
   fetch(DELETE_PRODUCT_URL, options)
     .then((response) => response.json())
     .then((data) => {
       console.log(data);
       location.reload();
     });
 };
 
 displayProducts();
 