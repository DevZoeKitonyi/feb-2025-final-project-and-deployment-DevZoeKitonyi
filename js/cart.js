// Cart functionality
let cart = {
    items: [],
    total: 0
  };
  
  // Load cart from localStorage
  function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
  }
  
  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }
  
  // Update cart display
  function updateCartDisplay() {
    const cartCount = document.querySelectorAll('.cart-count');
    const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
    
    cartCount.forEach(count => {
      count.textContent = itemCount;
      count.classList.add('cart-updated');
      setTimeout(() => count.classList.remove('cart-updated'), 300);
    });
  }
  
  // Add item to cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.items.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId,
        quantity: 1,
        price: product.price
      });
    }
    
    updateCartTotal();
    saveCart();
    showToast(`${product.name} added to cart`, 'success');
  }
  
  // Remove item from cart
  function removeFromCart(productId) {
    cart.items = cart.items.filter(item => item.productId !== productId);
    updateCartTotal();
    saveCart();
  }
  
  // Update cart total
  function updateCartTotal() {
    cart.total = cart.items.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }
  
  // Initialize cart
  document.addEventListener('DOMContentLoaded', loadCart);
