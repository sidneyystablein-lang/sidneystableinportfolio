/* ================= INTRO SCROLL ================= */

const scrollArrow = document.querySelector(".scroll-arrow");

if (scrollArrow) {
  scrollArrow.addEventListener("click", () => {
    document
      .getElementById("projects")
      .scrollIntoView({ behavior: "smooth" });
  });
}


/* ================= PROJECT FILTERING ================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".project-card");

let activeTags = [];

if (filterButtons.length && cards.length) {

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      const tag = button.dataset.tag;

      button.classList.toggle("active");

      if (activeTags.includes(tag)) {
        activeTags = activeTags.filter(t => t !== tag);
      } else {
        activeTags.push(tag);
      }

        cards.forEach(card => {

        const tags = card.dataset.tags.split(" ");

        const show =
            activeTags.length === 0 ||
            activeTags.some(tag => tags.includes(tag));

        card.style.display = show ? "flex" : "none";

        });

    });

  });

}
/* ================= HEADER SCROLL (INDEX PAGE ONLY) ================= */

const header = document.querySelector(".site-header");

if (header && document.body.classList.contains("index-page")) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("visible");
    } else {
      header.classList.remove("visible");
    }
  });
}


/* ================= PROJECT PAGE STICKY HEADER ================= */

if (header && document.body.classList.contains("project-page")) {
  header.classList.add("sticky");
}


/* ================= PROJECT DROPDOWN ================= */

const projectNav = document.querySelector(".nav-projects");
const projectToggle = document.querySelector(".projects-toggle");

if (projectNav && projectToggle) {
  projectToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    projectNav.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!projectNav.contains(e.target)) {
      projectNav.classList.remove("open");
    }
  });
}

/* ================= SLIDESHOW ================= */

const slideshows = document.querySelectorAll(".slideshow-container");

slideshows.forEach((slideshow) => {
  const slides = slideshow.querySelectorAll(".slide");
  const dotsContainer = slideshow.querySelector(".dots-container");
  let dots = slideshow.querySelectorAll(".dot");
  const prevBtn = slideshow.querySelector(".slide-prev");
  const nextBtn = slideshow.querySelector(".slide-next");
  
  if (dotsContainer && dots.length !== slides.length) {
    dotsContainer.innerHTML = "";
    slides.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.className = "dot";
      dot.dataset.slide = index;
      dotsContainer.appendChild(dot);
    });
    dots = slideshow.querySelectorAll(".dot");
  }

  let currentSlide = 0;

  // Show slide by index
  function showSlide() {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));
    
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide();
  }

  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide();
  }

  // Dot navigation
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      currentSlide = parseInt(dot.dataset.slide);
      showSlide();
    });
  });

  // Button navigation
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Initialize first slide
  showSlide();
});

/* ================= BEFORE/AFTER SLIDERS ================= */

const sliders = document.querySelectorAll(".before-after-slider");

sliders.forEach(slider => {
  const range = slider.querySelector(".fade-slider");
  const afterImage = slider.querySelector(".after-image");
  const labelBefore = slider.querySelector(".label.before");
  const labelAfter = slider.querySelector(".label.after");

  function update(value) {
    const percent = parseFloat(value);

    // fade top image ONLY (never whole container)
    afterImage.style.opacity = 1 - (percent / 100);

    // label active states
    if (labelBefore) {
      labelBefore.classList.toggle("active", percent < 40);
    }

    if (labelAfter) {
      labelAfter.classList.toggle("active", percent > 60);
    }
  }

  function set(value) {
    range.value = value;
    update(value);
  }

  // init
  update(range.value);

  // slider interaction
  range.addEventListener("input", e => {
    update(e.target.value);
  });

  // label clicks
  if (labelBefore) {
    labelBefore.addEventListener("click", () => set(0));
  }

  if (labelAfter) {
    labelAfter.addEventListener("click", () => set(100));
  }
});