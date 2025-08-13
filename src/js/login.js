document.addEventListener('DOMContentLoaded', () => {
    // Login Form Validation and Submission
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const formMessage = document.getElementById('form-message');
    const submitButton = document.getElementById('login-submit');
    const passwordToggle = document.getElementById('password-toggle');

    if (loginForm && formMessage) {
        // Password Visibility Toggle
        passwordToggle.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            passwordToggle.classList.toggle('fa-eye', isPassword);
            passwordToggle.classList.toggle('fa-eye-slash', !isPassword);
            passwordToggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        });

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            // Reset error messages
            emailError.classList.remove('active');
            passwordError.classList.remove('active');
            formMessage.className = 'form-message';
            formMessage.textContent = '';

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

            if (!isValid) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please fix the errors above.';
                return;
            }

            // Simulate loading state
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            submitButton.querySelector('i').classList.remove('hidden');

            try {
                // Simulate async submission (replace with actual backend call)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Success message
                formMessage.className = 'form-message success';
                formMessage.textContent = `Login successful for ${email}!`;
                loginForm.reset();

                // Redirect to products.html after a brief delay
                setTimeout(() => {
                    window.location.href = 'products.html';
                }, 1000); // 1-second delay to show success message
            } catch (error) {
                // Error message
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Login failed. Please check your credentials and try again.';
            } finally {
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                submitButton.querySelector('i').classList.add('hidden');
            }
        });
    }

    // Newsletter Form Handling
    const newsletterForm = document.getElementById('newsletter-email');
    const newsletterButton = document.getElementById('newsletter-submit');
    const newsletterMessage = document.getElementById('newsletter-message');
    if (newsletterForm && newsletterButton && newsletterMessage) {
        newsletterButton.addEventListener('click', async () => {
            // Get button
            const button = newsletterButton;
            button.disabled = true;
            button.classList.add('loading');
            button.querySelector('i').classList.remove('hidden');

            // Clear previous messages
            newsletterMessage.className = 'form-message';
            newsletterMessage.textContent = '';

            const email = newsletterForm.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                newsletterMessage.className = 'form-message error';
                newsletterMessage.textContent = 'Please enter a valid email address.';
                button.disabled = false;
                button.classList.remove('loading');
                button.querySelector('i').classList.add('hidden');
                return;
            }

            try {
                // Simulate async submission (replace with actual backend call)
                await new Promise(resolve => setTimeout(resolve, 1000));

                newsletterMessage.className = 'form-message success';
                newsletterMessage.textContent = `Subscribed with ${email}!`;
                newsletterForm.value = '';
            } catch (error) {
                newsletterMessage.className = 'form-message error';
                newsletterMessage.textContent = 'Failed to subscribe. Please try again later.';
            } finally {
                button.disabled = false;
                button.classList.remove('loading');
                button.querySelector('i').classList.add('hidden');
            }
        });
    }
});