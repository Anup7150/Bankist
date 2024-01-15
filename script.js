const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');




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


//--------------------------Implementing Smooth Scrolling--------------------------#
// we need to select the element that we want to scroll to
// we need to select the button that we want to add the event listener so that when we click on the button then we will scroll to the element

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

//--------------------------Event Delegation: Implementing Page Navigation--------------------------

// page Navigation

// page navigation is the process of navigating to different sections of the page when we click on the links
// if we want to implement the page navigation to the corresponding section, we need to get the id of the section first
// here we are getting the nodelist of all the links and then we are adding the event listener to all the links
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); // prevent default behaviour of link
//     // here we are getting the href attribute of the link so that we can get the id of the element we want to scroll to
//     const id = this.getAttribute('href');
//     // we only have id of the element we want to scroll to but we dont have the element itself
//     // we can get the element using the querySelector method
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     // id.scrollIntoView({ behavior: 'smooth' });

//   });

// });

// Event delegation
// event delegation is the process of attaching the event listener to the parent element of the element we want to target
// we use the event bubbling to implement the event delegation

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);

  // Matching strategy
  // we need to check if the element we clicked on has the class nav__link
  // if the element we clicked on has the class nav__link then we will scroll to the corresponding section
  // we can check if the element we clicked on has the class nav__link using the contains method
  if (e.target.classList.contains('nav__link')) {
    // console.log('LINK');

    e.preventDefault(); // prevent default behaviour of link
    // here we are getting the href attribute of the link so that we can get the id of the element we want to scroll to
    const id = e.target.getAttribute('href');
    console.log(id);
    // we only have id of the element we want to scroll to but we dont have the element itself
    // we can get the element using the querySelector method
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    // id.scrollIntoView({ behavior: 'smooth' });

  };
});

//--------------------------Building a Tabbed Component--------------------------

// tabs are the component that we can use to display the content in the form of tabs
// we can switch between the tabs to display the content of the tabs
// in the old way we need to create the tabs manually and then we need to add the event listener to all the tabs like in the code below
// document.querySelectorAll('.operations__tab').forEach(function (el) {
//   console.log(el);
// });

// but now we can use the event delegation to add the event listener to the parent element of the tabs
// we can use the event bubbling to implement the event delegation


tabContainer.addEventListener('click', function (e) {
  // console.log(e.target);
  // Matching strategy
  // if we try to  use only e.target then it will not work because e.target will return the element on which the event is triggered
  // if we click on number it will return the number element

  // so we need to use the closest method to get the closest parent element of the element we clicked on
  // closest method will return the element itself if the element matches the selector
  // we need to remember that the whenever we use the event delegation we need to use the closest method to get the element we want to target

  // here even if we click on the number it will return the tab element because the closest method will return the element itself if the element matches the selector
  const clicked = e.target.closest('.operations__tab');
  // if we click on container instead of the tab then it will return null because the container element does not match the selector
  // now since we have the tab whenever we click now we can do the things that we want to do
  // since whenever we click on the tab we have the class call operations__tab--active on the tab

  // console.log(clicked);

  // we need to ignore any click that is not on the tab and we can do that by using the guard clause
  // guard clause
  // we ignore any click whose result is null
  // if there is no click then return immediately and it will finish this function execution
  // in the code below when there is no click then it will return the null which is falsy value
  // when we do !clicked it will be true and then it will return immediately and it will finish this function execution
  // and none of the code below will be executed
  if (!clicked) return;

  // remove active classes
  // we need to remove the active class from all the tabs
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // activate content area
  // first we need to select the content like which content for which tab
  // we can do that by using the dataset property
  // dataset is the object that contains all the data attributes of the element

  // in this function we have stored the clicked tab in the clicked variable
  // here the tab value is coming from the dataset object of the clicked tab
  // first we need to remove the active class from all the content areas
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});

//--------------------------Passing Arguments to Event Handlers--------------------------
// // we can pass the arguments to the event handlers
// // we are trying to implement the hover effect on the nav links
// // we can do that by using the mouseover and mouseout events because they uses the event bubbling
// // mouseenter and mouseleave events uses the event capturing

