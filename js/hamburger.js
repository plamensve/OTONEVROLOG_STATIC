document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    } else {
        console.error("Не е намерен елемент .hamburger или .nav-links!");
    }
});
