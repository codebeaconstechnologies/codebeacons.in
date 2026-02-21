/* ============================================
   CODE BEACONS TECHNOLOGIES - Interactive JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // PRELOADER
    // ==========================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => preloader.remove(), 600);
        }, 800);
    });

    // ==========================================
    // SCROLL PROGRESS BAR
    // ==========================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // NAVBAR
    // ==========================================
    const navbar = document.getElementById('navbar');

    function handleScroll() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollY / docHeight) * 100;

        progressBar.style.width = scrollPercent + '%';

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ==========================================
    // MOBILE MENU
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    let overlay = document.querySelector('.nav-overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        overlay.classList.toggle('show');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMenu));

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
                revealObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

    // ==========================================
    // TYPING TEXT ANIMATION
    // ==========================================
    const typingEl = document.querySelector('.typing-text');
    if (typingEl) {
        const words = JSON.parse(typingEl.dataset.words || '[]');
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        const typingObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeEffect();
                typingObserver.unobserve(typingEl);
            }
        }, { threshold: 0.5 });
        typingObserver.observe(typingEl);
    }

    // ==========================================
    // COUNTER ANIMATION
    // ==========================================
    document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const startTime = performance.now();

                function easeOutCubic(t) {
                    return 1 - Math.pow(1 - t, 3);
                }

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easedProgress = easeOutCubic(progress);
                    counter.textContent = Math.floor(easedProgress * target);

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(update);
                counterObserver.unobserve(counter);
            }
        }, { threshold: 0.5 });
        counterObserver.observe(counter);
    });

    // ==========================================
    // TILT EFFECT ON CARDS
    // ==========================================
    const tiltCards = document.querySelectorAll('.service-card, .value-card, .mission-card, .contact-info-card, .service-detail');

    tiltCards.forEach(card => {
        if (window.matchMedia('(pointer: coarse)').matches) return; // Skip tilt on touch devices
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            card.style.transition = 'transform 0.1s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.4s ease';
        });
    });

    // ==========================================
    // MAGNETIC BUTTONS
    // ==========================================
    document.querySelectorAll('.btn-primary, .btn-white').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ==========================================
    // PARALLAX ON HERO
    // ==========================================
    const heroImage = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-content');

    if (heroImage && heroContent) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroImage.style.transform = `scale(1.1) translateY(${scrollY * 0.3}px)`;
                heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
                heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 0.8));
            }
        }, { passive: true });
    }

    // ==========================================
    // PARTICLE CANVAS IN HERO
    // ==========================================
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const canvas = document.createElement('canvas');
        canvas.className = 'hero-particles';
        heroSection.querySelector('.hero-bg').appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animId;

        function resizeCanvas() {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(10, 186, 181, ${this.opacity})`;
                ctx.fill();
            }
        }

        const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        const opacity = (1 - dist / 150) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(10, 186, 181, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawLines();
            animId = requestAnimationFrame(animateParticles);
        }

        const particleObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateParticles();
            } else {
                cancelAnimationFrame(animId);
            }
        });
        particleObserver.observe(heroSection);
    }

    // ==========================================
    // MOUSE GLOW FOLLOWER
    // ==========================================
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let glowX = 0, glowY = 0, currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        glowX = e.clientX;
        glowY = e.clientY;
    });

    function animateGlow() {
        currentX += (glowX - currentX) * 0.08;
        currentY += (glowY - currentY) * 0.08;
        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // ==========================================
    // ACTIVE NAV LINK
    // ==========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === currentPage);
    });

    // ==========================================
    // CONTACT FORM
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let valid = true;
            contactForm.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    valid = false;
                } else {
                    field.classList.remove('error');
                }
            });

            const emailField = contactForm.querySelector('[type="email"]');
            if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
                emailField.classList.add('error');
                valid = false;
            }

            if (!valid) {
                contactForm.classList.add('shake');
                setTimeout(() => contactForm.classList.remove('shake'), 600);
                return;
            }

            const submitBtn = contactForm.querySelector('.form-submit .btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.style.display = 'none';
                const successMsg = document.querySelector('.form-success');
                if (successMsg) successMsg.classList.add('show');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });

        contactForm.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', () => field.classList.remove('error'));
            field.addEventListener('focus', () => field.closest('.form-group')?.classList.add('focused'));
            field.addEventListener('blur', () => field.closest('.form-group')?.classList.remove('focused'));
        });
    }

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = navbar.offsetHeight + 20;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // SERVICE CARD IMAGE REVEAL ON HOVER (services page)
    // ==========================================
    document.querySelectorAll('.service-detail').forEach(detail => {
        const visual = detail.querySelector('.service-visual');
        if (visual) {
            detail.addEventListener('mouseenter', () => {
                visual.classList.add('active');
            });
            detail.addEventListener('mouseleave', () => {
                visual.classList.remove('active');
            });
        }
    });

    // ==========================================
    // STAGGERED GRID ANIMATION
    // ==========================================
    document.querySelectorAll('.services-grid, .values-grid, .process-steps').forEach(grid => {
        const gridObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const children = grid.children;
                Array.from(children).forEach((child, i) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, i * 120);
                });
                gridObserver.unobserve(grid);
            }
        }, { threshold: 0.15 });
        gridObserver.observe(grid);
    });
});
