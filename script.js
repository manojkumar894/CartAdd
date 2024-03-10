const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 }
  ];
  
  let cart = [];
  
  function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    Products.forEach(product => {
      const item = document.createElement('div');
      item.className = 'product-item';
      item.innerHTML = `
        <span>${product.name} - $${product.price}</span>
        <div>
          <button onclick="addToCart(${product.id})">+</button>
          <span id="quantity-${product.id}">${getQuantity(product.id)}</span>
          <button onclick="removeFromCart(${product.id})">-</button>
        </div>
      `;
      productList.appendChild(item);
    });
  }
  
  function renderCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';
    if (cart.length === 0) {
      cartElement.innerHTML = '<p>No Product added to the cart</p>';
    } else {
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <span>${item.name} - $${item.price} (${item.quantity})</span>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartElement.appendChild(cartItem);
      });
    }
    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    totalPriceElement.textContent = `Total Price: $${totalPrice}`;
  }
  
  function addToCart(productId) {
    const product = Products.find(p => p.id === productId);
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    if (cartItemIndex !== -1) {
      cart[cartItemIndex].quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    renderProducts();
    renderCart();
  }
  
  function removeFromCart(productId) {
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    if (cartItemIndex !== -1) {
      if (cart[cartItemIndex].quantity > 1) {
        cart[cartItemIndex].quantity--;
      } else {
        cart.splice(cartItemIndex, 1);
      }
    }
    renderProducts();
    renderCart();
  }
  
  function getQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    renderCart();
  });
  