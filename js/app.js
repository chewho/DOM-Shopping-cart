// VARIABLES
const courses = document.querySelector(".courses-list"),
  shoppingCartContent = document.querySelector(".shopping-cart__content"),
  clearCartBtn = document.querySelector(".clear-cart");

// LISTENERS
loadEventListeners();
function loadEventListeners() {
  // When a new course is added
  courses.addEventListener("click", buyCourse);
  // When the remove button is clicked
  shoppingCartContent.addEventListener("click", removeCourse);
  // Clear cart button
  clearCartBtn.addEventListener("click", clearCart);
  // Document ready
  document.addEventListener("DOMContentLoaded", getFromLocalStorage);
}

// FUNCTIONS
function buyCourse(e) {
  e.preventDefault();
  // Use delegation to find the course that was added
  if (e.target.classList.contains("add-to-cart")) {
    // Read the course values
    const course = e.target.parentElement.parentElement.parentElement;
    // Read the values
    getCourseInfo(course);
  }
}

// Read the HTML information of the selected course
function getCourseInfo(course) {
  // Create an Object with Course Data
  const courseInfo = {
    image: course.querySelector("img").src,
    title: course.querySelector(".card__title").textContent,
    price: course.querySelector(".price-new").textContent,
    id: course.querySelector(".add-to-cart").getAttribute("data-id"),
  };
  // Insert into the shopping cart
  addIntoCart(courseInfo);
}

// Display the selected course into the shopping cart
function addIntoCart(course) {
  // Create a <div>
  const div = document.createElement("div");
  // Build the template
  div.innerHTML = `
    <img src="${course.image}">      
    <div>${course.title}</div>
    <div>${course.price}</div>    
    <a href="#" class="remove" data-id="${course.id}">X</a>    
  `;
  div.classList.add("course");
  // Add into the shopping cart
  shoppingCartContent.appendChild(div);
  // Add course into local storage
  saveIntoStorage(course);
}

// Add courses into local storage
function saveIntoStorage(course) {
  let courses = getCoursesFromStorage();
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
}

// Get the content from storage
function getCoursesFromStorage() {
  let courses;
  if (localStorage.getItem("courses") === null) {
    courses = [];
  } else {
    courses = JSON.parse(localStorage.getItem("courses"));
  }
  return courses;
}

// Remove course form the DOM
function removeCourse(e) {
  let courseId;
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.remove();
    courseId = e.target.parentElement.querySelector("a").getAttribute("data-id");
  }
  // Remove from local storage
  removeCourseLS(courseId);
}

// Check if target id exists in local storage
function removeCourseLS(id) {
  let coursesLS = getCoursesFromStorage();
  coursesLS.forEach(function (courseLS, index) {
    if (courseLS.id === id) {
      coursesLS.splice(index, 1);
    }
  });
  // Add the rest of the array
  localStorage.setItem("courses", JSON.stringify(coursesLS));
}

// Clear the shopping cart
function clearCart() {
  shoppingCartContent.innerHTML = "";
  // Clear from local storage
  clearLocalStorage();
}
// Clear whole local storage
function clearLocalStorage() {
  localStorage.clear();
}

// Loads when document is ready and print courses into shopping cart
function getFromLocalStorage() {
  let coursesLS = getCoursesFromStorage();
  // LOOP throught the courses and print into the cart
  coursesLS.forEach(function (course) {
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${course.image}">
      <div>${course.title}</div>
      <div>${course.price}</div>
      <a href="#" class="remove" data-id="${course.id}">X</a>
    `;
    div.classList.add("course");
    shoppingCartContent.appendChild(div);
  });
}
