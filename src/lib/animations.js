// Intersection Observer for scroll-triggered animations
export function initScrollAnimations() {
  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '-50px 0px -50px 0px'
    }
  );

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale, .animate-on-scroll-rotate'
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Staggered animations for lists
  const staggerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.stagger-item');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animate-in');
            }, index * 100); // 100ms delay between items
          });
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '-50px 0px -50px 0px'
    }
  );

  const staggerContainers = document.querySelectorAll('.stagger-container');
  staggerContainers.forEach((container) => {
    staggerObserver.observe(container);
  });
}

// Initialize animations when DOM is loaded
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
}
