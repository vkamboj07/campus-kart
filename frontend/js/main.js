// js/main.js
document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card");
  const leftArrow = document.querySelector(".nav-arrow.left");
  const rightArrow = document.querySelector(".nav-arrow.right");
  const productsGrid = document.querySelector(".products-grid");

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Populate each product card
  productCards.forEach(card => {
    const id = card.getAttribute("data-id");
    const product = products.find(p => p.id === id);

    if (!product) return;

    card.querySelector(".product-badge").textContent = product.badge;
    card.querySelector("h3").textContent = product.name;
    card.querySelector(".current-price").textContent = `₹${product.price}`;
    card.querySelector(".original-price").textContent = `₹${product.originalPrice}`;
    card.querySelector(".rating-count").textContent = `(${product.ratingCount})`;
    card.querySelector(".product-image").classList.add(product.imageClass);

    // Highlight wishlist items
    const heart = card.querySelector(".wishlist-btn");
    if (wishlist.includes(id)) {
      heart.classList.add("active");
      card.classList.add("wishlisted");
    }

    // Wishlist toggle
    heart.addEventListener("click", () => {
      if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
        heart.classList.remove("active");
      } else {
        wishlist.push(id);
        heart.classList.add("active");
      }
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    });
  });

  // Scroll arrows
  rightArrow.addEventListener("click", () => {
    productsGrid.scrollBy({ left: 300, behavior: "smooth" });
  });

  leftArrow.addEventListener("click", () => {
    productsGrid.scrollBy({ left: -300, behavior: "smooth" });
  });
});
