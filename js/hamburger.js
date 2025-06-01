document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Variables
    let lastScroll = 0;
    let isMenuOpen = false;

    // Toggle mobile menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    // Smooth scroll to section
    function scrollToSection(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            if (isMenuOpen) {
                toggleMenu();
            }
        }
    }

    // Header scroll behavior
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Show/hide header on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('header-scrolled');
            header.classList.remove('header-visible');
        } else {
            header.classList.remove('header-scrolled');
            header.classList.add('header-visible');
        }
        
        lastScroll = currentScroll;
    }

    // Close menu when clicking a link
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Event Listeners
    hamburger.addEventListener('click', toggleMenu);
    
    navItems.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });

    window.addEventListener('scroll', handleScroll);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInside = navLinks.contains(e.target) || hamburger.contains(e.target);
        if (!isClickInside && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Intersection Observer for animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1 }
    );

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 200; // Offset for fixed header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Update navigation highlighting on scroll
    window.addEventListener('scroll', highlightNavigation);
    
    // Initial highlight check
    highlightNavigation();
});
