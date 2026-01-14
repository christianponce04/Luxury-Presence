
document.addEventListener('DOMContentLoaded', function () {

    // hamburger mobile
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('nav-overlay');
    const links = navLinks.querySelectorAll('a');
  
    function openMenu() {
      hamburger.classList.add('active');
      navLinks.classList.add('active');
      overlay.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      links[0].focus();
      document.body.style.overflow = 'hidden';
    }
  
    function closeMenu() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.focus();
      document.body.style.overflow = '';
    }
  
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.contains('active');
      isOpen ? closeMenu() : openMenu();
    });
  
    overlay.addEventListener('click', closeMenu);
  
    links.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
      }
    });

// carousel gallery

var splide = new Splide( '.splide',{
    type      : 'loop',    
    perPage   : 2,        
    perMove   : 1,         
    gap: '24px',
    autoplay  : true,
    interval  : 3000,
    arrows    : true,
    pagination: false,
    width : '100vw',
    height: '47vh',
    breakpoints: {
        1024: {
          perPage: 1,
        },
      }
} );

var bar    = splide.root.querySelector( '.my-carousel-progress-bar' );

// Updates the bar width whenever the carousel moves:
splide.on( 'mounted move', function () {
  var end  = splide.Components.Controller.getEnd() + 1;
  var rate = Math.min( ( splide.index + 1 ) / end, 1 );
  bar.style.width = String( 100 * rate ) + '%';
} );

splide.mount();

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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


// Animated counters
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation for stats
            if (entry.target.classList.contains('stat-item')) {
                const counter = entry.target.querySelector('.counter');
                if (counter && !counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            }
        }
    });
});

// Observe elements
document.querySelectorAll('.stat-item').forEach(el => {
    observer.observe(el);
});


// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (document.getElementById('lightbox').classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            changeImage(-1, e);
        } else if (e.key === 'ArrowRight') {
            changeImage(1, e);
        } else if (e.key === 'Escape') {
            closeLightbox(e);
        }
    }
});

// animation for wow
    new WOW().init();
  });