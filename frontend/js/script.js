'use strict';


const slidesContainer = document.querySelector('.carousel-slides'); // The slides wrapper
const slides = document.querySelectorAll('.carousel-slides img'); // All images in the carousel
const totalSlides = slides.length;
const slideWidth = slides[0].clientWidth; // Get the width of a single slide
console.log(slideWidth)
let currentIndex = 1; // Start at the first "real" image

// Set the initial position
slidesContainer.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

// Function to move the slides
function moveSlides() {
  currentIndex++; // Move to the next slide
  slidesContainer.style.transition = 'transform 1s ease-in-out'; // Smooth transition
  slidesContainer.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

  // Handle looping: reset position when reaching the duplicates
  slidesContainer.addEventListener('transitionend', () => {
    if (currentIndex === totalSlides - 1) {
      currentIndex = 1; // Reset to the first "real" slide
      slidesContainer.style.transition = 'none'; // Remove transition for instant jump
      slidesContainer.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
    } else if (currentIndex === 0) {
      currentIndex = totalSlides - 2; // Reset to the last "real" slide
      slidesContainer.style.transition = 'none'; // Remove transition for instant jump
      slidesContainer.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
    }
  });
}

// Automatically move the slides every 2 seconds
setInterval(moveSlides, 3000);



// element toggle function
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category.toLowerCase()) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// sending form data to backend 
// const apiUrl = window.ENV.API_BASE_URL;
// console.log("Hello: ", apiUrl)
form.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log("Bhaw Bhaw")

  const formData = {
    fullname: form.querySelector('input[name=fullname]').value,
    email: form.querySelector('input[name=email]').value,
    message: form.querySelector('textarea[name=message]').value
  }
  console.log(JSON.stringify(formData))
  const apiUrl = window.ENV.API_BASE_URL || 'http://localhost:3000/'
  console.log(apiUrl)
  fetch(`${apiUrl}contact/sendemail`, {
    method: 'post',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      formData
    )
  }).then(
    data =>{
      alert('Your message has been sent successfully');
      form.reset()
      formBtn.setAttribute("disabled", "")
    }
  )
  .catch(error =>{
    console.error('Error:', error);
    alert('There was a problem sending your message.')
  })
} )