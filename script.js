/**
 * SMILE DEMO DENTAL CLINIC - INTERACTIVE ENGINE
 * --------------------------------------------------------------------------
 * Handles:
 * 1. Automatic Re-branding from CLINIC_CONFIG
 * 2. Mobile Drawer Navigation
 * 3. Animated Count-Up Numbers (IntersectionObserver)
 * 4. Interactive Before/After Drag Slider (Mouse & Touch)
 * 5. Patient Reviews Carousel & Dots
 * 6. FAQ Accordion
 * 7. Call-back Form -> WhatsApp instant connection
 * --------------------------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", () => {
  initRebranding();
  initMobileNav();
  initStatsCounter();
  initBeforeAfterSlider();
  initReviewsCarousel();
  initFaqAccordion();
  initCallbackForm();
  initDemoRibbon();
});

/* ==========================================================================
   1. AUTOMATIC RE-BRANDING ENGINE
   ========================================================================== */
function initRebranding() {
  if (typeof CLINIC_CONFIG === "undefined") {
    console.warn("CLINIC_CONFIG not found in global scope.");
    return;
  }

  const cfg = CLINIC_CONFIG;

  // 1. Update Document Title & Meta Description
  document.title = `${cfg.clinicName} | ${cfg.tagline}`;
  
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute("content", `${cfg.clinicName} in ${cfg.area}, ${cfg.city}. ${cfg.tagline}. Lead by ${cfg.doctorName} (${cfg.doctorQualification}).`);
  }

  // 2. Populate text content for [data-config="property"]
  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.getAttribute("data-config");
    if (cfg[key] !== undefined) {
      el.textContent = cfg[key];
    }
  });

  // 3. Populate HTML content for [data-config-html="property"]
  document.querySelectorAll("[data-config-html]").forEach((el) => {
    const key = el.getAttribute("data-config-html");
    if (cfg[key] !== undefined) {
      el.innerHTML = cfg[key];
    }
  });

  // 4. Update Phone Links
  document.querySelectorAll("[data-config-phone]").forEach((el) => {
    el.setAttribute("href", `tel:${cfg.phoneRaw}`);
  });

  // 5. Update WhatsApp Links
  document.querySelectorAll("[data-config-whatsapp]").forEach((el) => {
    const defaultMsg = encodeURIComponent(`Hello ${cfg.clinicName}! I would like to schedule a dental consultation.`);
    el.setAttribute("href", `https://wa.me/${cfg.whatsappRaw}?text=${defaultMsg}`);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  // 6. Update Map Links
  document.querySelectorAll("[data-config-map]").forEach((el) => {
    el.setAttribute("href", cfg.mapLink);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  // 7. Update JSON-LD Structured Data
  updateJsonLd(cfg);
}

function updateJsonLd(cfg) {
  const scriptTag = document.getElementById("dental-schema-jsonld");
  if (!scriptTag) return;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": cfg.clinicName,
    "description": cfg.tagline,
    "telephone": cfg.phone,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": cfg.address,
      "addressLocality": cfg.area,
      "addressRegion": cfg.city,
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Sa 09:30-20:00",
    "founder": {
      "@type": "Person",
      "name": cfg.doctorName,
      "jobTitle": cfg.doctorTitle,
      "honorificSuffix": cfg.doctorQualification
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": cfg.googleReviewRating || "4.9",
      "reviewCount": "380"
    }
  };

  scriptTag.textContent = JSON.stringify(schemaData, null, 2);
}

/* ==========================================================================
   2. DEMO RIBBON TOGGLE
   ========================================================================== */
function initDemoRibbon() {
  const ribbon = document.getElementById("demo-ribbon");
  if (!ribbon) return;

  if (typeof CLINIC_CONFIG !== "undefined" && CLINIC_CONFIG.showDemoRibbon === false) {
    ribbon.style.display = "none";
    return;
  }

  const closeBtn = ribbon.querySelector(".close-ribbon");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      ribbon.style.display = "none";
    });
  }
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const drawer = document.getElementById("mobile-nav-drawer");
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close drawer on clicking any anchor link
  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* ==========================================================================
   4. ANIMATED STATS COUNTER
   ========================================================================== */
