document.addEventListener('DOMContentLoaded', () => {
    // Button Alert
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            alert('You are being redirected to join this group!');
        });
    });

    // Scroll Reveal for Categories
    const categories = document.querySelectorAll('.category');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        categories.forEach(category => {
            const categoryTop = category.getBoundingClientRect().top;

            if (categoryTop < triggerBottom) {
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
            } else {
                category.style.opacity = '0';
                category.style.transform = 'translateY(50px)';
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
