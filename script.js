function filterPrice(price) {
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    if (price === 'all') {
      card.style.display = "block";
    } else {
      card.style.display =
        card.dataset.price == price ? "block" : "none";
    }
  });
}
