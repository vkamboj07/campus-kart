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
      updateWishlistBadge();
    });

    // Add to Cart functionality
    const addToCartBtn = card.querySelector(".add-to-cart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", () => {
        addToCart(product);
      });
    }
  });

  // Add to Cart function
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: parseInt(product.price),
        image: product.image || "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=80&h=80&fit=crop",
        quantity: 1
      });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    alert(`${product.name} added to cart!`);
  }

  // Update cart badge
  function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll(".cart-icon .badge");
    badges.forEach(badge => {
      if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? "flex" : "none";
      }
    });
  }

  // Update wishlist badge
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

  // Initialize badges on page load
  updateCartBadge();
  updateWishlistBadge();

  // Scroll arrows
  rightArrow.addEventListener("click", () => {
    productsGrid.scrollBy({ left: 300, behavior: "smooth" });
  });

  leftArrow.addEventListener("click", () => {
    productsGrid.scrollBy({ left: -300, behavior: "smooth" });
  });
});
