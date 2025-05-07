/**
 * Navigation and slider functionality
 */

import { animateElement } from '../utils/animation.js';

export function initializeNavigation({ 
  slidesContainer, 
  slides,
  dots,
  progressFill,
  currentQuestionEl,
  totalQuestionsEl,
  resetCardsFn
}) {
  // Variables
  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayInterval;
  
  // Initialize counter
  updateQuestionCounter();
  
  function navigateToSlide(index) {
    // Reset any flipped cards
    resetCardsFn();
    
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
    
    // Update question counter
    updateQuestionCounter();
    
    // Add entrance animation for the new active slide
    animateElement(slides[index], 'fadeIn');
  }
  
  function updateProgressBar() {
    const progressPercentage = ((currentIndex + 1) / totalSlides) * 100;
    progressFill.style.width = `${progressPercentage}%`;
  }
  
  function updateQuestionCounter() {
    currentQuestionEl.textContent = currentIndex + 1;
    totalQuestionsEl.textContent = totalSlides;
  }
  
  function startAutoplay(interval = 7000) {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      navigateToSlide(currentIndex + 1);
    }, interval);
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  function getCurrentIndex() {
    return currentIndex;
  }
  
  function getTotalSlides() {
    return totalSlides;
  }
  
  return {
    navigateToSlide,
    startAutoplay,
    stopAutoplay,
    getCurrentIndex,
    getTotalSlides
  };
}