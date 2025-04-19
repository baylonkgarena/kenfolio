// Navigation bar Active status + Update URL hash on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

// Debounce function to limit scroll event calls
function debounce(func, wait = 20, immediate = false) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Scroll handler to update nav link and URL hash
function handleScroll() {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop - sectionHeight / 2 &&
      window.scrollY < sectionTop + sectionHeight - sectionHeight / 2
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  // Update URL hash without reload
  if (currentSection && window.location.hash !== `#${currentSection}`) {
    window.history.pushState(null, null, `#${currentSection}`);
  }

  // Highlight the current nav link
  navLinks.forEach(link => {
    link.classList.remove("text-blue-500", "border-b-2");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("text-blue-500", "border-b-2");
    }
  });
}

// Attach debounced scroll listener
window.addEventListener("scroll", debounce(handleScroll));

// Send Email Function
function sendEmail() {
  animateEmailButtonClick(); // Trigger the animation
  window.open("mailto:kenzbaylon@gmail.com", "_blank"); // Open the email client
}

// Function to animate the email button click
function animateEmailButtonClick() {
  const emailButton = document.querySelector("button.mt-4"); // This selects the button with the class 'mt-4'

  // Add the animation class to the button
  emailButton.classList.add("animate-click");

  // Remove the animation class after the animation ends
  emailButton.addEventListener("animationend", () => {
    emailButton.classList.remove("animate-click");
  });
}

// Force refresh to #home section on load
window.addEventListener("load", () => {
  if (window.location.hash !== "#home") {
    window.location.replace(window.location.origin + window.location.pathname + "#home");
  }
});
