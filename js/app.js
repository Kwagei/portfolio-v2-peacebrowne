document.addEventListener("click", (event) => {
  const targetEle = event.target;
  const targetEleClas = Array.from(targetEle.classList);

  if (targetEleClas.includes("angle"))
    targetEleClas.includes("right-arrow")
      ? carousal("right")
      : carousal("left");
});

const heroSlider = findEle(".hero-section").querySelectorAll(".hero-container");
let currentPosition = 0;

function carousal(direction) {
  if (currentPosition < 0) currentPosition = heroSlider.length - 1;
  if (currentPosition === heroSlider.length) currentPosition = 0;

  const currentSlide = heroSlider[currentPosition];
  const nextSlide = !heroSlider[currentPosition + 1]
    ? heroSlider[0]
    : heroSlider[currentPosition + 1];
  const prevSlide = !heroSlider[currentPosition - 1]
    ? heroSlider[heroSlider.length - 1]
    : heroSlider[currentPosition - 1];

  direction === "right"
    ? slideLeft(currentSlide, nextSlide)
    : slideRight(currentSlide, prevSlide);
}

function slideLeft(currentSlide, nextSlide) {
  toggle_class(currentSlide, "slide-left-off");

  toggle_class(nextSlide, "active-hero");
  toggle_class(nextSlide, "slide-left-on");

  setTimeout(() => {
    remove_class(currentSlide, "slide-left-off");
    toggle_class(currentSlide, "active-hero");
    remove_class(nextSlide, "slide-left-on");
    slideUp(currentSlide);
    slideUp(nextSlide);
  }, 1000);

  currentPosition++;
}

function slideRight(currentSlide, prevSlide) {
  toggle_class(currentSlide, "slide-right-off");

  toggle_class(prevSlide, "active-hero");
  toggle_class(prevSlide, "slide-right-on");

  setTimeout(() => {
    remove_class(currentSlide, "slide-right-off");
    toggle_class(currentSlide, "active-hero");
    remove_class(prevSlide, "slide-right-on");
    slideUp(currentSlide);
    slideUp(prevSlide);
  }, 1000);

  currentPosition--;
}

function slideUp(currentSlide) {
  const slides = ["hero-title", "hero-text", "hero-btn"];
  const elements = [
    currentSlide.querySelector("h1"),
    currentSlide.querySelector("h3"),
    currentSlide.querySelector("button"),
  ];

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    toggle_class(element, slides[i]);
  }
}

slideUp(heroSlider[0]);

setInterval(() => {
  carousal("right");
}, 5000);
