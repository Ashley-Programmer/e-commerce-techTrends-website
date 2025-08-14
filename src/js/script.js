// Initialize page functionality when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
    initializeSearchBar();
    initializeMobileProductsDropdown();
    initializeDesktopDropdowns();
    initializeActivePageHighlight();
    initializeNewsletterForm();
    initializeCarousel();
});

// Mobile Menu Toggle
function initializeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const searchBar = document.getElementById('search-bar');
    const searchToggle = document.getElementById('search-toggle');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');

            // Toggle hamburger icon to X
            const spans = navToggle.querySelectorAll('span');
            spans[0].classList.toggle('rotate-45', !isExpanded);
            spans[0].classList.toggle('translate-y-2', !isExpanded);
            spans[1].classList.toggle('opacity-0', !isExpanded);
            spans[2].classList.toggle('-rotate-45', !isExpanded);
            spans[2].classList.toggle('-translate-y-2', !isExpanded);

            // Close other menus
            searchBar.classList.remove('active');
            searchToggle.setAttribute('aria-expanded', 'false');
        });
    }
}

// Search Bar Toggle and Submission
function initializeSearchBar() {
    const searchToggle = document.getElementById('search-toggle');
    const searchBar = document.getElementById('search-bar');
    const searchInput = document.getElementById('search-input');
    const searchSubmit = document.getElementById('search-submit');
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', () => {
            const isExpanded = searchToggle.getAttribute('aria-expanded') === 'true';
            searchToggle.setAttribute('aria-expanded', !isExpanded);
            searchBar.classList.toggle('active');

            // Close mobile menu and reset hamburger icon
            mobileMenu.classList.add('hidden');
            navToggle.setAttribute('aria-expanded', 'false');
            const spans = navToggle.querySelectorAll('span');
            spans[0].classList.remove('rotate-45', 'translate-y-2');
            spans[1].classList.remove('opacity-0');
            spans[2].classList.remove('-rotate-45', '-translate-y-2');
            miniCart.classList.add('hidden');
        });
    }

    if (searchSubmit && searchInput) {
        const handleSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `../pages/products.html?search=${encodeURIComponent(query)}`;
            }
        };
        searchSubmit.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }
}

// Mobile Products Dropdown Toggle
function initializeMobileProductsDropdown() {
    const mobileProductsToggle = document.getElementById('mobile-products-toggle');
    const mobileProductsMenu = document.getElementById('mobile-products-menu');

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
}

// Desktop Dropdown Hover
function initializeDesktopDropdowns() {
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
}


// Highlight Active Page
function initializeActivePageHighlight() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === window.location.pathname.replace(/\/$/, '')) {
            link.classList.add('text-blue-600', 'font-bold');
            link.setAttribute('aria-current', 'page');
        }
    });
}

// Newsletter Form Submission
function initializeNewsletterForm() {
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
}

// Close Menus on Escape Key
function handleEscapeKey() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navToggle = document.getElementById('nav-toggle');
    const searchBar = document.getElementById('search-bar');
    const searchToggle = document.getElementById('search-toggle');
    const mobileProductsMenu = document.getElementById('mobile-products-menu');
    const mobileProductsToggle = document.getElementById('mobile-products-toggle');

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
}

// Initialize escape key handler
handleEscapeKey();