document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    let isPaused = false;
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slides');
    const pauseButton = document.getElementById('pause');
    const fadeButton = document.getElementById('fade');
    let useFade = false;
    let autoSlideInterval;
    const slideIntervalTime = 3000;
  
    function updateSliderPosition() {
      slides.forEach((slide, index) => {
        slide.style.transition = 'opacity 1s ease';
        slide.style.opacity = '0'; 
      });
  
      if (!useFade) {
        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(-${100 * currentIndex}%)`;
        slides[currentIndex].style.opacity = '1'; 
      } else {
        slides[currentIndex].style.opacity = '1'; 
      }
    }
  
    function moveToNextSlide() {
      if (!isPaused) {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSliderPosition();
      }
    }
  
    document.getElementById('next').addEventListener('click', moveToNextSlide);
  
    document.getElementById('prev').addEventListener('click', () => {
      if (!isPaused) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSliderPosition();
      }
    });
  
    pauseButton.addEventListener('click', () => {
      isPaused = !isPaused;
      pauseButton.textContent = isPaused ? "Wznowienie" : "Pauza";
      if (isPaused) {
        clearInterval(autoSlideInterval);
      } else {
        autoSlideInterval = setInterval(moveToNextSlide, slideIntervalTime);
      }
    });
  
    fadeButton.addEventListener('click', () => {
      useFade = !useFade;
      fadeButton.textContent = useFade ? "Przewijanie" : "Przenikanie";
      if (useFade) {
        slider.style.transform = 'translateX(0%)'; 
        slides.forEach(slide => slide.style.opacity = '0'); 
        slides[currentIndex].style.opacity = '1'; 
      }
      updateSliderPosition();
    });
  
    autoSlideInterval = setInterval(moveToNextSlide, slideIntervalTime);
  });
  