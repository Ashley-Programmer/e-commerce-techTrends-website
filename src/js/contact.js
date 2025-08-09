document.addEventListener('DOMContentLoaded', () => {
    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            // Get form inputs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validation
            if (!name) {
                alert('Please enter your name.');
                return;
            }
            if (!email || !emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            if (!subject) {
                alert('Please enter a subject.');
                return;
            }
            if (!message) {
                alert('Please enter a message.');
                return;
            }

            // Placeholder submission (replace with backend integration)
            alert(`Thank you, ${name}! Your message has been sent.\n\nSubject: ${subject}\nEmail: ${email}\nMessage: ${message}`);
            contactForm.reset(); // Clear form
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