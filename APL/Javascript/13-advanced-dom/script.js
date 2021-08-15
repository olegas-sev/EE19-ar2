'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const nav = document.querySelector('.nav')
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')


///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button scrolling
btnScrollTo.addEventListener('click', (e) => {
  const s1coords = section1.getBoundingClientRect()
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());
  console.log(`Current scroll (x/y) ${window.pageXOffset} ${window.pageYOffset}`); // How much u scrolled from top of the document
  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth); // Shows current resolution of browser


  // Scrolling 
  // window.scrollTo(s1coords.left + window.pageXOffset , s1coords.top + window.pageYOffset)

  /* 
  window.scrollTo({
    left: s1coords.left + window.pageXOffset, 
    top: s1coords.top + window.pageYOffset, 
    behavior: 'smooth'
  }) 
  */

  section1.scrollIntoView({ behavior: 'smooth' })
})

////////////////////////
// Page navigation

// document.querySelectorAll(".nav__link").forEach(function(el) {
//   el.addEventListener("click", function(e) {
//     e.preventDefault();
//     const id = this.getAttribute("href")
//     document.querySelector(id).scrollIntoView({behavior: "smooth"})
//   })
// })

// 1. Add event listener to common parent element
// 2. Determine what element orginated the event
document.querySelector(".nav__links").addEventListener("click", function(e) {
  e.preventDefault()
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href")
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})

// Tabbed component

tabContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab');
  
  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'))
  tabsContent.forEach(content => content.classList.remove('operations__content--active'))
  
  
  clicked.classList.add('operations__tab--active')
  // Active content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

// Menu fade animation

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')
    siblings.forEach(el => {
      if(el !== link) el.style.opacity = opacity
    })
    logo.style.opacity = opacity
  }
}

nav.addEventListener('mouseover', (e) => handleHover(e, 0.5))

nav.addEventListener('mouseout', (e) => handleHover(e, 1))


////////////////////////
// Sticky navigation 
/* const initialCords = section1.getBoundingClientRect()
window.addEventListener('scroll', function () {
  if (window.scrollY > initialCords.top) nav.classList.add('sticky') 
  else nav.classList.remove('sticky')
}
)
 */
////////////////////////
// Sticky navigation - Intersection Observer API
// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry))

// }

// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2]
// }
// const observer = new IntersectionObserver(observerCallback, observerOptions) 
// observer.observe(section1)

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function (entries) {
  const [entry] = entries
  // console.log(entry);
  if (!entry.isIntersecting) {
   nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
}
const headerObserver = new IntersectionObserver(
  stickyNav, 
  {
    root: null, 
    threshold: 0,
    rootMargin: `-${navHeight}px`
  }
  
  );

headerObserver.observe(header)


// Reveal sections
const allSections = document.querySelectorAll('.section')
const revealSection = function(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  // Perfomance, deletes target observe 
  observer.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSection,
  {
    root: null,
    threshold: 0.15
  })

allSections.forEach((section) => {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]')
console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries
  console.log(entry);

  if(!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)
}
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px`
})
imgTargets.forEach(img => imgObserver.observe(img))
////////////////////////
// Lectures 
/*
// (!) Selecting element
console.log(document.documentElement); // <html> element
console.log(document.head); // <head> element
console.log(document.body); // <body> element

const header = document.querySelector('.header')
const allSections = document.querySelectorAll('.section')
console.log(allSections);

document.getElementById('section--1')
const allButtons = document.getElementsByTagName('button') // Returns all elements stored in <button>
console.log(allButtons); // Html collection it's automatically updated

console.log(document.getElementsByClassName('btn'))

// (!) Creating and inserting elements

// .insertAdjacentHTML

const message = document.createElement('div') // creates element
message.classList.add('cookie-message')
message.textContent = 'We use cookies for improved functionality and analytics.'
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'

// header.prepend(message)
header.append(message)
// header.append(message.cloneNode(true))

// header.before(message)
// header.after(message)

// (!) Delete elements

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove()

  // Old way to remove elements
  // message.parentElement.removeChild(message)
})
*/
/*
// Styles
message.style.backgroundColor = '#37383d'
message.style.width = '100%'
console.log(message.style.width);
console.log(message.style.height);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
message.style.height = parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered')


// Attributes
const logo = document.querySelector('.nav__logo')
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// Non standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
console.log(logo.setAttribute('company', 'Bankist'));

console.log(logo.src); // => https://localhost:8080/img/logo.png
console.log(logo.getAttribute('src')); // => img/logo.png

const link = document.querySelector('.nav__link--btn')
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'd')
logo.classList.remove('c', 'd')
logo.classList.toggle('c')
logo.classList.contains('c') // not includes like in arrrays

// Dont use it because it overwrites the whole class property
logo.className = 'olegas'
*/


/*
 // Select
const h1 = document.querySelector('h1')

// Function
const alerting = (e) => {
  console.log('addEventListener');
}

h1.addEventListener('mouseenter', alerting)
setTimeout(() => {
  h1.removeEventListener('mouseenter', alerting)
}, 3000);

// Old way
// h1.onmouseenter = (e) => {
//   alert('onmousenter!')
// }

*/

/*
Bubbling, capturing
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`
console.log(randomColor(0, 255));

document.querySelector(".nav__link").addEventListener("click", function(e) {
  this.style.backgroundColor = randomColor()
  console.log(e.target);
  // Stop propagation
  // e.stopPropagation()
})
document.querySelector(".nav__links").addEventListener("click", function(e) {
  this.style.backgroundColor = randomColor()
  console.log(e.target);
})
document.querySelector(".nav").addEventListener("click", function(e) {
  this.style.backgroundColor = randomColor()
  console.log(e.target);
}) */

/* 
DOM Traversing
const h1 = document.querySelector('h1')
// Going downwards: child

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
console.log(h1.firstElementChild.style.color = "red");

// Going upwards
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = "var(--gradient-secondary)"
h1.closest('h1').style.background = "var(--gradient-primary)" 

// Sideways
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement);
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function(el) {
  if (el !== h1) el.style.transform = "scale(0.5)"
})
 */