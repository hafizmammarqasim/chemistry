/**
 * Utility functions for animations
 */

// Animate element with CSS keyframes
export function animateElement(element, animationName, duration = 500) {
  if (!element) return;
  
  // Reset animation
  element.style.animation = 'none';
  
  // Trigger reflow
  void element.offsetWidth;
  
  // Apply animation
  element.style.animation = `${animationName} ${duration}ms var(--easing) forwards`;
  
  return new Promise(resolve => {
    element.addEventListener('animationend', () => resolve(), { once: true });
  });
}

// Debounce function to limit how often a function is called
export function debounce(func, wait = 100) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Add keyframe animation to document
export function addKeyframeAnimation(name, fromStyles, toStyles) {
  const styleSheet = document.createElement('style');
  
  const fromStylesStr = Object.entries(fromStyles)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ');
    
  const toStylesStr = Object.entries(toStyles)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ');
  
  styleSheet.textContent = `
    @keyframes ${name} {
      from { ${fromStylesStr} }
      to { ${toStylesStr} }
    }
  `;
  
  document.head.appendChild(styleSheet);
  
  return styleSheet;
}