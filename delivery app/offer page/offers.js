// offers.js
document.addEventListener('DOMContentLoaded', function() {
    // Sample offer data
    const offers = [
        {
            id: 1001,
            name: "South Indian Combo",
            originalPrice: 400,
            discountedPrice: 300,
            description: "Enjoy a complete South Indian meal with 2 Masala Dosas, 2 Idlis, and Sambar.",
            image: "south-indian-combo",
            items: [
                { id: 1, name: "Masala Dosa", quantity: 2 },
                { id: 3, name: "Idli Sambar", quantity: 2 }
            ],
            discount: "25% OFF"
        },
        {
            id: 1002,
            name: "Non-Veg Feast",
            originalPrice: 750,
            discountedPrice: 600,
            description: "A feast for non-vegetarians: Chettinad Chicken Curry and Mutton Biryani.",
            image: "non-veg-feast",
            items: [
                { id: 2, name: "Chettinad Chicken Curry", quantity: 1 },
                { id: 5, name: "Mutton Biryani", quantity: 1 }
            ],
            discount: "20% OFF"
        },
        {
            id: 1003,
            name: "Breakfast Special",
            originalPrice: 280,
            discountedPrice: 220,
            description: "Perfect start to your day with Idli, Vada, and Pongal.",
            image: "breakfast-special",
            items: [
                { id: 3, name: "Idli Sambar", quantity: 2 },
                { id: 8, name: "Medu Vada", quantity: 2 },
                { id: 4, name: "Pongal", quantity: 1 }
            ],
            discount: "21% OFF"
        }
    ];
    
    // Combo offers
    const comboOffers = [
        {
            id: 2001,
            name: "Family Feast Combo",
            price: 850,
            description: "Perfect for a family of 4 with a variety of dishes",
            image: "family-feast",
            items: [
                { id: 1, name: "Masala Dosa", quantity: 2 },
                { id: 9, name: "Vegetable Biryani", quantity: 1 },
                { id: 2, name: "Chettinad Chicken Curry", quantity: 1 },
                { id: 7, name: "Fish Curry", quantity: 1 }
            ],
            savings: "Save ₹150"
        },
        {
            id: 2002,
            name: "Vegetarian Delight Combo",
            price: 650,
            description: "A complete vegetarian meal for 3 people",
            image: "veg-delight",
            items: [
                { id: 1, name: "Masala Dosa", quantity: 2 },
                { id: 6, name: "Uttapam", quantity: 1 },
                { id: 9, name: "Vegetable Biryani", quantity: 1 },
                { id: 3, name: "Idli Sambar", quantity: 2 }
            ],
            savings: "Save ₹120"
        },
        {
            id: 2003,
            name: "Non-Veg Lover's Combo",
            price: 900,
            description: "For those who love non-vegetarian dishes",
            image: "non-veg-lovers",
            items: [
                { id: 2, name: "Chettinad Chicken Curry", quantity: 1 },
                { id: 5, name: "Mutton Biryani", quantity: 1 },
                { id: 7, name: "Fish Curry", quantity: 1 },
                { id: 8, name: "Medu Vada", quantity: 4 }
            ],
            savings: "Save ₹180"
        }
    ];

    // DOM Elements
    const offersGrid = document.querySelector('.offers-grid');
    const comboGrid = document.querySelector('.combo-grid');
    const cartCount = document.getElementById('cart-count');
    const cartButton = document.getElementById('cart-button');

    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
    }
    
    // Render offers
    function renderOffers() {
        offersGrid.innerHTML = '';
        
        offers.forEach(offer => {
            const offerCard = document.createElement('div');
            offerCard.className = 'offer-card';
            
            offerCard.innerHTML = `
                <div class="offer-badge">${offer.discount}</div>
                <div class="offer-img">${offer.image}</div>
                <div class="offer-content">
                    <div class="offer-title">
                        <h3>${offer.name}</h3>
                        <div class="offer-price">
                            <span class="original">₹${offer.originalPrice}</span>
                            <span class="discounted">₹${offer.discountedPrice}</span>
                        </div>
                    </div>
                    <p class="offer-desc">${offer.description}</p>
                    
                    <div class="offer-items">
                        <h4>Includes:</h4>
                        <ul>
                            ${offer.items.map(item => `<li>${item.quantity}x ${item.name}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <button class="add-to-cart" data-id="${offer.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            `;
            
            offersGrid.appendChild(offerCard);
        });
        
        // Add event listeners to offer buttons
        document.querySelectorAll('.offer-card .add-to-cart').forEach(button => {
            button.addEventListener('click', addOfferToCart);
        });
    }
    
    // Render combo offers
    function renderComboOffers() {
        comboGrid.innerHTML = '';
        
        comboOffers.forEach(combo => {
            const comboCard = document.createElement('div');
            comboCard.className = 'combo-card';
            
            comboCard.innerHTML = `
                <div class="combo-header">
                    <h3>${combo.name}</h3>
                    <div class="combo-price">₹${combo.price}</div>
                </div>
                
                <div class="combo-content">
                    <div class="combo-items">
                        <h4>What's Included:</h4>
                        ${combo.items.map(item => `
                            <div class="combo-item">
                                <div class="combo-item-img">${item.name.charAt(0)}</div>
                                <div class="combo-item-details">
                                    <div class="combo-item-name">${item.quantity}x ${item.name}</div>
                                    <div class="combo-item-desc">Delicious Tamil Nadu specialty</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="combo-savings">${combo.savings}</div>
                    
                    <button class="add-to-cart primary" data-id="${combo.id}">
                        <i class="fas fa-shopping-cart"></i> Add Combo to Cart
                    </button>
                </div>
            `;
            
            comboGrid.appendChild(comboCard);
        });
        
        // Add event listeners to combo buttons
        document.querySelectorAll('.combo-card .add-to-cart').forEach(button => {
            button.addEventListener('click', addComboToCart);
        });
    }
    
    // Add offer to cart
    function addOfferToCart(e) {
        const offerId = parseInt(e.target.dataset.id);
        const offer = offers.find(o => o.id === offerId);
        
        // Check if offer is already in cart
        const existingItem = cart.find(item => item.id === offer.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: offer.id,
                name: offer.name,
                price: offer.discountedPrice,
                quantity: 1,
                type: 'offer',
                image: offer.image
            });
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart UI
        updateCartCount();
        
        // Show notification
        showNotification(`${offer.name} added to cart!`);
    }
    
    // Add combo to cart
    function addComboToCart(e) {
        const comboId = parseInt(e.target.dataset.id);
        const combo = comboOffers.find(c => c.id === comboId);
        
        // Check if combo is already in cart
        const existingItem = cart.find(item => item.id === combo.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: combo.id,
                name: combo.name,
                price: combo.price,
                quantity: 1,
                type: 'combo',
                image: combo.image
            });
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart UI
        updateCartCount();
        
        // Show notification
        showNotification(`${combo.name} added to cart!`);
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
    
    // Initialize the page
    updateCartCount();
    renderOffers();
    renderComboOffers();
    
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
    
    // Cart button functionality
    cartButton.addEventListener('click', function() {
        window.location.href = 'cart.html';
    });
});