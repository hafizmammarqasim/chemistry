/**
 * Card component functionality
 */

export function initializeCards() {
  const revealButtons = document.querySelectorAll('.reveal-btn');
  const backButtons = document.querySelectorAll('.back-to-question-btn');
  
  // Flip card to show answer
  revealButtons.forEach(btn => {
    btn.addEventListener('click', event => {
      const card = event.target.closest('.card');
      card.classList.add('flipped');
      
      // Add sound effect if available
      playSound('flip');
    });
  });
  
  // Flip card back to show question
  backButtons.forEach(btn => {
    btn.addEventListener('click', event => {
      const card = event.target.closest('.card');
      card.classList.remove('flipped');
      
      // Add sound effect if available
      playSound('flip-back');
    });
  });
  
  // Reset all cards (for when navigating to a new slide)
  function resetCards() {
    document.querySelectorAll('.card.flipped').forEach(card => {
      card.classList.remove('flipped');
    });
  }
  
  // Optional sound effects
  function playSound(soundName) {
    // Could implement sound effects here if needed
    console.log(`Would play sound: ${soundName}`);
  }
  
  return {
    resetCards
  };
}