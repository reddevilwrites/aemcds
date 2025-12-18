import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // 1. Setup the wrapper for scrolling
  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-wrapper';

  // 2. Transform the Table Rows into Slides
  [...block.children].forEach((row) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';

    // Image
    const pic = row.querySelector('picture');
    if (pic) {
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'carousel-image';
      imgWrapper.append(pic);
      slide.append(imgWrapper);
    }

    // Text
    const text = row.querySelector('div:last-of-type'); // Assuming text is in 2nd col
    if (text) {
      const textWrapper = document.createElement('div');
      textWrapper.className = 'carousel-text';
      textWrapper.innerHTML = text.innerHTML;
      slide.append(textWrapper);
    }

    wrapper.append(slide);
  });

  block.textContent = '';
  block.append(wrapper);

  // 3. Add Navigation Buttons
  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-nav prev';
  prevBtn.ariaLabel = 'Previous Slide';
  prevBtn.innerHTML = '&#10094;'; // Left Arrow Entity

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-nav next';
  nextBtn.ariaLabel = 'Next Slide';
  nextBtn.innerHTML = '&#10095;'; // Right Arrow Entity

  // 4. Button Logic (Scroll)
  const scrollAmount = 300; // Adjust scroll distance
  
  prevBtn.addEventListener('click', () => {
    wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  block.append(prevBtn, nextBtn);
}