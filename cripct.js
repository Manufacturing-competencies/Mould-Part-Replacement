// =====================================================
// script.js (FINAL CLEAN)
// Aman untuk HP / Tablet / iPad / Desktop
// Tidak mengubah HTML & CSS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  initSafeHero();        // hero aman (tidak konflik animasi)
  initInfoPopup();       // popup (kalau ada)
  initContactSlider();   // slider drag (kalau ada)

  console.log("✅ script.js aktif:", window.location.pathname);
});

/* =====================================================
   HERO SAFETY
   - jaga supaya animasi CSS tidak terganggu
   - tidak memaksa style JS
===================================================== */
function initSafeHero(){
  const heroTitle = document.querySelector(".hero-5r-title");
  if(!heroTitle) return;

  // pastikan animasi CSS tidak di-override
  heroTitle.style.willChange = "transform";
}

/* =====================================================
   POPUP INFORMASI (index.html ONLY)
   - jalan hanya kalau element ada
   - mobile friendly
===================================================== */
function initInfoPopup() {
  const popup   = document.getElementById("infoPopup");
  const closeBtn= document.getElementById("infoClose");
  const slider  = document.querySelector(".info-slider");

  if (!popup || !closeBtn || !slider) return;

  const slides = Array.from(slider.querySelectorAll(".info-slide"));
  if(slides.length === 0) return;

  // tampil otomatis
  setTimeout(() => popup.classList.add("active"), 300);

  // close actions
  closeBtn.addEventListener("click", () => popup.classList.remove("active"));
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.classList.remove("active");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") popup.classList.remove("active");
  });

  // aktifkan slide tengah
  const setActiveSlide = () => {
    const centerX = slider.scrollLeft + slider.clientWidth / 2;

    let closest = { idx: 0, dist: Infinity };

    slides.forEach((slide, i) => {
      const slideCenter =
        slide.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(centerX - slideCenter);
      if (dist < closest.dist) {
        closest = { idx: i, dist };
      }
    });

    slides.forEach((s, i) => {
      s.classList.toggle("active", i === closest.idx);
      s.classList.toggle("inactive", i !== closest.idx);
    });
  };

  setActiveSlide();
  slider.addEventListener("scroll", () => {
    requestAnimationFrame(setActiveSlide);
  }, { passive:true });
}

/* =====================================================
   CONTACT SLIDER DRAG
   - HP: swipe native
   - Desktop: drag mouse
   - Aman walau element tidak ada
===================================================== */
function initContactSlider() {
  const grid = document.getElementById("contactGrid");
  if (!grid) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  // mouse (desktop)
  grid.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX;
    scrollLeft = grid.scrollLeft;
    grid.classList.add("dragging");
  });

  window.addEventListener("mouseup", () => {
    isDown = false;
    grid.classList.remove("dragging");
  });

  grid.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const walk = (e.pageX - startX) * 1.2;
    grid.scrollLeft = scrollLeft - walk;
  });

  // touch (HP / tablet)
  grid.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = grid.scrollLeft;
  }, { passive:true });

  grid.addEventListener("touchmove", (e) => {
    const walk = (e.touches[0].pageX - startX);
    grid.scrollLeft = scrollLeft - walk;
  }, { passive:true });
}
