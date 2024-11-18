"use strict";

/**
 * element toggle function
 */
const elemToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

/**
 * header sticky & go to top
 */
const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

/**
 * navbar toggle
 */
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {
  requestAnimationFrame(() => {
    elemToggleFunc(navToggleBtn);
    elemToggleFunc(navbar);
    elemToggleFunc(document.body);
  });
});

const navLinks = document.querySelectorAll(".navbar-link");
const navbarParent = document.getElementById("navbar");

// Fix on the navigation event listener
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    setTimeout(() => {
      navbarParent.classList.remove("active");
      navToggleBtn.classList.remove("active");
      document.body.classList.remove("active");
    }, 100);
  });
});

/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {
  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }
});

/**
 * skills & tools toggle
 */
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const toggleBox = document.querySelector("[data-toggle-box]");
const skillsBox = document.querySelector(".skills-box");

toggleBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Remove active class from all buttons
    toggleBtns.forEach((otherBtn) => {
      otherBtn.classList.remove("active");
    });
    
    // Add active class to clicked button
    btn.classList.add("active");
    
    // Toggle skills box based on which button was clicked
    if (btn.textContent.toLowerCase().includes("tools")) {
      skillsBox.classList.add("active");
      toggleBox.classList.add("active");
    } else {
      skillsBox.classList.remove("active"); 
      toggleBox.classList.remove("active");
    }
  });
});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}

// Set the select option based on the current URL
window.onload = function () {
  var langSelect = document.getElementById("lang");
  if (
    window.location.href.includes(
      "https://luthfidi.github.io/Luthfi-Portfolio-Website/index-en"
    )
  ) {
    langSelect.value = "en";
  } else if (
    window.location.href.includes(
      "https://luthfidi.github.io/Luthfi-Portfolio-Website/index-id"
    )
  ) {
    langSelect.value = "id";
  }
};

// Redirect to the appropriate language page on change
document.getElementById("lang").addEventListener("change", function () {
  var selectedLanguage = this.value;
  if (selectedLanguage === "en") {
    window.location.href =
      "https://luthfidi.github.io/Luthfi-Portfolio-Website/index-en";
  } else if (selectedLanguage === "id") {
    window.location.href =
      "https://luthfidi.github.io/Luthfi-Portfolio-Website/index-id";
  }
});

// Contact Form Script

document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS with your public key
  emailjs.init("cNVTZ3gRb19olleP4");

  const contactForm = document.querySelector(".contact-form");
  const formInputs = contactForm.querySelectorAll("input, textarea");

  // Form validation
  const validateForm = () => {
    let isValid = true;
    formInputs.forEach((input) => {
      if (input.value.trim() === "") {
        isValid = false;
        showError(input, "This field is required");
      } else if (input.type === "email" && !validateEmail(input.value)) {
        isValid = false;
        showError(input, "Please enter a valid email address");
      } else if (input.type === "tel" && !validatePhone(input.value)) {
        isValid = false;
        showError(input, "Please enter a valid phone number");
      } else {
        clearError(input);
      }
    });
    return isValid;
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[\d\s-+()]{10,}$/.test(phone);
  };

  const showError = (input, message) => {
    const formWrapper = input.closest(".form-wrapper");
    let errorElement = formWrapper.querySelector(".error-message");
    if (!errorElement) {
      errorElement = document.createElement("span");
      errorElement.classList.add("error-message");
      formWrapper.appendChild(errorElement);
    }
    errorElement.textContent = message;
    input.classList.add("error");
  };

  const clearError = (input) => {
    const formWrapper = input.closest(".form-wrapper");
    const errorElement = formWrapper.querySelector(".error-message");
    if (errorElement) {
      errorElement.remove();
    }
    input.classList.remove("error");
  };

  // Form submission
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    // Prepare template parameters
    const templateParams = {
      to_email: "luthfi.hadi@binus.ac.id",
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
    };

    try {
      // Send email using EmailJS
      await emailjs.send("service_y8n0tx6", "template_jmiu36j", templateParams);

      showNotification("Message sent successfully!", "success");
      contactForm.reset();
    } catch (error) {
      console.error("Error:", error);
      showNotification(
        "Failed to send message. Please try again later.",
        "error"
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send";
    }
  });

  // Notification system
  const showNotification = (message, type) => {
    const notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger reflow
    notification.offsetHeight;

    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  };

  // Real-time validation
  formInputs.forEach((input) => {
    input.addEventListener("blur", () => {
      if (input.value.trim() === "") {
        showError(input, "This field is required");
      } else if (input.type === "email" && !validateEmail(input.value)) {
        showError(input, "Please enter a valid email address");
      } else if (input.type === "tel" && !validatePhone(input.value)) {
        showError(input, "Please enter a valid phone number");
      } else {
        clearError(input);
      }
    });

    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        clearError(input);
      }
    });
  });
});

// cursor
console.clear();

const curlen = 20;

const cursor = document.getElementById("cursor");

let mouseX = 0;
let mouseY = 0;

let circles;
let history = Array(curlen).fill({ x: 0, y: 0 });

function onMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function initCursor() {
  for (let i = 0; i < curlen; i++) {
    let div = document.createElement("div");
    div.classList.add("cursor-circle");
    cursor.append(div);
  }
  circles = Array.from(document.querySelectorAll(".cursor-circle"));
}

function updateCursor() {
  history.shift();
  history.push({ x: mouseX, y: mouseY });

  for (let i = 0; i < curlen; i++) {
    let current = history[i];
    let next = history[i + 1] || history[curlen - 1];

    let diffx = next.x - current.x;
    let diffy = next.y - current.y;

    current.x += diffx * 0.35;
    current.y += diffy * 0.35;
    circles[i].style.transform = `translate(${current.x}px, ${
      current.y
    }px) scale(${i / curlen})`;
  }
  requestAnimationFrame(updateCursor);
}

document.addEventListener("mousemove", onMouseMove, false);

initCursor();
updateCursor();

//scrollbar
function initCustomScrollbar() {
  const scrollbar = document.createElement("div");
  scrollbar.className = "custom-scrollbar";

  const thumb = document.createElement("div");
  thumb.className = "custom-scrollbar-thumb";

  scrollbar.appendChild(thumb);
  document.body.appendChild(scrollbar);

  // Update thumb height and position
  function updateScrollbar() {
    const scrollPercent =
      window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight);
    const thumbHeight =
      (window.innerHeight / document.documentElement.scrollHeight) *
      window.innerHeight;

    thumb.style.height = `${thumbHeight}px`;
    thumb.style.top = `${scrollPercent * (window.innerHeight - thumbHeight)}px`;
  }

  window.addEventListener("scroll", updateScrollbar);
  window.addEventListener("resize", updateScrollbar);
  updateScrollbar();
}

initCustomScrollbar();

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });
    });
});