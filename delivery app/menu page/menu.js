// menu.js
document.addEventListener('DOMContentLoaded', function() {
    // Sample Tamil Nadu food items data
    const foodItems = [
        {
            id: 1,
            name: "Masala Dosa",
            price: 120,
            image: "dosa",
            description: "Crispy rice crepe filled with spiced potato, served with sambar and coconut chutney.",
            category: "veg",
            priceRange: "price-medium",
            spiceLevel: "spice-medium",
            popular: true
        },
        {
            id: 2,
            name: "Chettinad Chicken Curry",
            price: 280,
            image: "chicken",
            description: "Spicy chicken curry with Chettinad spices, served with steamed rice.",
            category: "non-veg",
            priceRange: "price-high",
            spiceLevel: "spice-hot",
            popular: true
        },
        {
            id: 3,
            name: "Idli Sambar",
            price: 80,
            image: "idli",
            description: "Soft steamed rice cakes served with lentil-based vegetable stew.",
            category: "veg",
            priceRange: "price-low",
            spiceLevel: "spice-mild",
            popular: true
        },
        {
            id: 4,
            name: "Pongal",
            price: 90,
            image: "pongal",
            description: "Creamy rice and lentil dish tempered with ghee, cumin, and pepper.",
            category: "veg",
            priceRange: "price-low",
            spiceLevel: "spice-mild",
            popular: false
        },
        {
            id: 5,
            name: "Mutton Biryani",
            price: 320,
            image: "biryani",
            description: "Fragrant basmati rice cooked with tender mutton pieces and aromatic spices.",
            category: "non-veg",
            priceRange: "price-high",
            spiceLevel: "spice-hot",
            popular: true
        },
        {
            id: 6,
            name: "Uttapam",
            price: 110,
            image: "uttapam",
            description: "Savory pancake topped with onions, tomatoes, and chilies.",
            category: "veg",
            priceRange: "price-medium",
            spiceLevel: "spice-medium",
            popular: false
        },
        {
            id: 7,
            name: "Fish Curry",
            price: 250,
            image: "fish",
            description: "Tangy and spicy fish curry with tamarind and traditional spices.",
            category: "non-veg",
            priceRange: "price-medium",
            spiceLevel: "spice-hot",
            popular: true
        },
        {
            id: 8,
            name: "Medu Vada",
            price: 100,
            image: "vada",
            description: "Savory fried lentil doughnuts served with sambar and chutney.",
            category: "veg",
            priceRange: "price-medium",
            spiceLevel: "spice-medium",
            popular: false
        },
        {
            id: 9,
            name: "Vegetable Biryani",
            price: 180,
            image: "veg-biryani",
            description: "Fragrant rice cooked with mixed vegetables and aromatic spices.",
            category: "veg",
            priceRange: "price-medium",
            spiceLevel: "spice-medium",
            popular: true
        },
        {
            id: 10,
            name: "Rasam",
            price: 70,
            image: "rasam",
            description: "Spicy and tangy soup made with tamarind, tomatoes, and spices.",
            category: "veg",
            priceRange: "price-low",
            spiceLevel: "spice-hot",
            popular: false
        },
        {
            id: 11,
            name: "Prawn Fry",
            price: 300,
            image: "prawn",
            description: "Crispy fried prawns marinated in traditional spices.",
            category: "non-veg",
            priceRange: "price-high",
            spiceLevel: "spice-medium",
            popular: true
        },
        {
            id: 12,
            name: "Appam with Stew",
            price: 150,
            image: "appam",
            description: "Soft rice hoppers served with mild coconut vegetable stew.",
            category: "veg",
            priceRange: "price-medium",
            spiceLevel: "spice-mild",
            popular: false
        }
    ];

    // DOM Elements
    const itemsGrid = document.querySelector('.items-grid');
    const cartItems = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const cartButton = document.getElementById('cart-button');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const spiceFilter = document.getElementById('spice-filter');

    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Render food items
    function renderFoodItems(items) {
        itemsGrid.innerHTML = '';
        
        if (items.length === 0) {
            itemsGrid.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-utensils"></i>
                    <h3>No dishes found</h3>
                    <p>Try adjusting your filters</p>
                </div>
            `;
            return;
        }
        
        items.forEach(item => {
            const foodCard = document.createElement('div');
            foodCard.className = 'food-card';
            foodCard.dataset.category = item.category;
            foodCard.dataset.priceRange = item.priceRange;
            foodCard.dataset.spiceLevel = item.spiceLevel;
            
            const categoryTag = item.category === 'veg' ? 
                '<span class="tag veg">Vegetarian</span>' : 
                '<span class="tag non-veg">Non-Vegetarian</span>';
            
            const spiceTag = item.spiceLevel === 'spice-mild' ? 
                '<span class="tag">Mild</span>' : 
                item.spiceLevel === 'spice-medium' ? 
                '<span class="tag spicy">Medium</span>' : 
                '<span class="tag spicy">Hot</span>';
            
            const popularTag = item.popular ? '<span class="tag" style="background-color:#f1c40f; color:#000;">Popular</span>' : '';
            
            foodCard.innerHTML = `
                <div class="food-img">${item.image}</div>
                <div class="food-content">
                    <div class="food-title">
                        <h3>${item.name}</h3>
                        <div class="food-price">₹${item.price}</div>
                    </div>
                    <p class="food-desc">${item.description}</p>
                    <div class="food-tags">
                        ${categoryTag}
                        ${spiceTag}
                        ${popularTag}
                    </div>
                    <button class="add-to-cart" data-id="${item.id}">
                        <i class="fas fa-plus"></i> Add to Cart
                    </button>
                </div>
            `;
            
            itemsGrid.appendChild(foodCard);
        });
        
        // Add event listeners to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Render cart items
    function renderCart() {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some delicious dishes!</p>
                </div>
            `;
            cartSubtotal.textContent = '₹0';
            cartTotal.textContent = '₹30';
            cartCount.textContent = '0';
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
        
        cartSubtotal.textContent = `₹${subtotal}`;
        cartTotal.textContent = `₹${subtotal + 30}`;
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        
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

    // Add to cart function
    function addToCart(e) {
        const itemId = parseInt(e.target.dataset.id);
        const item = foodItems.find(item => item.id === itemId);
        
        // Check if item is already in cart
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({...item, quantity: 1});
        }
        
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart UI
        renderCart();
        
        // Show success message
        showNotification(`${item.name} added to cart!`);
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
    }

    // Increase item quantity
    function increaseQuantity(e) {
        const itemId = parseInt(e.target.dataset.id);
        const cartItem = cart.find(item => item.id === itemId);
        cartItem.quantity++;
        saveCart();
        renderCart();
    }

    // Remove item from cart
    function removeFromCart(e) {
        const itemId = parseInt(e.target.dataset.id);
        cart = cart.filter(item => item.id !== itemId);
        saveCart();
        renderCart();
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove notification after animation
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Filter food items
    function filterItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const price = priceFilter.value;
        const spice = spiceFilter.value;
        
        const filteredItems = foodItems.filter(item => {
            // Search filter
            if (searchTerm && !item.name.toLowerCase().includes(searchTerm)){
                return false;
            }
            
            // Category filter
            if (category !== 'all' && item.category !== category) {
                return false;
            }
            
            // Price filter
            if (price !== 'all' && item.priceRange !== price) {
                return false;
            }
            
            // Spice level filter
            if (spice !== 'all' && item.spiceLevel !== spice) {
                return false;
            }
            
            return true;
        });
        
        renderFoodItems(filteredItems);
    }

    // Toggle cart visibility
    function toggleCart() {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    // Event listeners
    cartButton.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
    
    searchInput.addEventListener('input', filterItems);
    searchButton.addEventListener('click', filterItems);
    categoryFilter.addEventListener('change', filterItems);
    priceFilter.addEventListener('change', filterItems);
    spiceFilter.addEventListener('change', filterItems);

    // Initialize the page
    renderFoodItems(foodItems);
    renderCart();
});