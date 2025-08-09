document.addEventListener('DOMContentLoaded', () => {
    // Sample product data (replace with real data or fetch from backend)
    const products = [
        { id: 1, name: '4K Smart TV 55"', category: 'tv', price: 7999.99, image: '/assets/images/smart_tv.webp' },
        { id: 2, name: 'LED Television 32"', category: 'tv', price: 3999.99, image: '../assets/images/product_tv2.jpg' },
        { id: 3, name: 'Washing Machine 7kg', category: 'appliances', price: 5499.99, image: '/assets/images/wash_machine.avif' },
        { id: 4, name: 'Refrigerator 300L', category: 'appliances', price: 8999.99, image: '../assets/images/product_fridge.jpg' },
        { id: 5, name: 'Microwave Oven 25L', category: 'kitchen', price: 1999.99, image: '../assets/images/product_microwave.jpg' },
        { id: 6, name: 'Air Fryer 5L', category: 'kitchen', price: 2499.99, image: '../assets/images/product_airfryer.jpg' },
        { id: 7, name: 'Air Conditioner 12000BTU', category: 'climate', price: 6999.99, image: '../assets/images/product_ac.jpg' },
        { id: 8, name: 'Portable Heater', category: 'climate', price: 1499.99, image: '../assets/images/product_heater.jpg' }
    ];

    const productGrid = document.getElementById('product-grid');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const miniCartItems = document.getElementById('mini-cart-items');
    const miniCartTotal = document.getElementById('mini-cart-total');
    const checkoutButton = document.getElementById('proceed-to-checkout');

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render products
    function renderProducts(category = 'all') {
        productGrid.innerHTML = '';
        const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card bg-white rounded-lg shadow-md p-4 flex flex-col';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-contain rounded-md mb-4">
                <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
                <p class="text-gray-600">R${product.price.toFixed(2)}</p>
                <button class="add-to-cart mt-auto bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-sm" data-id="${product.id}">
                    Add to Cart
                    <i class="fas fa-spinner ml-2"></i>
                </button>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // Function to update mini-cart
    function updateMiniCart() {
        miniCartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product) {
                total += product.price * item.quantity;
                const cartItem = document.createElement('div');
                cartItem.className = 'flex justify-between items-center';
                cartItem.innerHTML = `
                    <span class="text-sm">${product.name} (x${item.quantity})</span>
                    <span class="text-sm font-semibold">R${(product.price * item.quantity).toFixed(2)}</span>
                `;
                miniCartItems.appendChild(cartItem);
            }
        });
        miniCartTotal.textContent = `Total: R${total.toFixed(2)}`;
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
        if (e.target.classList.contains('add-to-cart')) {
            const button = e.target;
            const productId = parseInt(button.getAttribute('data-id'));
            button.disabled = true;
            button.classList.add('loading');
            setTimeout(() => {
                const existingItem = cart.find(item => item.id === productId);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ id: productId, quantity: 1 });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateMiniCart();
                button.disabled = false;
                button.classList.remove('loading');
                alert('Product added to cart!');
            }, 500); // Simulate 0.5-second delay
        }
    });

    // Handle checkout
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        // Placeholder checkout (replace with backend integration)
        alert('Proceeding to checkout... (Placeholder - implement payment gateway)');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateMiniCart();
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

    // Initialize mini-cart
    updateMiniCart();

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