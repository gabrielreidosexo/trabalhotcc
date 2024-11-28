const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel-button-left');
const nextButton = document.querySelector('.carousel-button-right');
const carouselNav = document.querySelector('.carousel-nav');
const carouselNavButtons = Array.from(carouselNav.children);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.offsetLeft + 'px)';
    currentSlide.classList.remove('active');
    targetSlide.classList.add('active');
}

const updateCarouselNavButtons = (currentNavButton, targetButton) => {
    currentNavButton.classList.remove('active');
    targetButton.classList.add('active');
}

const toggleNavArrowsVisibility = (targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }  else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

window.addEventListener('resize', () => {
    track.style.transform = 'translateX(-' + track.querySelector('.active').offsetLeft + 'px)';
})

prevButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.active');
    const prevSlide = currentSlide.previousElementSibling;
    const currentNavButton = carouselNav.querySelector('.active');
    const prevNavButton = currentNavButton.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateCarouselNavButtons(currentNavButton, prevNavButton);
    toggleNavArrowsVisibility(prevIndex);
});

nextButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.active');
    const nextSlide = currentSlide.nextElementSibling;
    const currentNavButton = carouselNav.querySelector('.active');
    const nextNavButton = currentNavButton.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateCarouselNavButtons(currentNavButton, nextNavButton);
    toggleNavArrowsVisibility(nextIndex);
});

carouselNav.addEventListener('click', (e) => {
    const targetButton = e.target.closest('button');

    if (!targetButton) return;

    const currentSlide = track.querySelector('.active');
    const currentNavButton = carouselNav.querySelector('.active');
    const targetIndex = carouselNavButtons.findIndex(button =>  button === targetButton);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateCarouselNavButtons(currentNavButton, targetButton);
    toggleNavArrowsVisibility(targetIndex);
});
