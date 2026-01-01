const productName = document.getElementById("productName");

if (productName) {
  const waBtn = document.getElementById("waBtn");
  const text = `Hello, I am interested in the wallpaper: ${productName.innerText}`;
  waBtn.href = `https://wa.me/917030971315?text=${encodeURIComponent(text)}`;
}
