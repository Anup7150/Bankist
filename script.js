const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// console.log(btnsOpenModal);

const openModal = function (e) {
  e.preventDefault(); // prevent default behaviour of link
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }

});

/*

//--------------------------Selecting, Creating and Deleting Elements--------------------------
// Selecting elements
// it will return the root element of the document which is the html element in this case
console.log(document.documentElement);
// it will return the head element
console.log(document.head);

// it will return the first element with the class header
const header = document.querySelector('.header');
// it will return all the elements with the class section
console.log(document.querySelectorAll('.section'));
// it will return the element with the id section--1
document.getElementById('section--1');
//it will return all the elements with tag name button
console.log(document.getElementsByTagName('button'));


// Creating and inserting elements
// .insertAdjacentHTML is used to insert html elements in the DOM
// there are other ways to create elements and insert them in the DOM

// here we are not creating an element in the DOM but we are creating an object of the element
// it will return the DOM element so we need to store it in a variable
const message = document.createElement('div');
// we can add classes to the element using the classList property
message.classList.add('cookie-message');
// we can add text to the element using the textContent property
//message.textContent = 'We use cookies for improved functionality and analytics.';
// we can add html to the element using the innerHTML property
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>';

// now we need to insert the element in the DOM
// we can do that by using prepend, append, before and after methods
// now we will use prepend method to insert the element as the first child of the header element

// here the message is life element so it can only be in one place at a time
// first it will appear as the first child of the header element and then it will appear as the last child of the header element
// it can only exist in one place at a time
// header.prepend(message);
header.append(message);
// if we want the copies of message to be inserted in multiple places then we need to clone the element
// it will also copy the child elements of the message element
// header.append(message.cloneNode(true));

// we can also insert the element before or after methods
// before and after methods act as siblings to the element. in this case the header element
// header.before(message);
// header.after(message);

// Delete elements
// we can delete elements using the remove method
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove();
});


//--------------------------Styles, Attributes and Classes--------------------------
// Styles

//we can change the styles of the elements using the style property
// we use element.style.property = value to change the styles of the element
// the style we set in here will be inline styles which will override the styles set in the css file
// we can also set the styles in the css file and then change the styles using the style property
// the styles that we set here will not be in css file but will be in the html file
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// we can get the styles of the element using the getComputedStyle method
// it will return the styles of the element in the form of object

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
// if we want to add height to the element then we need to get the height of the element first
// then we need to add the height to the element

console.log(message.style.height = Number.parseFloat(getComputedStyle(message).height) + 40 + 'px');

// here we are using the css variables to change the styles of the element
//documentElement is the root element of the document which is the html element in this case
// we can change the css variables using the setProperty method
// the first argument is the name of the css variable and the second argument is the value of the css variable
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
// attributes are the values that we set in the html elements like id, class, src, href etc
// we can access and change the attributes of the element

const logo = document.querySelector('.nav__logo');
// we can get the attributes of the element using the getAttribute method
console.log(logo.alt);
console.log(logo.src);
// we dont use class to access the class attribute of the element because class is a reserved keyword in javascript
console.log(logo.className);

// non standard attributes
// we can set our own attributes to the element
// we can access the non standard attributes using the getAttribute method
// get attributes gives the absolute value of the attribute
// console.log(logo.getAttribute('designer'));
// we can set the attributes using the setAttribute method
console.log(logo.setAttribute('company', 'Bankist'));

console.log(logo.getAttribute('src'));

// data attributes
// data attributes are the special kind of attributes that start with data-
// we can access the data attributes using the dataset property
// dataset is the object that contains all the data attributes of the element
// here we are accessing the version-number data attribute of the logo element from the dataset object
console.log(logo.dataset.versionNumber);

// Classes
// we can add,remove,toggle and check contains classes to the element using the classList property
// classList is the object that contains all the classes of the element
// classList is a DOMTokenList which is a special kind of object
// we can also add multiple classes to the element using the add method
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c');


//--------------------------Implementing Smooth Scrolling--------------------------#
// we need to select the element that we want to scroll to
// we need to select the button that we want to add the event listener so that when we click on the button then we will scroll to the element
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

//getBoundingClientRect will return the DOMRect object of the element we pass in the getBoundingClientRect method
// Rect is basically the relative position of the element to the viewport that we see on the screen

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect()
  // console.log(s1coords);
  // here e.target is the button element
  // console.log(e.target.getBoundingClientRect());

  // we can get the scroll postion of the element using the scrollX and scrollY properties
  // scrollX is the horizontal scroll position of the element
  // scrollY is the vertical scroll position of the element
  // we can also get the scroll position of the element using the scrollLeft and scrollTop properties
  // scrollLeft is the horizontal scroll position of the element
  // scrollTop is the vertical scroll position of the element
  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  //console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

  // scrolling
  // we can scroll to the element using the scrollTo method
  // scrollTo method takes two arguments which are the x and y coordinates of the element we want to scroll to
  // the x and y coordinates are relative to the viewport

  // here we are adding the current scroll position of the element to the x and y coordinates of the element we want to scroll to
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // to implement the smooth scrolling we need to pass an object with three properties to the scrollTo method
  // the first property is the left property which is the horizontal scroll position of the element
  // the second property is the top property which is the vertical scroll position of the element
  // the third property is the behavior property which is the behaviour of the scrolling
  // the behaviour property can be smooth or auto
  // smooth behaviour will implement the smooth scrolling
  // auto behaviour will implement the normal scrolling

  // old way of implementing the smooth scrolling by manually calculating the scroll position of the element
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  // new way of implementing the scroll position of the element is by using the scrollIntoView method
  // scrollIntoView method is available on all the elements
  // scrollIntoView method takes an object as an argument
  // the object has one property which is the behavior property
  // the behavior property can be smooth or auto
  // we implement the scrollIntoView method on the element we want to scroll to
  section1.scrollIntoView({ behavior: 'smooth' });
})

//--------------------------Types of Events and Event Handlers--------------------------
// we can add event handlers to the elements
// event handlers are the functions that are called when the event is triggered

// mouseenter event
// mouseenter event is triggered when the mouse enters the element
// mouseenter event is the opposite of mouseleave event

const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// });

// good thing about addEventListener is that we can add multiple event handlers to the same element
// we can also remove the event handlers from the element
// we can remove the event handlers using the removeEventListener method
// to use the removeEventListener method we need to store the event handler in a variable
// we need to export the event handler function to a separate function

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
  // we can remove the event handler using the removeEventListener method
  h1.removeEventListener('mouseenter', alertH1);
}

h1.addEventListener('mouseenter', alertH1);
// h1.removeEventListener('mouseenter', alertH1);

// another way of removing the event handler is by using the setTimeout method

setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
}, 3000);

*/

