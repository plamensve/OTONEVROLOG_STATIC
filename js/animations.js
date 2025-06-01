document.addEventListener('DOMContentLoaded', () => {
    // Add animations only to specific elements
    const animatedElements = {
        'service-card': 'fade-in',
        'info-item': 'slide-in',
        'hero-content': 'fade-in',
        'hero-image': 'slide-in',
        'section-header': 'fade-in',
        'ung-text': 'fade-in',
        'ung-image': 'slide-in'
    };

    // Apply animation classes
    Object.entries(animatedElements).forEach(([className, animation]) => {
        document.querySelectorAll(`.${className}`).forEach((element, index) => {
            element.classList.add(animation);
            element.style.animationDelay = `${index * 0.2}s`;
        });
    });

    // Intersection Observer for animations
    const fadeOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, fadeOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .slide-in').forEach(element => {
        fadeObserver.observe(element);
    });

    // Parallax effect for background elements
    const parallaxElements = document.querySelectorAll('.parallax');
    
    function updateParallax() {
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(window.pageYOffset * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
    });
}); 