// // here since the mouseroever and mouseout event using similar kind of code we will do the code refactoring
// // we generally do the code refactoring by creating the function
// // while refactoring we need to remember that we will need to pass the event and opacity value to the function because
// // opacity value is different for the mouseover and mouseout events
// // here we are creating the function called handleHover
// const handleHover = function (e, opacity) {
//   // here the this keyword is the opacity value that we passed in the function
//   // this keyword is same as the e.currentTarget, e.currentTarget is the element on which the event handler is attached
//   // when we set the this keyword manually then it will become the same as we set it
//   // console.log(this, e.currentTarget)
//   // console.log(e.target);
//   // Matching strategy
//   // it will only work if the e.target element has the class nav__link
//   if (e.target.classList.contains('nav__link')) {
//     // now when the class is found then we need to select the element that we want to apply the hover effect or
//     // we can say we need to find the sibling element of the element we hover on and we can do that by using the closest method
//     // wherever the event delegation is used we need to use the closest method to get the element we want to target
//     // we are storing the element we want to target in link variable
//     const link = e.target;
//     // now we need to find the sibling element based on the link variable
//     // we can do that by going up to the parent element and then selecting the sibling element
//     // we can use the .nav or .nav__links class to go up to the parent element
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link')
//     // we also need to select the logo element
//     const logo = link.closest('.nav').querySelector('img');
//     // till here we are done with the sselecting the sibling elements we want to target
//     // now we need to apply the hover effect on the sibling elements which is basically the opacity change
//     // we can do that by using the forEach method
//     siblings.forEach(el => {
//       // here we will aplly the effect to all the sibling elements leaving the element we hover on
//       // which is if the current link is not equal to the current element
//       if (el !== link) el.style.opacity = this; // here this keyword is the opacity value that we passed in the function
//       logo.style.opacity = this;
//     })
//   }
// }

// // // when we call the handleHover function we need to call it inside the event handler
// // nav.addEventListener('mouseover', function (e) {
// //   // here we are calling the handleHover function
// //   // here the event e  in handleHover function will be the same event e as the current event
// //   handleHover(e, 0.5);

// //   // // console.log(e.target);
// //   // // Matching strategy
// //   // // it will only work if the e.target element has the class nav__link
// //   // if (e.target.classList.contains('nav__link')) {
// //   //   // now when the class is found then we need to select the element that we want to apply the hover effect or
// //   //   // we can say we need to find the sibling element of the element we hover on and we can do that by using the closest method
// //   //   // wherever the event delegation is used we need to use the closest method to get the element we want to target
// //   //   // we are storing the element we want to target in link variable
// //   //   const link = e.target;
// //   //   // now we need to find the sibling element based on the link variable
// //   //   // we can do that by going up to the parent element and then selecting the sibling element
// //   //   // we can use the .nav or .nav__links class to go up to the parent element
// //   //   const siblings = link.closest('.nav').querySelectorAll('.nav__link')
// //   //   // we also need to select the logo element
// //   //   const logo = link.closest('.nav').querySelector('img');
// //   //   // till here we are done with the sselecting the sibling elements we want to target
// //   //   // now we need to apply the hover effect on the sibling elements which is basically the opacity change
// //   //   // we can do that by using the forEach method
// //   //   siblings.forEach(el => {
// //   //     // here we will aplly the effect to all the sibling elements leaving the element we hover on
// //   //     // which is if the current link is not equal to the current element
// //   //     if (el !== link) el.style.opacity = 0.5;
// //   //     logo.style.opacity = 0.5;
// //   //   })
// //   // }
// // });

// // in the code below we are using the bind method to pass the opacity value to the handleHover function
// // bind method will return the new function with the this keyword set to the value we pass in the bind method
// nav.addEventListener('mouseover', handleHover.bind(0.5));

// nav.addEventListener('mouseout', handleHover.bind(1));
// // we also need the mouseout event to remove the hover effect
// // nav.addEventListener('mouseout', function (e) {

// //   handleHover(e, 1);
// //   // if (e.target.classList.contains('nav__link')) {
// //   //   const link = e.target;
// //   //   const siblings = link.closest('.nav').querySelectorAll('.nav__link')
// //   //   const logo = link.closest('.nav').querySelector('img');
// //   //   siblings.forEach(el => {
// //   //     if (el !== link) el.style.opacity = 1;

// //   //     logo.style.opacity = 1;
// //   //   })
// //   // }

// // });

// //--------------------------Sticky Navigation: The Scroll Event--------------------------

// // sticky navigation is the navigation that is fixed to the top of the page when we scroll down or the navigation bar
// // beccomes attached to the top of the page when we scroll to a certain position

