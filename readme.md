# E-shop API and Client

A RESTful API using `NodeJs` and `ExpressJs` for CRUD functions.
Integration of MongoDB using `Mongoose` to store the data.
The whold app is secured using libraries like `Helmet` and `JWT`.

## Authorization using JWT

At the backend in the `server.js` there are authentication functions which takes `email` and `password` from the user then matches it from the `users` collection from the database, the `bcrypt` module is used to encrypt and decrypt the password for security. 

When a user authenticates successfully, the server sends a token which is then stored as a cookie on user's browser which keeps them signed in for a certain time. Only signed in user can access the data on the website.

## Data

There are two collections 
- Users
- Products

### Users Collection
- email (required)
- password (required)

### Products Collection
- title (required)
- Description  (required)
- Price  (required)
- Stock  (required)
- Image  (optional)
- Category  (optional)
- Date (auto-generated)

## Run the Server

To run the server, you will need to run the following command in the `backend` folder.

`npm start`

## APIs

### Login

To authnticate, a user needs to get token by sending a `POST` request with JSON body having `email` and `password` to 

`localhost:5000/login`

Note: All the following APIs are authenticated using `JWT`, you will need to send `Authorization` header with the value `Bearer ${token}`

### Create

To add a product or user to the database, use following `POST` request along with a JSON body with their parameters

Products:`localhost:5000/product/add`
Users: `localhost:5000/users/add`

### Read

To read/fetch all the products or users from the database, use the following `GET` requests

Products: `localhost:5000/product/`
Users: `localhost:5000/users/`

OR

To read/fetch a single product or user using _id, use the following `GET` request. Replace :id with `_id` of the item you wish to fetch.

Product:`localhost:5000/product/:id`
User:`localhost:5000/users/:id`

### Update

To update a product, use the following `PUT` request along with a JSON body with parameters. Replace :id with `_id` of the item you wish to update.

Product:`localhost:5000/items/:id`

### Delete

To delete a product, use the following `DELETE` request. Replace :id with `_id` of the item you wish to delete.

Product:`localhost:5000/items/:id`

## Frontend

### index.html

The login page which then authorizes the user with `email` and `password` then saves the token as a cookie after authentication.

### products.html

After checkng the token, this page show all the products with their respective `titles`, `categories`, `descriptions`, `prices` and a link to show `details` of individual products which sends them to `product.html` with their id as a url parameter.

Also has navbar which has link to Admin Page which sends them to `manage-product.html`

### product.html

After checkng the token, this page fetches the `id` from the url then fetches and displays the `title`, `description`, `price`, `stock`, `category`, button to update the details and another button to go back.

### manage-products.html

After checkng the token, this page shows a table of `title`, `price`, `stock`, `date`, `category` and buttons to `Edit` and `Delete` those products. `Edit` button sends the user to `update-product.html` with url parameter of the product's id.

Also has navbar with has links to Create Product and Products which send the user to `create-product.html` and `products.html` respectfully.

### create-product.html

After checking the token, this page shows a form with inputs for `title`, `descripton`, `price`, `stock`, a drop down menu for `category`, a button to Create Product and a button to go Back.

### update-product.html

After checking the token, this page shows a form with inputs for `Title`, `Descripton`, `Price`, `Stock`, `Category`, a drop down menu for `category`, a button to `Update Product` and a button to go Back. Every input is pre-flled with existing values of the product.

## Styling

The CSS `Bootstrap` library is used across all app for styling.