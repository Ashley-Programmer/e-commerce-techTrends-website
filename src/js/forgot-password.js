document.addEventListener('DOMContentLoaded', () => {
    // Forgot Password Form Validation and Submission
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const formMessage = document.getElementById('form-message');
    const submitButton = document.getElementById('reset-submit');

    if (forgotPasswordForm && formMessage) {
        forgotPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            // Reset error messages
            emailError.classList.remove('active');
            formMessage.className = 'form-message';
            formMessage.textContent = '';

            // Get form input
            const email = emailInput.value.trim();

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
                formMessage.textContent = `Password reset link sent to ${email}. Please check your email.`;
                forgotPasswordForm.reset();

                // Redirect to login.html after a brief delay
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000); // 1-second delay to show success message
            } catch (error) {
                // Error message
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Failed to send reset link. Please try again later.';
            } finally {
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                submitButton.querySelector('i').classList.add('hidden');
            }
        });
    }
});