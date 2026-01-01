const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

/* Get all products */
app.get("/products", (req, res) => {
  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) return res.json([]);
    res.json(JSON.parse(data || "[]"));
  });
});

/* Add wallpaper (Admin) */
app.post("/add-wallpaper", (req, res) => {
  const newItem = req.body;

  fs.readFile("products.json", "utf8", (err, data) => {
    let items = [];
    if (!err && data) items = JSON.parse(data);

    newItem.id = Date.now();
    items.push(newItem);

    fs.writeFile("products.json", JSON.stringify(items, null, 2), () => {
      res.json({ success: true });
    });
  });
});

/* Start server */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
