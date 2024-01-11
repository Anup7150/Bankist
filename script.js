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
