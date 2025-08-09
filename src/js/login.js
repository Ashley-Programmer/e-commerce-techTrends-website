document.addEventListener('DOMContentLoaded', () => {
    // Login Form Validation and Submission
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const submitButton = document.getElementById('login-submit');
    const passwordToggle = document.getElementById('password-toggle');

    if (loginForm) {
        // Password Visibility Toggle
        passwordToggle.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            passwordToggle.classList.toggle('fa-eye', isPassword);
            passwordToggle.classList.toggle('fa-eye-slash', !isPassword);
            passwordToggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            // Reset error messages
            emailError.classList.remove('active');
            passwordError.classList.remove('active');

            // Get form inputs
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Basic email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validation
            let isValid = true;
            if (!email || !emailRegex.test(email)) {
                emailError.classList.add('active');
                emailInput.setAttribute('aria-invalid', 'true');
                isValid = false;
            } else {
                emailInput.setAttribute('aria-invalid', 'false');
            }
            if (!password) {
                passwordError.classList.add('active');
                passwordInput.setAttribute('aria-invalid', 'true');
                isValid = false;
            } else {
                passwordInput.setAttribute('aria-invalid', 'false');
            }

            if (!isValid) return;

            // Simulate loading state
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            setTimeout(() => {
                // Placeholder submission (replace with backend integration)
                alert(`Login successful for ${email}! (Placeholder - implement actual authentication)`);
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                loginForm.reset();
            }, 1000); // Simulate 1-second delay
        });
    }

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