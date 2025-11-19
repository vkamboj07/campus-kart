// js/wishlist.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("wishlist-container");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const countElem = document.getElementById("wishListCount");
  countElem.textContent = `Wishlist (${wishlist.length})`;


if (wishlist.length === 0) {
  container.innerHTML = `
    <div class="empty-wishlist">
      <p>Your wishlist is empty 😔</p>
      <a href="index.html" class="go-shop-btn">Go Back to Shop</a>
    </div>
  `;
      countElem.textContent = `Wishlist (0)`;
  return;
}

  wishlist.forEach(id => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <div class="product-badge">${product.badge}</div>
      <div class="product-icons">
        <span class="icon remove-btn" title="Remove">❌</span>
      </div>
      <div class="product-image ${product.imageClass}"></div>
      <h3>${product.name}</h3>
      <div class="product-price">
        <span class="current-price">₹${product.price}</span>
        <span class="original-price">₹${product.originalPrice}</span>
      </div>
      <div class="product-rating">
        <span class="stars">★★★★★</span>
        <span class="rating-count">(${product.ratingCount})</span>
      </div>
    `;

    container.appendChild(card);
  });

  // Remove from wishlist
  container.addEventListener("click", e => {
    if (e.target.classList.contains("remove-btn")) {
      const card = e.target.closest(".product-card");
      const name = card.querySelector("h3").textContent;
      const product = products.find(p => p.name === name);
      if (!product) return;

      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist = wishlist.filter(item => item !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      card.remove();

      // Update count display
      countElem.textContent = `Wishlist (${wishlist.length})`;

      // Update badge in header
      updateWishlistBadge();

      if (wishlist.length === 0) {
        container.innerHTML = `
          <div class="empty-wishlist">
            <p>Your wishlist is empty 😔</p>
            <a href="index.html" class="go-shop-btn">Go Back to Shop</a>
          </div>
        `;
        countElem.textContent = `Wishlist (0)`;
      }
    }
  });

  // Function to update wishlist badge globally
  function updateWishlistBadge() {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    const badges = document.querySelectorAll(".wishlist-icon .badge");
    badges.forEach(badge => {
      if (badge) {
        badge.textContent = wishlistItems.length;
        badge.style.display = wishlistItems.length > 0 ? "flex" : "none";
      }
    });
  }

  // Initialize badge on page load
  updateWishlistBadge();
});
