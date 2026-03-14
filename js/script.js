/* =========================================
   SAO VIỆT | Main Script
========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Preloader ---
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Malé zpoždění pro plynulejší přechod ("wow" efekt)
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 800);
        }
    });

    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Navigation Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Zavření menu po kliknutí na odkaz
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // --- 3. Smooth Scrolling pro Anchor Odkazy ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Pouze pokud mají href='#neco' a ukazuje to na element
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Offset pro fixní hlavičku (zhruba 80px)
                    const yOffset = -80;
                    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 4. Scroll Animations (Intersection Observer) ---
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                // Přestat sledovat element jakmile se ukáže
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- 5. Menu Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const totalImages = 14;
    let currentImageIndex = 0;

    window.openLightbox = function (index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Zabrání scrollování okolo modalu
    };

    window.closeLightbox = function () {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    window.changeLightboxImage = function (step) {
        currentImageIndex += step;

        // Zacyklení galerie
        if (currentImageIndex >= totalImages) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = totalImages - 1;
        }

        updateLightboxImage();
    };

    function updateLightboxImage() {
        const imageNumber = currentImageIndex + 1;
        lightboxImg.src = `assets/images/menu/menu-page-${imageNumber}.jpg`;
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
                closeLightbox();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                changeLightboxImage(1);
            } else if (e.key === 'ArrowLeft') {
                changeLightboxImage(-1);
            }
        });
    }

});
