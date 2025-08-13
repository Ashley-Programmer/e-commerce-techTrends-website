document.addEventListener('DOMContentLoaded', () => {
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            // Get submit button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            submitButton.querySelector('i').classList.remove('hidden');

            // Clear previous messages
            formMessage.className = 'form-message';
            formMessage.textContent = '';

            // Get form inputs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validation
            if (!name) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please enter your name.';
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                submitButton.querySelector('i').classList.add('hidden');
                return;
            }
            if (!email || !emailRegex.test(email)) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please enter a valid email address.';
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                submitButton.querySelector('i').classList.add('hidden');
                return;
            }
            if (!subject) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please enter a subject.';
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                submitButton.querySelector('i').classList.add('hidden');
                return;
            }
            if (!message) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please enter a message.';
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                submitButton.querySelector('i').classList.add('hidden');
                return;
            }

            try {
                // Simulate async submission (replace with actual backend call)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Success message
                formMessage.className = 'form-message success';
                formMessage.textContent = `Thank you, ${name}! Your message has been sent.`;
                contactForm.reset(); // Clear form
            } catch (error) {
                // Error message
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Failed to send message. Please try again later.';
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