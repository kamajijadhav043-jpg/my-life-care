const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// -------- STATIC FRONTEND --------
// Serve all your html/css/js/images from the project folder
app.use(express.static(path.join(__dirname)));

// -------- USERS (REGISTER / LOGIN) --------
const USERS_FILE = "users.json";
let users = [];

if (fs.existsSync(USERS_FILE)) {
  users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

function saveUsers() {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.json({ success: false, message: "User already exists" });
  }

  const newUser = { name, email, password };
  users.push(newUser);
  saveUsers();

  res.json({ success: true, message: "Account created successfully!" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.json({ success: false, message: "Invalid email or password" });
  }

  res.json({
    success: true,
    message: "Login successful!",
    user: { name: user.name, email: user.email }
  });
});

// -------- PRODUCTS --------
const PRODUCTS_FILE = "products.json";
let products = [];

if (fs.existsSync(PRODUCTS_FILE)) {
  products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, "utf8"));
}

function saveProducts() {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

// public products list
app.get("/products", (req, res) => {
  res.json(products);
});

// admin: all products
app.get("/all-products", (req, res) => {
  res.json(products);
});

// admin: add product
app.post("/add-product", (req, res) => {
  const { name, price, description, image, category } = req.body;

  const newProduct = {
    id: Date.now(),
    name,
    price,
    description,
    image,
    category
  };

  products.push(newProduct);
  saveProducts();

  res.json({ success: true, message: "Product added successfully!" });
});

// admin: edit product
app.post("/edit-product", (req, res) => {
  const updated = req.body;

  products = products.map(p => (p.id === updated.id ? updated : p));
  saveProducts();

  res.json({ success: true, message: "Product updated!" });
});

// admin: delete product
app.post("/delete-product", (req, res) => {
  const { id } = req.body;

  products = products.filter(p => p.id !== id);
  saveProducts();

  res.json({ success: true, message: "Product deleted!" });
});

// -------- ORDERS --------
const ORDERS_FILE = "orders.json";
let orders = [];

if (fs.existsSync(ORDERS_FILE)) {
  orders = JSON.parse(fs.readFileSync(ORDERS_FILE, "utf8"));
}

function saveOrders() {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

// place order
app.post("/place-order", (req, res) => {
  const order = req.body; // { email, items, total }

  order.id = Date.now();
  order.date = new Date().toISOString();

  orders.push(order);
  saveOrders();

  res.json({ success: true, message: "Order placed successfully!" });
});

// user orders
app.post("/my-orders", (req, res) => {
  const { email } = req.body;
  const userOrders = orders.filter(o => o.email === email);
  res.json(userOrders);
});

// admin: all orders
app.get("/all-orders", (req, res) => {
  res.json(orders);
});

// -------- START SERVER (Render-friendly) --------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("My Life Care backend running on port " + PORT);
});
