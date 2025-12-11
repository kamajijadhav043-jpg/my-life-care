const fs = require("fs");

// How many products you want
const COUNT = 1000;

// Some sample images you already use
const images = [
  "images/product1.jpg",
  "images/product2.jpg",
  "images/product3.jpg",
  "images/product4.jpg"
];

const categories = ["Herbal", "Vitamins", "Skin Care", "Wellness Combo"];

let products = [];

for (let i = 1; i <= COUNT; i++) {
  const img = images[(i - 1) % images.length];
  const cat = categories[(i - 1) % categories.length];

  products.push({
    id: i,
    name: `Product ${i}`,
    price: 199 + (i % 50),                  // random-ish price
    description: `Auto-generated product number ${i} for My Life Care.`,
    image: img,
    category: cat
  });
}

// write to products.json
fs.writeFileSync("products.json", JSON.stringify(products, null, 2), "utf8");

console.log(`Created ${COUNT} products in products.json`);
