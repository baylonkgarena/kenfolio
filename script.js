// Navigation bar Active status
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("text-blue-500", "border-b-2");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("text-blue-500"); // Added only the color change, no underline.
    }
  });
});


// Sending Email
function sendEmail() {
  window.open("mailto:kenzbaylon@gmail.com", "_blank");
}


// Refresh website
window.addEventListener("load", () => {
  if (window.location.hash !== "#home") {
    window.location.replace(window.location.origin + window.location.pathname + "#home");
  }
});


// Function to update the active link and change the URL hash based on scroll position
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    let currentSection = "";

    // Determine which section is currently in the viewport
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 2 && window.scrollY < sectionTop + sectionHeight - sectionHeight / 2) {
        currentSection = section.getAttribute("id");
      }
    });

    // Update the URL hash without reloading the page
    if (currentSection && window.location.hash !== `#${currentSection}`) {
      window.history.pushState(null, null, `#${currentSection}`);
    }

    // Highlight the active link based on the section in view
    navLinks.forEach(link => {
      link.classList.remove("text-blue-500", "border-b-2");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("text-blue-500", "border-b-2");
      }
    });
  });