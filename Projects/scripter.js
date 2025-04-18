  const track = document.getElementById('track');
  const carousel = document.getElementById('carousel');
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;
  let index = 0;

  const slides = Array.from(track.children);

  const setPosition = () => {
    track.style.transform = `translateX(${currentTranslate}px)`;
  };

  const animate = () => {
    if (isDragging) {
      requestAnimationFrame(animate);
      setPosition();
    }
  };

  const getPositionX = (e) => e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;

  const startDrag = (e) => {
    isDragging = true;
    startX = getPositionX(e);
    animationID = requestAnimationFrame(animate);
    track.style.transition = 'none';
  };

  const drag = (e) => {
    if (!isDragging) return;
    const currentX = getPositionX(e);
    const delta = currentX - startX;
    currentTranslate = prevTranslate + delta;
  };

  const endDrag = () => {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && index < slides.length - 1) index++;
    if (movedBy > 100 && index > 0) index--;

    setSlide(index);
  };

  const setSlide = (i) => {
    index = i;
    currentTranslate = -index * carousel.offsetWidth;
    prevTranslate = currentTranslate;
    track.style.transition = 'transform 0.3s ease';
    setPosition();
  };

  // Touch Events
  carousel.addEventListener('touchstart', startDrag);
  carousel.addEventListener('touchmove', drag);
  carousel.addEventListener('touchend', endDrag);

  // Mouse Events
  carousel.addEventListener('mousedown', startDrag);
  carousel.addEventListener('mousemove', drag);
  carousel.addEventListener('mouseup', endDrag);
  carousel.addEventListener('mouseleave', () => isDragging && endDrag());

  // Resize handler to adjust slide position when resizing
  window.addEventListener('resize', () => setSlide(index));

  // Click event to move to next slide when an image is clicked
  const images = document.querySelectorAll('.carousel-slide img');
  images.forEach((image, i) => {
    image.addEventListener('click', () => {
      // Move to the next image when clicked
      if (index < slides.length - 1) {
        index++;
      } else {
        index = 0; // Go back to the first image if it's the last one
      }
      setSlide(index);
    });
  });