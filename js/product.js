// Product data
const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      description: "Experience crystal-clear audio with our premium wireless headphones.",
      images: [
        "https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg"
      ],
      category: "electronics",
      rating: 4.8,
      reviews: 124,
      featured: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 149.99,
      originalPrice: 199.99,
      description: "Track your fitness goals with our advanced smart watch.",
      images: [
        "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg"
      ],
      category: "wearables",
      rating: 4.5,
      reviews: 89,
      discount: true
    },
    // Add more products as needed
  ];
  
  // Format currency
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
  
  // Create product card
  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Add badges
    let badgeHTML = '';
    if (product.new) {
      badgeHTML = '<span class="product-badge badge-new">New</span>';
    } else if (product.discount) {
      badgeHTML = '<span class="product-badge badge-sale">Sale</span>';
    }
    
    // Generate rating stars
    const fullStars = Math.floor(product.rating);
    const emptyStars = 5 - fullStars;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="fas fa-star"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i class="far fa-star"></i>';
    }
    
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.images[0]}" alt="${product.name}">
        ${badgeHTML}
        <button class="wishlist-btn">
          <i class="far fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-title">
          <a href="product-details.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-rating">
          <div class="rating-stars">${starsHTML}</div>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="current-price">${formatCurrency(product.price)}</span>
          ${product.originalPrice ? `
            <span class="original-price">${formatCurrency(product.originalPrice)}</span>
          ` : ''}
        </div>
        <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
    
    // Add event listeners
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => {
      const productId = parseInt(addToCartBtn.dataset.productId);
      addToCart(productId);
    });
    
    return card;
  }
  
  // Display products in container
  function displayProducts(products, container) {
    container.innerHTML = '';
    
    products.forEach(product => {
      const card = createProductCard(product);
      container.appendChild(card);
    });
  }
  
  // Initialize products on page load
  document.addEventListener('DOMContentLoaded', () => {
    const featuredContainer = document.getElementById('featured-products-container');
    const newContainer = document.getElementById('new-products-container');
    
    if (featuredContainer) {
      const featuredProducts = products.filter(p => p.featured);
      displayProducts(featuredProducts, featuredContainer);
    }
    
    if (newContainer) {
      const newProducts = products.filter(p => p.new);
      displayProducts(newProducts, newContainer);
    }
  });
