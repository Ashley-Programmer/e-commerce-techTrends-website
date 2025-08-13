document.addEventListener('DOMContentLoaded', () => {
    // Sample product data
    const products = [
        { id: 'tv', name: '4K Smart TV 55"', category: 'tv', price: 5799.99, image: '../assets/images/product_tv1.jpg', description: 'Immersive 4K visuals with smart streaming.', rating: 4.5 },
        { id: 'tv2', name: 'LED Television 32"', category: 'tv', price: 3999.99, image: '../assets/images/product_tv2.jpg', description: 'Compact LED TV with vibrant display.', rating: 4.0 },
        { id: 'refrigerator', name: 'Refrigerator 300L', category: 'appliances', price: 62699.99, image: '../assets/images/product_fridge.jpg', description: 'Advanced cooling with smart controls.', rating: 4.0 },
        { id: 'washer', name: 'Washing Machine 7kg', category: 'appliances', price: 7499.99, image: '../assets/images/product_washer.jpg', description: 'Efficient cleaning with modern design.', rating: 4.2 },
        { id: 'microwave', name: 'Microwave Oven 25L', category: 'kitchen', price: 500.99, image: '../assets/images/product_microwave.jpg', description: 'Quick and convenient cooking solution.', rating: 3.8 },
        { id: 'airfryer', name: 'Air Fryer 5L', category: 'kitchen', price: 2499.99, image: '../assets/images/product_airfryer.jpg', description: 'Healthy frying with rapid air technology.', rating: 4.3 },
        { id: 'air-conditioner', name: 'Air Conditioner 12000BTU', category: 'climate', price: 8850.00, image: '../assets/images/product_ac.jpg', description: 'Cool comfort with energy efficiency.', rating: 4.3 },
        { id: 'heater', name: 'Portable Heater', category: 'climate', price: 1499.99, image: '../assets/images/product_heater.jpg', description: 'Warmth for any room, compact design.', rating: 4.0 }
    ];

    // Cart class
    class Cart {
        constructor() {
            // Initialize empty cart to ensure it's clear on page load
            this.items = [];
            localStorage.setItem('cart', JSON.stringify(this.items));
        }

        addItem(product) {
            const existingItem = this.items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({ ...product, quantity: 1 });
            }
            this.save();
            this.updateCartUI();
        }

        removeItem(productId) {
            this.items = this.items.filter(item => item.id !== productId);
            this.save();
            this.updateCartUI();
        }

        updateQuantity(productId, quantity) {
            const item = this.items.find(item => item.id === productId);
            if (item) {
                item.quantity = Math.max(1, quantity);
                this.save();
                this.updateCartUI();
            }
        }

        getTotal() {
            return this.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
        }

        save() {
            localStorage.setItem('cart', JSON.stringify(this.items));
        }

        clear() {
            this.items = [];
            this.save();
            this.updateCartUI();
        }

        updateCartUI() {
            const cartCount = document.getElementById('cart-count');
            const cartItems = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');
            const checkoutItems = document.getElementById('checkout-items');
            const checkoutTotal = document.getElementById('checkout-total');

            // Update cart count
            const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = itemCount;

            // Update cart modal
            cartItems.innerHTML = this.items.length === 0
                ? '<p class="text-gray-600 text-sm">Your cart is empty.</p>'
                : this.items.map(item => `
                    <div class="flex items-center justify-between">
                        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                        <div class="flex-1 ml-2">
                            <p class="text-sm font-semibold text-gray-800">${item.name}</p>
                            <p class="text-sm text-gray-600">R${parseFloat(item.price).toFixed(2)} x ${item.quantity}</p>
                        </div>
                        <div class="flex items-center">
                            <button class="decrement-quantity text-gray-600 hover:text-blue-600 text-sm" data-product-id="${item.id}">-</button>
                            <span class="mx-2 text-sm">${item.quantity}</span>
                            <button class="increment-quantity text-gray-600 hover:text-blue-600 text-sm" data-product-id="${item.id}">+</button>
                            <button class="remove-item text-red-600 hover:text-red-700 ml-2 text-sm" data-product-id="${item.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `).join('');

            // Update checkout modal
            checkoutItems.innerHTML = this.items.length === 0
                ? '<p class="text-gray-600 text-sm">Your cart is empty.</p>'
                : this.items.map(item => `
                    <div class="flex items-center justify-between">
                        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                        <div class="flex-1 ml-2">
                            <p class="text-sm font-semibold text-gray-800">${item.name}</p>
                            <p class="text-sm text-gray-600">R${parseFloat(item.price).toFixed(2)} x ${item.quantity}</p>
                        </div>
                        <p class="text-sm font-semibold text-gray-800">R${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                `).join('');

            // Update totals
            const total = this.getTotal();
            cartTotal.textContent = `Total: R${total}`;
            checkoutTotal.textContent = `Total: R${total}`;
        }
    }

    const cart = new Cart();
    const productGrid = document.getElementById('product-grid');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const cartToggle = document.getElementById('cart-toggle');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const clearCart = document.getElementById('clear-cart');
    const proceedCheckout = document.getElementById('proceed-to-checkout');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckout = document.getElementById('close-checkout');
    const checkoutForm = document.getElementById('checkout-form');
    const sameAsShipping = document.getElementById('same-as-shipping');
    const billingFields = document.getElementById('billing-fields');

    // Function to render star ratings
    function renderStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        return `
            ${'<i class="fas fa-star text-yellow-400 text-sm"></i>'.repeat(fullStars)}
            ${halfStar ? '<i class="fas fa-star-half-alt text-yellow-400 text-sm"></i>' : ''}
            ${'<i class="fas fa-star text-gray-300 text-sm"></i>'.repeat(emptyStars)}
            <span class="text-gray-600 text-sm ml-2">(${rating.toFixed(1)})</span>
        `;
    }

    // Function to render products
    function renderProducts(category = 'all') {
        productGrid.innerHTML = '';
        const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1';
            productCard.setAttribute('data-product-id', product.id);
            productCard.setAttribute('data-category', product.category);
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-36 sm:h-48 md:h-56 object-cover">
                <div class="p-4 sm:p-5">
                    <h3 class="text-base sm:text-lg font-semibold text-gray-800 mb-2">${product.name}</h3>
                    <p class="text-gray-600 text-sm sm:text-base mb-2">${product.description}</p>
                    <div class="flex items-center mb-3">${renderStars(product.rating)}</div>
                    <p class="text-gray-800 font-semibold text-base sm:text-lg mb-3">R${product.price.toFixed(2)}</p>
                    <button class="add-to-cart btn w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-sm sm:text-base" data-product-id="${product.id}">
                        Add to Cart
                        <i class="fas fa-spinner ml-2"></i>
                    </button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // Handle category filter clicks
    categoryFilters.forEach(button => {
        button.addEventListener('click', () => {
            categoryFilters.forEach(btn => btn.classList.remove('bg-blue-600', 'text-white'));
            button.classList.add('bg-blue-600', 'text-white');
            const category = button.getAttribute('data-category');
            renderProducts(category);
        });
    });

    // Handle add to cart
    productGrid.addEventListener('click', (e) => {
        const button = e.target.closest('.add-to-cart');
        if (button) {
            const productId = button.getAttribute('data-product-id');
            const product = products.find(p => p.id === productId);
            if (product) {
                button.disabled = true;
                button.classList.add('loading');
                setTimeout(() => {
                    cart.addItem(product);
                    alert(`${product.name} added to cart!`);
                    button.disabled = false;
                    button.classList.remove('loading');
                }, 500);
            }
        }
    });

    // Handle cart controls
    document.getElementById('cart-items').addEventListener('click', (e) => {
        const target = e.target.closest('.remove-item, .increment-quantity, .decrement-quantity');
        if (!target) return;
        const productId = target.getAttribute('data-product-id');
        if (!productId) return;

        if (target.classList.contains('remove-item')) {
            cart.removeItem(productId);
        } else if (target.classList.contains('increment-quantity')) {
            const item = cart.items.find(item => item.id === productId);
            if (item) cart.updateQuantity(productId, item.quantity + 1);
        } else if (target.classList.contains('decrement-quantity')) {
            const item = cart.items.find(item => item.id === productId);
            if (item) cart.updateQuantity(productId, item.quantity - 1);
        }
    });

    // Cart modal toggle
    cartToggle.addEventListener('click', () => {
        cartModal.classList.toggle('active');
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    // Clear cart
    clearCart.addEventListener('click', () => {
        cart.clear();
        cartModal.classList.remove('active');
        alert('Cart cleared!');
    });

    // Checkout modal toggle
    proceedCheckout.addEventListener('click', () => {
        if (cart.items.length === 0) {
            alert('Your cart is empty. Please add items before proceeding to checkout.');
            return;
        }
        cartModal.classList.remove('active');
        checkoutModal.classList.remove('hidden');
        document.getElementById('shipping-name').focus();
    });

    closeCheckout.addEventListener('click', () => {
        checkoutModal.classList.add('hidden');
    });

    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            checkoutModal.classList.add('hidden');
        }
    });

    // Handle same as shipping checkbox
    sameAsShipping.addEventListener('change', () => {
        billingFields.classList.toggle('hidden', sameAsShipping.checked);
    });

    // Checkout form submission
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const shippingName = document.getElementById('shipping-name').value;
        const shippingEmail = document.getElementById('shipping-email').value;
        const shippingAddress = document.getElementById('shipping-address').value;
        const shippingCity = document.getElementById('shipping-city').value;
        const shippingZip = document.getElementById('shipping-zip').value;

        if (!shippingName || !shippingEmail || !shippingAddress || !shippingCity || !shippingZip) {
            alert('Please fill out all required fields.');
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(shippingEmail)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!sameAsShipping.checked) {
            const billingName = document.getElementById('billing-name').value;
            const billingAddress = document.getElementById('billing-address').value;
            const billingCity = document.getElementById('billing-city').value;
            const billingZip = document.getElementById('billing-zip').value;

            if (!billingName || !billingAddress || !billingCity || !billingZip) {
                alert('Please fill out all billing fields.');
                return;
            }
        }

        const orderSummary = cart.items.map(item => `${item.name} (x${item.quantity}): R${(item.price * item.quantity).toFixed(2)}`).join('\n');
        alert(`Order placed successfully!\n\nOrder Summary:\n${orderSummary}\nTotal: R${cart.getTotal()}\n\nShipping to: ${shippingName}, ${shippingAddress}, ${shippingCity}, ${shippingZip}`);
        cart.clear();
        checkoutModal.classList.add('hidden');
        checkoutForm.reset();
        sameAsShipping.checked = true;
        billingFields.classList.add('hidden');
    });

    // Button ripple effect
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            if (this.tagName === 'BUTTON') e.preventDefault();
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
            if (this.tagName === 'A') {
                setTimeout(() => window.location.href = this.href, 300);
            }
        });
    });

    // Check URL for category query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';
    const activeFilter = document.querySelector(`.category-filter[data-category="${category}"]`);
    if (activeFilter) {
        categoryFilters.forEach(btn => btn.classList.remove('bg-blue-600', 'text-white'));
        activeFilter.classList.add('bg-blue-600', 'text-white');
        renderProducts(category);
    } else {
        renderProducts();
    }

    // Initialize cart UI
    cart.updateCartUI();

    // Newsletter Form Handling
    const newsletterForm = document.getElementById('newsletter-email');
    const newsletterButton = document.getElementById('newsletter-submit');
    if (newsletterForm && newsletterButton) {
        newsletterButton.addEventListener('click', () => {
            const email = newsletterForm.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            alert(`Subscribed with ${email}! (Placeholder - implement actual submission)`);
            newsletterForm.value = '';
        });
    }
});