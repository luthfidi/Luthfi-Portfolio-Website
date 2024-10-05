'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }

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

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});

const navLink = document.querySelectorAll(".navbar-link");
const navbarParent = document.getElementById('navbar');

for (let i = 0; i < navLink.length; i++) {
  navLink[i].addEventListener("click", function () {
    navbarParent.classList.toggle("active");
    navToggleBtn.classList.toggle("active");
  });
}

/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);

  });
}

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

// 

 // Set the select option based on the current URL
 window.onload = function() {
  var langSelect = document.getElementById('lang');
  if (window.location.href.includes('https://luthfidi.github.io/Luthfi-Portfolio-Website/index-en')) {
    langSelect.value = 'en';
  } else if (window.location.href.includes('https://luthfidi.github.io/Luthfi-Portfolio-Website/index-id')) {
    langSelect.value = 'id';
  }
};

// Redirect to the appropriate language page on change
document.getElementById('lang').addEventListener('change', function() {
  var selectedLanguage = this.value;
  if (selectedLanguage === 'en') {
    window.location.href = 'https://luthfidi.github.io/Luthfi-Portfolio-Website/index-en';
  } else if (selectedLanguage === 'id') {
    window.location.href = 'https://luthfidi.github.io/Luthfi-Portfolio-Website/index-id';
  }
});


// Contact Form Script

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');
  const formInputs = contactForm.querySelectorAll('input, textarea');
  
  // Form validation
  const validateForm = () => {
    let isValid = true;
    formInputs.forEach(input => {
      if (input.value.trim() === '') {
        isValid = false;
        showError(input, 'This field is required');
      } else {
        clearError(input);
      }
    });
    return isValid;
  };

  const showError = (input, message) => {
    const formWrapper = input.closest('.form-wrapper');
    let errorElement = formWrapper.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.classList.add('error-message');
      formWrapper.appendChild(errorElement);
    }
    errorElement.textContent = message;
    input.classList.add('error');
  };

  const clearError = (input) => {
    const formWrapper = input.closest('.form-wrapper');
    const errorElement = formWrapper.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
    input.classList.remove('error');
  };

  // Form submission
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('This feature is being improved. Feel free to reach out via my socials.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send';
    }
  });

  // Notification system
  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  };

  // Real-time validation
  formInputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        showError(input, 'This field is required');
      } else {
        clearError(input);
      }
    });
  });
});

// cursor

console.clear();

const curlen = 20;

const cursor = document.getElementById('cursor');

let mouseX = 0;
let mouseY = 0;

let circles;
let history = Array(curlen).fill({x: 0, y: 0});

function onMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function initCursor() {
  for (let i = 0; i < curlen; i++) {
    let div = document.createElement('div');
    div.classList.add('cursor-circle') ;
    cursor.append(div);
  }
  circles = Array.from(document.querySelectorAll('.cursor-circle'));
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
    circles[i].style.transform = `translate(${current.x}px, ${current.y}px) scale(${i/curlen})`;  
  }
  requestAnimationFrame(updateCursor)
}

document.addEventListener('mousemove', onMouseMove, false);

initCursor();
updateCursor();

// document.addEventListener('DOMContentLoaded', function() {
//   const images = document.querySelectorAll('img');
  
//   images.forEach(img => {
//       img.addEventListener('dragstart', function(e) {
//           e.preventDefault();
//       });
      
//       img.addEventListener('contextmenu', function(e) {
//           e.preventDefault();
//       });
      
//       img.addEventListener('touchstart', function(e) {
//           e.preventDefault();
//       }, { passive: false });
      
//       img.addEventListener('touchmove', function(e) {
//           e.preventDefault();
//       }, { passive: false });
//   });
// });