function initStatsCounter() {
  const statsSection = document.getElementById("stats-strip");
  if (!statsSection) return;

  let hasAnimated = false;

  const countUp = (el, target, decimals, duration = 2000) => {
    const startTime = performance.now();
    const startVal = 0;

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo function
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = startVal + (target - startVal) * ease;

      el.textContent = decimals ? current.toFixed(decimals) : Math.floor(current).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = decimals ? target.toFixed(decimals) : target.toLocaleString();
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          document.querySelectorAll(".stat-number[data-target]").forEach((numEl) => {
            const targetVal = parseFloat(numEl.getAttribute("data-target")) || 0;
            const decimals = parseInt(numEl.getAttribute("data-decimals") || "0", 10);
            countUp(numEl, targetVal, decimals);
          });
          observer.unobserve(statsSection);
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(statsSection);
}

/* ==========================================================================
   5. BEFORE / AFTER SPLIT DRAG SLIDER
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById("ba-slider-container");
  const beforeLayer = document.getElementById("ba-before-layer");
  const handle = document.getElementById("ba-handle");
  if (!container || !beforeLayer || !handle) return;

  let isDragging = false;

  const updateSlider = (clientX) => {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;

    // Constrain to container width
    if (offsetX < 10) offsetX = 10;
    if (offsetX > rect.width - 10) offsetX = rect.width - 10;

    const percentage = (offsetX / rect.width) * 100;
    beforeLayer.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  // Mouse Events
  handle.addEventListener("mousedown", (e) => {
    isDragging = true;
    e.preventDefault();
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  // Touch Events
  handle.addEventListener("touchstart", (e) => {
    isDragging = true;
  }, { passive: true });

  window.addEventListener("touchend", () => {
    isDragging = false;
  });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging || !e.touches[0]) return;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  // Container click directly jumps divider
  container.addEventListener("click", (e) => {
    updateSlider(e.clientX);
  });
}

/* ==========================================================================
   6. PATIENT STORIES CAROUSEL
   ========================================================================== */
function initReviewsCarousel() {
  const track = document.getElementById("stories-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const dotsContainer = document.getElementById("carousel-dots");
  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

  const cards = track.querySelectorAll(".story-card");
  const totalCards = cards.length;
  let currentIndex = 0;

  // Determine cards visible per page based on viewport
  const getVisibleCount = () => {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 992) return 2;
    return 3;
  };

  const getMaxIndex = () => {
    return Math.max(0, totalCards - getVisibleCount());
  };

  const renderDots = () => {
    dotsContainer.innerHTML = "";
    const maxIdx = getMaxIndex();
    const count = maxIdx + 1;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("button");
      dot.classList.add("carousel-dot");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      if (i === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  };

  const updateCarousel = () => {
    const card = cards[0];
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 24; // matches styles.css
    const offset = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    // Update active dot
    const dots = dotsContainer.querySelectorAll(".carousel-dot");
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });
  };

  const goToSlide = (idx) => {
    currentIndex = Math.max(0, Math.min(idx, getMaxIndex()));
    updateCarousel();
  };

  nextBtn.addEventListener("click", () => {
    if (currentIndex >= getMaxIndex()) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex <= 0) {
      currentIndex = getMaxIndex();
    } else {
      currentIndex--;
    }
    updateCarousel();
  });

  // Touch swipe support on track
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 45) {
      // Swiped left -> next
      if (currentIndex < getMaxIndex()) currentIndex++;
      updateCarousel();
    } else if (touchEndX - touchStartX > 45) {
      // Swiped right -> prev
      if (currentIndex > 0) currentIndex--;
      updateCarousel();
    }
  }, { passive: true });

  window.addEventListener("resize", () => {
    if (currentIndex > getMaxIndex()) {
      currentIndex = getMaxIndex();
    }
    renderDots();
    updateCarousel();
  });

  renderDots();
  updateCarousel();
}

/* ==========================================================================
   7. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question-btn");
    if (!button) return;

    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Optional: Close all other accordion items for clean single expansion
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("active");
          const otherBtn = other.querySelector(".faq-question-btn");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });

      item.classList.toggle("active", !isActive);
      button.setAttribute("aria-expanded", !isActive ? "true" : "false");
    });
  });
}

/* ==========================================================================
   8. CALL-BACK FORM -> WHATSAPP CONNECT
   ========================================================================== */
function initCallbackForm() {
  const form = document.getElementById("callback-request-form");
  const successAlert = document.getElementById("form-success-alert");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#cb-name")?.value.trim() || "";
    const phone = form.querySelector("#cb-phone")?.value.trim() || "";
    const time = form.querySelector("#cb-time")?.value || "";
    const treatment = form.querySelector("#cb-treatment")?.value || "";
    const message = form.querySelector("#cb-message")?.value.trim() || "";

    if (!name || !phone) {
      alert("Please provide both your name and contact phone number.");
      return;
    }

    const cfg = typeof CLINIC_CONFIG !== "undefined" ? CLINIC_CONFIG : {
      clinicName: "Dental Clinic",
      whatsappRaw: "910000000000",
      getWhatsAppMessage: (n, p, t, tr, m) => encodeURIComponent(`Inquiry from ${n}: ${p}`)
    };

    const encodedMsg = cfg.getWhatsAppMessage(name, phone, time, treatment, message);
    const waUrl = `https://wa.me/${cfg.whatsappRaw}?text=${encodedMsg}`;

    // Open WhatsApp
    window.open(waUrl, "_blank", "noopener,noreferrer");

    // Show friendly success confirmation on screen
    if (successAlert) {
      successAlert.style.display = "block";
      successAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // Reset form fields
    form.reset();
  });
}
