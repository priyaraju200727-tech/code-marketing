// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       PRELOADER
       ========================================= */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Trigger initial animations after preloader is gone
                reveal();
                animateSkillBars();
            }, 500);
        }, 1000);
    });

    /* =========================================
       DYNAMIC YEAR IN FOOTER
       ========================================= */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* =========================================
       MOBILE MENU TOGGLE
       ========================================= */
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    /* =========================================
       STICKY HEADER & ACTIVE NAV LINK
       ========================================= */
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Back to top button visibility
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Active Nav Link on Scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    /* =========================================
       TYPING ANIMATION
       ========================================= */
    const typingText = document.querySelector('.typing-text');
    const words = ['Frontend Developer', 'UI/UX Designer', 'Freelancer', 'JS Expert', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        if (!typingText) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex++;
            if (wordIndex >= words.length) {
                wordIndex = 0;
            }
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1500);

    /* =========================================
       SCROLL REVEAL ANIMATIONS
       ========================================= */
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }
    window.addEventListener('scroll', reveal);

    /* =========================================
       ANIMATED COUNTERS (ABOUT SECTION)
       ========================================= */
    const counters = document.querySelectorAll('.counter');
    let countersStarted = false;

    function startCounters() {
        if (countersStarted) return;
        
        const statsSection = document.querySelector('.stats-container');
        if (!statsSection) return;
        
        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 50) {
            countersStarted = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target + '+';
                    }
                };
                updateCounter();
            });
        }
    }
    window.addEventListener('scroll', startCounters);

    /* =========================================
       SKILL BAR ANIMATION
       ========================================= */
    let skillsAnimated = false;
    
    function animateSkillBars() {
        if (skillsAnimated) return;
        
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;
        
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            skillsAnimated = true;
            const progressLines = document.querySelectorAll('.progress-line span');
            progressLines.forEach(line => {
                const width = line.parentElement.getAttribute('data-width');
                line.style.width = width;
            });
        }
    }
    window.addEventListener('scroll', animateSkillBars);

    /* =========================================
       PROJECT FILTERING
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                // Reset display first
                card.style.display = 'none';
                
                // Show matching cards
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    // Small delay to allow display to apply before animating opacity
                    setTimeout(() => {
                        card.style.display = 'flex';
                        card.style.animation = 'fadeScale 0.5s ease forwards';
                    }, 10);
                }
            });
        });
    });

    // Add keyframes for filter animation dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeScale {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    /* =========================================
       TESTIMONIAL SLIDER
       ========================================= */
    const track = document.getElementById('testimonialTrack');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;
    const totalSlides = dots.length;
    let slideInterval;

    function goToSlide(index) {
        if (!track) return;
        
        track.style.transform = `translateX(-${index * 100}%)`;
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= totalSlides) next = 0;
        goToSlide(next);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopSlideShow();
            startSlideShow(); // restart timer
        });
    });

    // Pause on hover
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopSlideShow);
        sliderContainer.addEventListener('mouseleave', startSlideShow);
        startSlideShow();
    }

    /* =========================================
       FORM SUBMISSION HANDLER
       ========================================= */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Show sending state
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.style.pointerEvents = 'none';
            
            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent Successfully!';
                btn.classList.add('btn-success'); // You can style this in CSS
                
                // Reset form
                contactForm.reset();
                
                // Revert button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.pointerEvents = 'auto';
                    btn.classList.remove('btn-success');
                }, 3000);
            }, 1500);
        });
    }
});