//--------------------------Event Propagation in Practice--------------------------
// event propagation is the process of event bubbling and event capturing
// when we click on the element , event is triggered but not on the target element but at the root element of the document which is called event capturing
// then the event travels all the way down to the target elemet through all the parent elements which is call target phase
// then the event is triggered on the target element
// as soon as the event is triggered on the target element then the event starts to travel up to the root element of the document which is called event bubbling

// rgb(255,255,255)
// we can create random colors using the rgb color model
// the code below will create the random number between min and max
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
//console.log(randomInt(0, 255));
const randomColor = () => `rgba(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

// adding event handlers to the specific elements
document.querySelector('.nav__link').addEventListener('click', function (e) {
  // here this keyword refers to the element on which the event handler is attached
  this.style.backgroundColor = randomColor();
  // e.target is the element on which the event is triggered
  // e.currentTarget is the element on which the event handler is attached
  console.log('LINK', e.target, e.currentTarget);
  // stop propagation
  // we can stop the event propagation using the stopPropagation method
  // stopPropagation method will stop the event propagation in both event capturing and event bubbling
  // e.stopPropagation();
})

//adding event handlers to the parent elements of the specific elements
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // here this keyword refers to the element on which the event handler is attached
  this.style.backgroundColor = randomColor();
  // e.target is the element on which the event is triggered
  // e.currentTarget is the element on which the event handler is attached
  console.log('CONTAINER', e.target, e.currentTarget);
});

//adding event handlers to the grand parent elements of the specific elements
document.querySelector('.nav').addEventListener('click', function (e) {
  // here this keyword refers to the element on which the event handler is attached
  this.style.backgroundColor = randomColor();
  // e.target is the element on which the event is triggered
  // e.currentTarget is the element on which the event handler is attached
  console.log('NAV', e.target, e.currentTarget);
});