// // scroll event
// // scroll event is the event that is triggered when we scroll the page
// // scroll event is the event that is triggered on the window object but not on the document object
// // scroll event is triggered every time we scroll the page
// // now to add the sticky class to the nav element we need to find a logic that will add the sticky class to the nav element when we scroll to a certain position
// // here we are using the getBoundingClientRect method to get the position of the section1 element which will return the DOMRect object
// const initialCoords = section1.getBoundingClientRect();
// // console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   // scrolllY is the vertical scroll position of the page that start from every top of the page
//   // console.log(window.scrollY);
//   if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// })

//--------------------------A Better Way: The Intersection Observer API--------------------------
// we can use the intersection observer API to implement the sticky navigation
//this API allows our code to observe changes to the way a certain target element intersects another element or the way it intersects the viewport
// we need to create the observer first by using the IntersectionObserver constructor

// the obsCallback function will be called each time the observed element is intersecting the root element at the threshold we defined
// takes two arguments which are the entries and observer
// entries is the array of the threshold entries
// const obsCallback = function (entries, observer) {
//   console.log(entries);

// };
// const obsOptions = {
//   root: null, // null means the viewport
//   threshold: [0, 0.2] // 10% of the section1 element is visible in the viewport
// };
// // the constructor takes the callback function and object of options as an argument
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// // here the section1 is the target element and we use the observe method to observe the target element
// observer.observe(section1);

const header = document.querySelector('.header');
// in the code below we will use getBoundingClientRect method to get the height of the nav element
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const steakyNav = function (entries) {
  // here the entries is the array of the threshold entries
  const [entry] = entries; // here we are using the destructuring to get the first element of the array
  // console.log(entry);
  // in the code below we are using the isIntersecting property to check if the element is intersecting the root element
  // if the element is not intersecting the root element then we will add the sticky class to the nav element
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(steakyNav, {
  root: null,
  threshold: 0, // as soon as the header element is out of the viewport then the callback function will be called
  rootMargin: `-${navHeight}px`, // rootMargin is the margin that we will be applied to the nav element outside or inside, it only accpets px
});
headerObserver.observe(header);

//--------------------------Revealing Elements on Scroll--------------------------
// revealing elementss on scroll is the process of revealing the elements when we scroll close to the element
// we can use the intersection observer API to implement the revealing elements on scroll

const allSections = document.querySelectorAll('.section');


// now we need to reveal the section elements when we scroll close to the section element

// lets create the callback function here
const revealSection = function (entries, observer) {
  // here the entries is the array of the threshold entries
  // that means if we have multiple threshold entries then we will have multiple entries, here the sections are the threshold entries
  const [entry] = entries; // here we are using the destructuring to get the first element of the array
  // console.log(entry);
  // using the guard clause
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // we need to unobserve the section element after the section element is revealed
  // we can do that by using the unobserve method
  // we need to unobserve the section element because we dont want to observe the section element after the section element is revealed
  // if we dont unobserve the section element then the callback function will be called every time we scroll the page
  observer.unobserve(entry.target);
}

// first we need to  create the observer
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // null means the viewport
  threshold: 0.15 // 15% of the section is visible in the viewport
})

allSections.forEach(function (section) {
  // lets hide the section elements first
  section.classList.add('section--hidden');
  // lets add the observer to the section elements
  // we are saying hey observer observe the section element
  sectionObserver.observe(section);
});

//--------------------------Lazy Loading Images--------------------------
// lazy loading images is the process of loading the images only when we scroll close to the image
// we can use the intersection observer API to implement the lazy loading images
// first we need to select the images we want to lazy load and we can do that by using the data-src attribute
const imgTargets = document.querySelectorAll('img[data-src]');

// lets create the callback function here
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  // using the guard clause
  if (!entry.isIntersecting) return;
  // the main logic is to replace the src attribute with the data-src attribute
  entry.target.src = entry.target.dataset.src;
  // loading the images happens behind the scenes and as soon as the image is loaded it will ommit the load event
  // we can listen to the load event on the image element
  // we can do that by using the addEventListener method
  entry.target.addEventListener('load', function () {
    // only after when the image is fully loaded behind the scene we need to remove the blur class from the image element
    entry.target.classList.remove('lazy-img');

  });

  // we need to unobserve the image element after the image element is loaded
  // we can do that by using the unobserve method
  imgObserver.unobserve(entry.target);

}
// we will create the intersection observer for the images
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
})

// we will add the observer to each of the image
imgTargets.forEach(img => imgObserver.observe(img));


