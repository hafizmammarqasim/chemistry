document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const slidesContainer = document.getElementById('slides-container');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const dots = document.querySelectorAll('.dot');
  const progressFill = document.getElementById('progress-fill');
  const currentQuestionEl = document.getElementById('current-question');
  const totalQuestionsEl = document.getElementById('total-questions');
  
  // Variables
  let currentIndex = 0;
  const totalSlides = slides.length;
  
  // Initialize
  updateProgressBar();
  
  // Event Listeners
  prevBtn.addEventListener('click', () => {
    navigateToSlide(currentIndex - 1);
  });
  
  nextBtn.addEventListener('click', () => {
    navigateToSlide(currentIndex + 1);
  });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      navigateToSlide(index);
    });
  });
  
  document.querySelectorAll('.reveal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      card.classList.add('flipped');
    });
  });
  
  document.querySelectorAll('.back-to-question-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      card.classList.remove('flipped');
    });
  });
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      navigateToSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      navigateToSlide(currentIndex + 1);
    }
  });
  
  // Add swipe gestures
  let touchStartX = 0;
  let touchEndX = 0;
  
  slidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  slidesContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - go to next
      navigateToSlide(currentIndex + 1);
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - go to previous
      navigateToSlide(currentIndex - 1);
    }
  }
  
  // Functions
  function navigateToSlide(index) {
    // Reset any flipped cards
    document.querySelectorAll('.card.flipped').forEach(card => {
      card.classList.remove('flipped');
    });
    
    // Handle wrap-around
    if (index < 0) {
      index = totalSlides - 1;
    } else if (index >= totalSlides) {
      index = 0;
    }
    
    // Update current index
    currentIndex = index;
    
    // Update slides container position
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    
    // Update active class
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    // Update progress bar
    updateProgressBar();
    
    // Add a subtle entrance animation for the new active slide
    const activeSlide = slides[index];
    activeSlide.style.animation = 'none';
    // Trigger reflow
    void activeSlide.offsetWidth;
    activeSlide.style.animation = 'fadeIn 0.5s ease forwards';
  }
  
  function updateProgressBar() {
    // Update progress bar
    const progressPercentage = ((currentIndex + 1) / totalSlides) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    
    // Update question counter
    currentQuestionEl.textContent = currentIndex + 1;
    totalQuestionsEl.textContent = totalSlides;
  }
  
  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0.7; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
  
  // Add automatic transition for demo purposes
  let autoplayInterval;
  
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      navigateToSlide(currentIndex + 1);
    }, 7000); // Change slide every 7 seconds
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  // Start autoplay initially
  startAutoplay();
  
  // Stop autoplay on user interaction
  slidesContainer.addEventListener('mouseenter', stopAutoplay);
  slidesContainer.addEventListener('touchstart', stopAutoplay);
  prevBtn.addEventListener('click', stopAutoplay);
  nextBtn.addEventListener('click', stopAutoplay);
  dots.forEach(dot => dot.addEventListener('click', stopAutoplay));
  
  // Restart autoplay after inactivity
  slidesContainer.addEventListener('mouseleave', startAutoplay);
  
  // Preload next and previous slides for smoother transitions
  function preloadAdjacentSlides() {
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    const nextIndex = (currentIndex + 1) % totalSlides;
    
    // Add a class to preload adjacent slides
    slides[prevIndex].classList.add('preload');
    slides[nextIndex].classList.add('preload');
  }
  
  // Call preload function initially
  preloadAdjacentSlides();
  
  // Update preloaded slides when current slide changes
  slidesContainer.addEventListener('transitionend', preloadAdjacentSlides);
});