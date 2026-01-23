 // Header scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe all fade-in sections
        document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
        
        // Observe gallery items with stagger effect
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.15}s`;
            observer.observe(item);
        });

        // Carousel functionality
        const track = document.getElementById('carouselTrack');
        const dots = document.querySelectorAll('.carousel-dot');
        let currentIndex = 0;
        let autoplayInterval;

        function goToSlide(index) {
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % 15;
            goToSlide(currentIndex);
        }

        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 2000);
        }

        
  // KEYBOARD NAVIGATION FOR IMAGE CAROUSEL
  document.addEventListener("keydown", (e) => {

    // Avoid conflict when typing in inputs (future-proof)
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    if (e.key === "ArrowRight") {
      stopAutoplay();
      nextSlide();
      startAutoplay();
    }

    if (e.key === "ArrowLeft") {
      stopAutoplay();
      currentIndex = (currentIndex - 1 + dots.length) % dots.length;
      goToSlide(currentIndex);
      startAutoplay();
    }
  });



        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        // Dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                stopAutoplay();
                goToSlide(parseInt(dot.dataset.index));
                startAutoplay();
            });
        });

        // Start autoplay
        startAutoplay();

    //Loader
     window.addEventListener("load", () => {
    const loader = document.getElementById("page-loader");
    const video = document.getElementById("loader-video");

    /* Fallback: hide loader after 5s */
    const maxTime = setTimeout(hideLoader, 5000);

    function hideLoader() {
      loader.classList.add("hide");
      clearTimeout(maxTime);
    }

    /* Hide loader when video ends */
    if (video) {
      video.addEventListener("ended", hideLoader);
    }
     });


        // Pause on hover
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);

        // Smooth scroll for anchor links
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

// VIDEO CAROUSEL (ARROWS + DOTS + AUTOPLAY)

const videoTrack = document.getElementById("videoTrack");
const videoSlides = document.querySelectorAll(".video-slide video");
const videoPrev = document.getElementById("videoPrev");
const videoNext = document.getElementById("videoNext");
const videoDots = document.querySelectorAll(".video-dot");

let videoIndex = 0;

// Init
videoSlides.forEach(v => {
  v.muted = true;
  v.pause();
  v.currentTime = 0;
});

function updateVideoCarousel() {
  videoTrack.style.transform = `translateX(-${videoIndex * 100}%)`;

  videoSlides.forEach((video, i) => {
    if (i === videoIndex) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });

  videoDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === videoIndex);
  });
}

// Arrows
videoNext.addEventListener("click", () => {
  videoIndex = (videoIndex + 1) % videoSlides.length;
  updateVideoCarousel();
});

videoPrev.addEventListener("click", () => {
  videoIndex = (videoIndex - 1 + videoSlides.length) % videoSlides.length;
  updateVideoCarousel();
});

// Dots
videoDots.forEach(dot => {
  dot.addEventListener("click", () => {
    videoIndex = parseInt(dot.dataset.index);
    updateVideoCarousel();
  });
});

// Auto move on video end
videoSlides.forEach(video => {
  video.addEventListener("ended", () => {
    videoIndex = (videoIndex + 1) % videoSlides.length;
    updateVideoCarousel();
  });
});

// Start
updateVideoCarousel();



  // CLIENT LOGO SCROLL ANIMATION
const clientLogos = document.querySelectorAll('.clients-grid img');

const clientObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 120);
    }
  });
}, {
  threshold: 0.2
});

clientLogos.forEach(logo => clientObserver.observe(logo));

  // CLIENT LOGO SCROLL ANIMATION
  
  const lines = document.querySelectorAll('.film-rotate span');
  let i = 0;

  setInterval(() => {
    lines[i].classList.remove('active');
    lines[i].classList.add('exit');

    i = (i + 1) % lines.length;

    lines[i].classList.remove('exit');
    lines[i].classList.add('active');
  }, 3200);



  /* TEAM MEMBER STAGGER ANIMATION */
  const teamMembers = document.querySelectorAll('.team-member');

  const teamObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 180); // stagger delay
      }
    });
  }, {
    threshold: 0.2
  });

  teamMembers.forEach(member => teamObserver.observe(member));


const progressBar = document.getElementById("videoProgressBar");

videoSlides.forEach(video => {
  video.addEventListener("timeupdate", () => {
    if (video.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${progress}%`;
    }
  });

  video.addEventListener("ended", () => {
    progressBar.style.width = "0%";
  });
});


/* ===============================
   KEYBOARD NAVIGATION – VIDEO CAROUSEL
================================ */

document.addEventListener("keydown", (e) => {

  // Ignore typing contexts
  if (
    e.target.tagName === "INPUT" ||
    e.target.tagName === "TEXTAREA" ||
    e.target.isContentEditable
  ) return;

  // RIGHT ARROW → NEXT VIDEO
  if (e.key === "ArrowRight") {
    videoIndex = (videoIndex + 1) % videoSlides.length;
    updateVideoCarousel();
  }

  // LEFT ARROW ← PREVIOUS VIDEO
  if (e.key === "ArrowLeft") {
    videoIndex = (videoIndex - 1 + videoSlides.length) % videoSlides.length;
    updateVideoCarousel();
  }
});


/* ===============================
   LAZY LOAD VIDEOS ON VISIBILITY
================================ */

const lazyVideos = document.querySelectorAll("video[preload='none']");

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const video = entry.target;
      if (!video.dataset.loaded) {
        video.load();
        video.dataset.loaded = "true";
      }
    }
  });
}, {
  threshold: 0.25
});

lazyVideos.forEach(video => videoObserver.observe(video));


/* ===============================
   TOUCH SWIPE – IMAGE & VIDEO CAROUSELS
================================ */

function enableSwipe(container, onSwipeLeft, onSwipeRight) {
  let startX = 0;
  let endX = 0;

  container.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  container.addEventListener("touchmove", e => {
    endX = e.touches[0].clientX;
  }, { passive: true });

  container.addEventListener("touchend", () => {
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? onSwipeLeft() : onSwipeRight();
    }
  });
}

/* IMAGE CAROUSEL SWIPE */
enableSwipe(
  document.querySelector(".carousel-container"),
  () => nextSlide(),
  () => {
    currentIndex = (currentIndex - 1 + dots.length) % dots.length;
    goToSlide(currentIndex);
  }
);

/* VIDEO CAROUSEL SWIPE */
enableSwipe(
  document.querySelector(".video-viewport"),
  () => {
    videoIndex = (videoIndex + 1) % videoSlides.length;
    updateVideoCarousel();
  },
  () => {
    videoIndex = (videoIndex - 1 + videoSlides.length) % videoSlides.length;
    updateVideoCarousel();
  }
);

