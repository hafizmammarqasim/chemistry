import { initializeCards } from './components/card.js';
import { initializeNavigation } from './components/navigation.js';
import { addKeyframeAnimation } from './utils/animation.js';

document.addEventListener('DOMContentLoaded', () => {
  // Add animations to document
  addKeyframeAnimation('fadeIn', 
    { opacity: '0.7', transform: 'scale(0.95)' }, 
    { opacity: '1', transform: 'scale(1)' }
  );
  
  // DOM Elements
  const slidesContainer = document.getElementById('slides-container');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const dots = document.querySelectorAll('.dot');
  const progressFill = document.getElementById('progress-fill');
  const currentQuestionEl = document.getElementById('current-question');
  const totalQuestionsEl = document.getElementById('total-questions');
  
  // Initialize card functionality
  const { resetCards } = initializeCards();
  
  // Initialize navigation
  const navigation = initializeNavigation({
    slidesContainer,
    slides,
    dots,
    progressFill,
    currentQuestionEl,
    totalQuestionsEl,
    resetCardsFn: resetCards
  });
  
  // Button event listeners
  prevBtn.addEventListener('click', () => {
    navigation.navigateToSlide(navigation.getCurrentIndex() - 1);
    navigation.stopAutoplay();
  });
  
  nextBtn.addEventListener('click', () => {
    navigation.navigateToSlide(navigation.getCurrentIndex() + 1);
    navigation.stopAutoplay();
  });
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      navigation.navigateToSlide(index);
      navigation.stopAutoplay();
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      navigation.navigateToSlide(navigation.getCurrentIndex() - 1);
      navigation.stopAutoplay();
    } else if (e.key === 'ArrowRight') {
      navigation.navigateToSlide(navigation.getCurrentIndex() + 1);
      navigation.stopAutoplay();
    }
  });
  
  // Touch/swipe navigation
  let touchStartX = 0;
  let touchEndX = 0;
  
  slidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    navigation.stopAutoplay();
  });
  
  slidesContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - go to next
      navigation.navigateToSlide(navigation.getCurrentIndex() + 1);
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - go to previous
      navigation.navigateToSlide(navigation.getCurrentIndex() - 1);
    }
  }
  
  // Start autoplay initially
  navigation.startAutoplay();
  
  // Pause autoplay on interaction, restart on inactivity
  slidesContainer.addEventListener('mouseenter', () => navigation.stopAutoplay());
  slidesContainer.addEventListener('mouseleave', () => navigation.startAutoplay());
});