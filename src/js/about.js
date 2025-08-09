document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const searchToggle = document.getElementById('search-toggle');
    const searchBar = document.getElementById('search-bar');
    const mobileProductsToggle = document.getElementById('mobile-products-toggle');
    const mobileProductsMenu = document.getElementById('mobile-products-menu');
    const searchInput = document.getElementById('search-input');
    const searchSubmit = document.getElementById('search-submit');

    // Mobile menu toggle functionality
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            const spans = navToggle.querySelectorAll('span');
            spans[0].classList.toggle('rotate-45', !isExpanded);
            spans[0].classList.toggle('translate-y-2', !isExpanded);
            spans[1].classList.toggle('opacity-0', !isExpanded);
            spans[2].classList.toggle('-rotate-45', !isExpanded);
            spans[2].classList.toggle('-translate-y-2', !isExpanded);
            searchBar.classList.remove('active');
            searchToggle.setAttribute('aria-expanded', 'false');
            document.querySelector('.mini-cart-dropdown').classList.add('hidden');
        });
    }

    // Search toggle functionality
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', () => {
            console.log('Search toggle clicked'); // Debug
            const isExpanded = searchToggle.getAttribute('aria-expanded') === 'true';
            searchToggle.setAttribute('aria-expanded', !isExpanded);
            searchBar.classList.toggle('active');
            console.log('Search bar active:', searchBar.classList.contains('active')); // Debug
            mobileMenu.classList.add('hidden');
            navToggle.setAttribute('aria-expanded', 'false');
            const spans = navToggle.querySelectorAll('span');
            spans[0].classList.remove('rotate-45', 'translate-y-2');
            spans[1].classList.remove('opacity-0');
            spans[2].classList.remove('-rotate-45', '-translate-y-2');
            document.querySelector('.mini-cart-dropdown').classList.add('hidden');
        });
    }

    // Search submit functionality
    if (searchSubmit && searchInput) {
        searchSubmit.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `../pages/products.html?search=${encodeURIComponent(query)}`;
            }
        });
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `../pages/products.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }

    // Mobile products dropdown toggle
    if (mobileProductsToggle && mobileProductsMenu) {
        mobileProductsToggle.addEventListener('click', () => {
            const isExpanded = mobileProductsToggle.getAttribute('aria-expanded') === 'true';
            mobileProductsToggle.setAttribute('aria-expanded', !isExpanded);
            mobileProductsMenu.classList.toggle('hidden');
            const chevron = mobileProductsToggle.querySelector('i');
            chevron.classList.toggle('fa-chevron-down');
            chevron.classList.toggle('fa-chevron-up');
        });
    }

    // Desktop dropdown hover functionality
    const dropdowns = document.querySelectorAll('.relative.group');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown');
        dropdown.addEventListener('mouseenter', () => {
            menu.classList.remove('hidden');
            link.setAttribute('aria-expanded', 'true');
        });
        dropdown.addEventListener('mouseleave', () => {
            menu.classList.add('hidden');
            link.setAttribute('aria-expanded', 'false');
        });
    });

    // Mini cart functionality
    const cartIcon = document.querySelector('a[href="../pages/cart.html"]');
    const miniCart = document.querySelector('.mini-cart-dropdown');
    const miniCartItems = document.getElementById('mini-cart-items');
    const miniCartTotal = document.getElementById('mini-cart-total');

    if (cartIcon && miniCart) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            miniCart.classList.toggle('hidden');
            searchBar.classList.remove('active');
            searchToggle.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.add('hidden');
            navToggle.setAttribute('aria-expanded', 'false');
            const spans = navToggle.querySelectorAll('span');
            spans[0].classList.remove('rotate-45', 'translate-y-2');
            spans[1].classList.remove('opacity-0');
            spans[2].classList.remove('-rotate-45', '-translate-y-2');
        });
        document.addEventListener('click', (e) => {
            if (!miniCart.contains(e.target) && !cartIcon.contains(e.target)) {
                miniCart.classList.add('hidden');
            }
        });
    }

    // Sample cart items (replace with actual cart data logic)
    const cartItems = [
        {name: 'Smart TV', price: 7999.99, quantity: 1, image: '../assets/images/product_tv.jpg'},
        {name: 'Refrigerator', price: 4999.99, quantity: 1, image: '../assets/images/product_fridge.jpg'},
        {name: 'Washing Machine', price: 2999.99, quantity: 1, image: '../assets/images/product_washing_machine.jpg'}
    ];

    // Render cart items in mini cart
    function renderCart() {
        if (miniCartItems && miniCartTotal) {
            miniCartItems.innerHTML = '';
            let total = 0;
            cartItems.forEach(item => {
                total += item.price * item.quantity;
                const itemElement = document.createElement('div');
                itemElement.className = 'flex items-center justify-between p-2 border-b';
                itemElement.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>R${(item.price * item.quantity).toFixed(2)}</span>
                `;
                miniCartItems.appendChild(itemElement);
            });
            miniCartTotal.textContent = `Total: R${total.toFixed(2)}`;
        }
    }

    // Initialize cart
    renderCart();

    // Close menus on escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            mobileMenu?.classList.add('hidden');
            navToggle?.setAttribute('aria-expanded', 'false');
            searchBar?.classList.remove('active');
            searchToggle?.setAttribute('aria-expanded', 'false');
            miniCart?.classList.add('hidden');
            mobileProductsMenu?.classList.add('hidden');
            mobileProductsToggle?.setAttribute('aria-expanded', 'false');
        }
    });

    // Highlight active page
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === window.location.pathname.replace(/\/$/, '')) {
            link.classList.add('text-blue-600', 'font-bold');
            link.setAttribute('aria-current', 'page');
        }
    });

    const newsletterForm = document.querySelector('footer input[type="email"]');
    const newsletterButton = document.querySelector('footer button');
    if (newsletterForm && newsletterButton) {
        newsletterButton.addEventListener('click', () => {
            const email = newsletterForm.value.trim();
            if (email) {
                alert(`Subscribed with ${email}! (Placeholder - implement actual submission)`);
                newsletterForm.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

});