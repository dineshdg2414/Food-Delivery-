// script.js
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
        }
    ];

    // DOM Elements
    const itemsGrid = document.querySelector('.items-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Initialize cart
    let cart = [];

    // Render food items
    function renderFoodItems(items) {
        itemsGrid.innerHTML = '';
        
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
        
        // Update cart UI
        updateCartUI();
        
        // Show success message
        showNotification(`${item.name} added to cart!`);
    }

    // Update cart UI
    function updateCartUI() {
        const cartButton = document.querySelector('.header-buttons .btn');
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartButton.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${cartCount})`;
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

    // Filter food items
    function filterItems() {
        const activeFilters = {
            category: 'all',
            priceRange: null,
            spiceLevel: null
        };
        
        // Get active filters
        filterButtons.forEach(button => {
            if (button.classList.contains('active')) {
                if (button.dataset.filter === 'all' || 
                    button.dataset.filter === 'veg' || 
                    button.dataset.filter === 'non-veg') {
                    activeFilters.category = button.dataset.filter;
                } else if (button.dataset.filter.startsWith('price-')) {
                    activeFilters.priceRange = button.dataset.filter;
                } else if (button.dataset.filter.startsWith('spice-')) {
                    activeFilters.spiceLevel = button.dataset.filter;
                }
            }
        });
        
        // Filter items
        const filteredItems = foodItems.filter(item => {
            // Category filter
            if (activeFilters.category !== 'all' && item.category !== activeFilters.category) {
                return false;
            }
            
            // Price range filter
            if (activeFilters.priceRange && item.priceRange !== activeFilters.priceRange) {
                return false;
            }
            
            // Spice level filter
            if (activeFilters.spiceLevel && item.spiceLevel !== activeFilters.spiceLevel) {
                return false;
            }
            
            return true;
        });
        
        renderFoodItems(filteredItems);
    }

    // Set up filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Handle category buttons (only one active at a time)
            if (button.dataset.filter === 'all' || 
                button.dataset.filter === 'veg' || 
                button.dataset.filter === 'non-veg') {
                document.querySelectorAll('[data-filter="all"], [data-filter="veg"], [data-filter="non-veg"]').forEach(btn => {
                    btn.classList.remove('active');
                });
            }
            
            // Toggle active state
            button.classList.toggle('active');
            
            // If "all" is clicked, deactivate other category filters
            if (button.dataset.filter === 'all' && button.classList.contains('active')) {
                document.querySelectorAll('[data-filter="veg"], [data-filter="non-veg"]').forEach(btn => {
                    btn.classList.remove('active');
                });
            }
            
            // If a specific category is selected, deactivate "all"
            if ((button.dataset.filter === 'veg' || button.dataset.filter === 'non-veg') && 
                button.classList.contains('active')) {
                document.querySelector('[data-filter="all"]').classList.remove('active');
            }
            
            // Filter items
            filterItems();
        });
    });

    // Initialize the page
    renderFoodItems(foodItems);
    
    // Add CSS for notification animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform`;})


            // Add to cart function (update)
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
    updateCartUI();
    
    // Show success message
    showNotification(`${item.name} added to cart!`);
}



// Update the filterItems function
function filterItems() {
    const activeFilters = {
        category: 'all',
        priceRange: [],
        spiceLevel: []
    };
    
    // Get active filters
    filterButtons.forEach(button => {
        if (button.classList.contains('active')) {
            const filter = button.dataset.filter;
            
            if (filter === 'all' || filter === 'veg' || filter === 'non-veg') {
                activeFilters.category = filter;
            } 
            else if (filter.startsWith('price-')) {
                activeFilters.priceRange.push(filter);
            } 
            else if (filter.startsWith('spice-')) {
                activeFilters.spiceLevel.push(filter);
            }
        }
    });
    
    // Filter items
    const filteredItems = foodItems.filter(item => {
        // Category filter
        if (activeFilters.category !== 'all' && item.category !== activeFilters.category) {
            return false;
        }
        
        // Price range filter (multiple selection)
        if (activeFilters.priceRange.length > 0 && 
            !activeFilters.priceRange.includes(item.priceRange)) {
            return false;
        }
        
        // Spice level filter (multiple selection)
        if (activeFilters.spiceLevel.length > 0 && 
            !activeFilters.spiceLevel.includes(item.spiceLevel)) {
            return false;
        }
        
        return true;
    });
    
    renderFoodItems(filteredItems);
}

// Update filter button setup
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterType = button.dataset.filter;
        
        // Category buttons (single selection)
        if (filterType === 'all' || filterType === 'veg' || filterType === 'non-veg') {
            // Remove active class from other category buttons
            document.querySelectorAll(
                '[data-filter="all"], [data-filter="veg"], [data-filter="non-veg"]'
            ).forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Activate clicked button
            button.classList.add('active');
        } 
        // Price and spice buttons (multiple selection)
        else {
            button.classList.toggle('active');
        }
        
        // Filter items
        filterItems();
    });
});