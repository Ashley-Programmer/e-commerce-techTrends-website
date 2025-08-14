document.addEventListener('DOMContentLoaded', () => {
    // Register Form Validation and Submission
    const registerForm = document.getElementById('register-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const formMessage = document.getElementById('form-message');
    const submitButton = document.getElementById('register-submit');
    const passwordToggle = document.getElementById('password-toggle');
    const confirmPasswordToggle = document.getElementById('confirm-password-toggle');

    if (registerForm && formMessage) {
        // Password Visibility Toggles
        passwordToggle.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            passwordToggle.classList.toggle('fa-eye', isPassword);
            passwordToggle.classList.toggle('fa-eye-slash', !isPassword);
            passwordToggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        });

        confirmPasswordToggle.addEventListener('click', () => {
            const isPassword = confirmPasswordInput.type === 'password';
            confirmPasswordInput.type = isPassword ? 'text' : 'password';
            confirmPasswordToggle.classList.toggle('fa-eye', isPassword);
            confirmPasswordToggle.classList.toggle('fa-eye-slash', !isPassword);
            confirmPasswordToggle.setAttribute('aria-label', isPassword ? 'Hide confirm password' : 'Show confirm password');
        });

        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            // Reset error messages
            nameError.classList.remove('active');
            emailError.classList.remove('active');
            passwordError.classList.remove('active');
            confirmPasswordError.classList.remove('active');
            nameInput.setAttribute('aria-invalid', 'false');
            emailInput.setAttribute('aria-invalid', 'false');
            passwordInput.setAttribute('aria-invalid', 'false');
            confirmPasswordInput.setAttribute('aria-invalid', 'false');
            formMessage.className = 'form-message';
            formMessage.textContent = '';

            // Get form inputs
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();

            // Basic email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validation
            let isValid = true;
            if (!name) {
                nameError.classList.add('active');
                nameInput.setAttribute('aria-invalid', 'true');
                isValid = false;
            }
            if (!email || !emailRegex.test(email)) {
                emailError.classList.add('active');
                emailInput.setAttribute('aria-invalid', 'true');
                isValid = false;
            }
            if (!password || password.length < 8) {
                passwordError.classList.add('active');
                passwordInput.setAttribute('aria-invalid', 'true');
                isValid = false;
            }
            if (password !== confirmPassword) {
                confirmPasswordError.classList.add('active');
                confirmPasswordInput.setAttribute('aria-invalid', 'true');
                isValid = false;
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
                formMessage.textContent = `Registration successful for ${name}! Please log in.`;
                registerForm.reset();

                // Redirect to login.html after a brief delay
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000); // 1-second delay to show success message
            } catch (error) {
                // Error message
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Registration failed. Please try again later.';
            } finally {
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                submitButton.querySelector('i').classList.add('hidden');
            }
        });
    }
});