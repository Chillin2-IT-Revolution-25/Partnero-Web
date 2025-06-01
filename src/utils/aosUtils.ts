import AOS from 'aos';
import 'aos/dist/aos.css';

export const initAOS = () => {
  AOS.init({
    // Global settings
    duration: 650, // Animation duration in ms (reduced from 800 for faster animations)
    easing: 'ease-out-cubic', // Default easing
    once: true, // Whether animation should happen only once
    mirror: false, // Whether elements should animate out while scrolling past them
    offset: 50, // Offset (in px) from the original trigger point
    delay: 0, // Default delay before animation starts
    anchorPlacement: 'top-bottom', // Defines which position of the element regarding to window should trigger the animation
  });
};

export const refreshAOS = () => {
  AOS.refresh();
};