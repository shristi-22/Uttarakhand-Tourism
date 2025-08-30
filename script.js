document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    let slideTimer;

    function showSlide(n) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
        });
        
        // Calculate the new current slide index
        currentSlide = (n + slides.length) % slides.length;
        
        // Add active class and show the current slide
        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.zIndex = '1';
        
        // Update button states
        if (prevBtn && nextBtn) {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        }
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startTimer() {
        if (slideTimer) {
            clearInterval(slideTimer);
        }
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    function resetTimer() {
        clearInterval(slideTimer);
        startTimer();
    }

    // Initialize slider controls
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
            resetTimer();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
            resetTimer();
        });
    }

    // Start the slideshow
    if (slides.length > 0) {
        showSlide(0); // Show first slide
        startTimer();
    }

    // Pause slideshow on hover
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => clearInterval(slideTimer));
        heroSection.addEventListener('mouseleave', startTimer);
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navbarUl = document.querySelector('.navbar ul');

    if (menuToggle && navbarUl) {
        menuToggle.addEventListener('click', function() {
            navbarUl.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation on Scroll
    const animateElements = document.querySelectorAll('.animate-slide-up');
    
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(element);
    });

    // Form Validation (if contact form exists)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && !isValidEmail(emailField.value)) {
                isValid = false;
                emailField.classList.add('error');
            }

            if (isValid) {
                // Show success message
                alert('Thank you for your message. We will get back to you soon!');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }
});

// Email validation helper function
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Lazy loading images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));
});
