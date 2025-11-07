// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // We must add aria-expanded to the HTML button for accessibility.
        // This script will manage its state.
        menuToggle.setAttribute('aria-expanded', 'false');

        menuToggle.addEventListener('click', () => {
            // Toggle the .active class (defined in CSS) to show/hide menu
            navLinks.classList.toggle('active');
            
            // Update ARIA attribute for screen readers
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // --- 2. Smooth Scrolling for One-Page Navigation ---
    
    // Reusable scroll handler function
    const smoothScroll = (e) => {
        // Prevent the default anchor jump
        e.preventDefault();
        
        const targetId = e.currentTarget.getAttribute('href');
        
        // Handle edge case of href="#"
        if (targetId === '#') return; 

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Scroll smoothly to the target section
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Aligns the top of the element to the top of the viewport
            });
        }
        
        // If the mobile menu is open, close it after clicking a link
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    };

    // Select ALL links that start with '#' (internal anchors)
    // This covers both the main nav and the hero CTA button.
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        // Exclude simple '#' links that don't go anywhere
        if (link.getAttribute('href').length > 1) {
            link.addEventListener('click', smoothScroll);
        }
    });


    // --- 3. Dynamic Copyright Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});