//--------------------------Building a Slider Component: part- 1 --------------------------
// slider is the component that we can use to display the content in the form of slides
// we can switch between the slides to display the content of the slides
// in the old way we need to create the slides manually and then we need to add the event listener to all the slides like in the code below

// lets put all the slider code inside one single function
const sliderFunction = function () {
  // we need to select the slides
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  // we need to select the buttons
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  // we need to select the dots
  const dotContainer = document.querySelector('.dots');

  // making the slides a bit smaller and moving a bit to the left
  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible';

  // we defined the variaable as let because we will update the value of the variable
  let curSlide = 0;
  // we can also tell js not to excute further right or left move when the slide ends
  const maxSlide = slides.length - 1;

  // we need to create the dots for the slides
  // we can do that by using the forEach method
  // we need to create the html for the dots inside the dots element
  // we can do that by using the insertAdjacentHTML method

  const createDots = function () {
    slides.forEach(function (_, i) {
      // we need to pass the value of index to the data-slide attribute of the button
      dotContainer.insertAdjacentHTML('beforeend', ` <button class="dots__dot dots__dot--active" data-slide="${i}"></button>`);
    });
  };

  // we need to call the createDots function so that the dots will be created when the page loads with the slides


  // now lets create a function for the active dot
  const activateDot = function (slide) {
    // first remove the active class from all the dots and for that we need to select all the dots
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    // secoondly we need to select the dot that we want to have the active class and for that we need to select the dot based on the slide
    // we can do that selecting the dot from dots__dot class based on the slide value and add the active class to it
    document.querySelector(`.dots__dot[data-slide ="${slide}"]`).classList.add('dots__dot--active');
  }

  // now need to show each slide on side by side first and we can do that by using the forEach method
  // we will the index in here because we need to set the transform property of each slide
  // the code below is the main logic of the slider which is giving 0% to the first slide, 100% to the second slide and 200% to the third slide
  // slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`);
  const gotoSlide = function (slide) {
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
  }
  // the code below will start the slider from the first slide

  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;

    }
    else {
      curSlide++;
    }
    gotoSlide(curSlide);
    activateDot(curSlide);
  }

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    }
    else {
      curSlide--;
    }
    gotoSlide(curSlide);
    activateDot(curSlide);
  }

  // lets create the init function that will be initialized when the page loads
  const init = function () {
    gotoSlide(0);
    createDots();
    activateDot(0);
  }

  init();

  // event handlers
  // now we will use the same logic but a bit of changess to implement the slider when clicking on the buttons
  btnRight.addEventListener('click', nextSlide)//{
  // now we need to find a way to move the slide on left when we click on the right button
  // we can create a variable called currentSlide and set it to 0, which is the first slide
  // we can increment the currentSlide variable by 1 when we click on the right button
  // curSlide++;
  // now we will do a bit of twist that is we will subtract the currentSlide from the index of the slide
  // so that whenever we click the button the slide will move to the left because the translateX value will be negative
  // now when the curslide reaches the maxslide then we need to stop the slider and reassign the currentSlide to 0
  // if (curSlide === maxSlide) {
  //   curSlide = 0;

  // }
  // else {
  //   curSlide++;
  // }
  // gotoSlide(curSlide);

  // })

  btnLeft.addEventListener('click', prevSlide) //{
  //   // its similar for the btnLeft button but we need to decrement the currentSlide variable by 1 because we are moving to the right
  //   if (curSlide > 0) {
  //     slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - curSlide)}%)`);
  //   }


  // });


  // now lets do the slide with the keyboard keys
  // need to add the event listener with event type keydown, keydown event is triggered when we press the key
  // we can add the event listener to the document object
  document.addEventListener('keydown', function (e) {
    // with the console we can fighure out which key is pressed
    console.log(e);
    // now we need to check if the key pressed is the left arrow key
    // we can do that by using the key property of the event object
    if (e.key === 'ArrowLeft') prevSlide();
    // now we need to check if the key pressed is the right arrow key
    // we can do that by using the key property of the event object
    if (e.key === 'ArrowRight') nextSlide();
  });

  // now since the dots are created dynamically we need to add the event listener to the dots
  // we can do that by using the event delegation
  // we can add the event listener to the dotContainer element
  // we need to add the event listener to the dotContainer element because the dotContainer element is the parent element of the dots
  // we can use the event bubbling to implement the event delegation
  dotContainer.addEventListener('click', function (e) {
    // console.log(e.target);
    // matching strategy
    if (e.target.classList.contains('dots__dot')) {
      // we need to get the value of the data-slide attribute of the button
      // whenever a custom attribute is created it is storedd in the dataset object of the element
      // we can do that by using the dataset property
      // dataset is the object that contains all the data attributes of the element
      // now store the value of the data-slide attribute of the button in the slideTo variable
      // const slideTo = e.target.dataset.slide;
      // we can use destructuring to get the value of the data-slide attribute of the button
      const { slide } = e.target.dataset;
      gotoSlide(slide);
      activateDot(slide);
    }
  })
};

