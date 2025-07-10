// cart.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const cartItems = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const taxAmount = document.getElementById('tax-amount');
    const cartCount = document.getElementById('cart-count');
    const checkoutButton = document.getElementById('checkout-button');
    
    // Sample tax rate (5%)
    const TAX_RATE = 0.05;
    const DELIVERY_FEE = 30;
    
    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Render cart items
    function renderCart() {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some delicious dishes from our menu!</p>
                    <a href="menu.html" class="btn primary">
                        <i class="fas fa-utensils"></i> Browse Menu
                    </a>
                </div>
            `;
            cartSubtotal.textContent = '₹0';
            cartTotal.textContent = '₹0';
            taxAmount.textContent = '₹0';
            cartCount.textContent = '0';
            checkoutButton.disabled = true;
            return;
        }
        
        let subtotal = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-title">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₹${item.price}</div>
                    </div>
                    <p class="cart-item-desc">${item.description}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-btn" data-id="${item.id}">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
            subtotal += item.price * item.quantity;
        });
        
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax + DELIVERY_FEE;
        
        cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
        taxAmount.textContent = `₹${tax.toFixed(2)}`;
        cartTotal.textContent = `₹${total.toFixed(2)}`;
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        checkoutButton.disabled = false;
        
        // Add event listeners to cart controls
        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }
    
    // Decrease item quantity
    function decreaseQuantity(e) {
        const itemId = parseInt(e.target.dataset.id);
        const cartItem = cart.find(item => item.id === itemId);
        
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            cart = cart.filter(item => item.id !== itemId);
        }
        
        saveCart();
        renderCart();
        showNotification('Cart updated!');
    }
    
    // Increase item quantity
    function increaseQuantity(e) {
        const itemId = parseInt(e.target.dataset.id);
        const cartItem = cart.find(item => item.id === itemId);
        cartItem.quantity++;
        saveCart();
        renderCart();
        showNotification('Cart updated!');
    }
    
    // Remove item from cart
    function removeFromCart(e) {
        const itemId = parseInt(e.target.dataset.id);
        const itemName = cart.find(item => item.id === itemId).name;
        cart = cart.filter(item => item.id !== itemId);
        saveCart();
        renderCart();
        showNotification(`${itemName} removed from cart!`);
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        // Update cart count in header
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = cartCount;
    }
    
    // Show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 25px;
            background-color: var(--success-color);
            color: white;
            border-radius: 4px;
            box-shadow: var(--shadow);
            z-index: 1000;
            animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after animation
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Add CSS for notification animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
        }
    `;
    document.head.appendChild(style);
    
    // Checkout button handler
    checkoutButton.addEventListener('click', function() {
        if (cart.length > 0) {
            // In a real app, this would redirect to checkout
            showNotification('Proceeding to checkout...');
            // Simulate checkout process
            setTimeout(() => {
                window.location.href = 'checkout.html';
            }, 1000);
        }
    });
    
    // Initialize the page
    renderCart();
});