const cards = document.querySelectorAll(".card");
const wrap = document.querySelector(".wrap");

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  console.log(rect);
  console.log(el);
  console.log(window.innerHeight);
  console.log(window.innerWidth);
  console.log(document.documentElement.clientHeight);
  console.log(document.documentElement.clientWidth);
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function isCardVisible() {
  for (card of cards) {
    isElementInViewport(card)
      ? card.classList.add("isVisible")
      : card.classList.remove("isVisible");
  }
}

document.addEventListener("DOMContentLoaded", isCardVisible);
window.addEventListener("scroll", isCardVisible);
wrap.addEventListener("scroll", isCardVisible);
window.addEventListener("resize", isCardVisible);

// fade-in on scroll

const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el);
    }
  });
};

window.addEventListener("scroll", () => {
  handleScrollAnimation();
});

// var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
//     window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

// var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

// var rAF;