sliderFunction();
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
const randomColor = () => `rgba(${ randomInt(0, 255) }, ${ randomInt(0, 255) }, ${ randomInt(0, 255) })`;
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

//--------------------------DOM Traversing--------------------------
// DOM Traversing is basically the process of walking through the DOM
// we can select the elements based on the relationship to other elements

// traversing downwards: selecting child elements
const h1 = document.querySelector('h1');
// childNodes property will return all the child nodes of the element
console.log(h1.childNodes);
// children property will return all the direct child elements of the element
// it retuns the html collection which is a live collection
console.log(h1.children);
// firstElementChild property will return the first child element of the element
console.log(h1.firstElementChild);
h1.firstElementChild.style.color = 'white';
// lastElementChild property will return the last child element of the element
console.log(h1.lastElementChild);
h1.lastElementChild.style.color = 'orangered';

// traversing upwards: selecting parent elements
// parentNode property will return the parent node of the element
console.log(h1.parentNode);
console.log(h1.parentElement);
// if we need to find the parent element that is not the direct parent element then we can use the closest method
// closest method will return the closest parent element of the element
// closest method takes the selector as an argument just like the querySelector and querySelectorAll method
// closest method will return the element itself if the element matches the selector
console.log(h1.closest('.header'));

// closest method is opposite of querySelector method
// querySelector method will return the child element no matter how far the child element is
// closest method will return the parent element no matter how far the parent element is

// we can use the custome variable that is in the css file
h1.closest('.header').style.background = 'var(--gradient-secondary)';


// traversing sideways: selecting sibling elements

// in sideways travesrsing we can only select the direct sibling elements
// we can use the previousElementSibling property to select the previous sibling element
console.log(h1.previousElementSibling);
// we can use the nextElementSibling property to select the next sibling element
console.log(h1.nextElementSibling);

// but what if we want to access all the sibilings of the element
// we can do that by using the trick of going back to parent element and then selecting all the child elements of the parent element
console.log(h1.parentElement.children);
// the code above will return the html collection which is a live collection but not an array
// we can convert the html collection to the array using the spread operator
[...h1.parentElement.children].forEach(function (el) {
  // we can compare the elememnt as well
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';

  }
})
*/

//--------------------------Lifecycle DOM Events--------------------------
// different eveents that occur in the DOM during webpage lifecycle(the moment the webpage is created to the moment the webpage is closed)

// 1. DOMContentLoaded event
// DOMContentLoaded event is the event that is triggered when the initial HTML document has been completely loaded and parsed
// DOMContentLoaded event is the event that is triggered on the document object
// DOMContentLoaded event is the event that is triggered when the DOM is ready
// DOMContentLoaded event doesnot wait for the images and other external resources to load

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// 2. load event
// load event is the event that is triggered when the page is fully loaded including all the external resources like images, videos etc
// load event is the event that is triggered on the window object
// load event is the event that is triggered when the page is ready
// load event waits for the images and other external resources to load

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// 3. beforeunload event
// beforeunload event is the event that is triggered when the user tries to leave the page
// beforeunload event is the event that is triggered on the window object
// beforeunload event is the event that is triggered when the user tries to close the page
// beforeunload event is the event that is triggered when the user tries to reload the page
// beforeunload event is the event that is triggered when the user tries to go to another page
// beforeunload event is the event that is triggered when the user tries to close the browser
// beforeunload event is the event that is triggered when the user tries to go to another tab
// beforeunload event is the event that is triggered when the user tries to refresh the page
// beforeunload event is the event that is triggered when the user tries to go to another website
// beforeunload event is the event that is triggered when the user tries to go to another domain
// beforeunload event is the event that is triggered when the user tries to go to another protocol
// beforeunload event is the event that is triggered when the user tries to go to another port
// beforeunload event is the event that is triggered when the user tries to go to another subdomain

// it will give us a popup with generic message
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//to display a leaving confirmation, we need to to set return value on the event to an empty string
//   e.returnValue = '';
// });
