// ================= SAFE ELEMENTS =================
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

// ================= TYPING EFFECT =================
const roles = ["Full-Stack Developer", "Engineer", "Educator", "Researcher"];
const typingText = document.getElementById("typing-text");

const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("open");

    menuBtn.textContent = mobileNav.classList.contains("open") ? "✕" : "☰";
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuBtn.textContent = "☰";
    });
  });
}

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  if (!typingText) return;

  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 1400);
      return;
    }
  } else {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeRole, isDeleting ? 40 : 80);
}

window.addEventListener("load", typeRole);

const allSections = document.querySelectorAll(".hero, .section");
const allNavLinks = document.querySelectorAll(".nav a");

function showOnlySection(targetId) {
  allSections.forEach((section) => {
    section.classList.remove("active");
  });

  allNavLinks.forEach((link) => {
    link.classList.remove("active");
  });

  const targetSection = document.querySelector(targetId);
  const activeLink = document.querySelector(`.nav a[href="${targetId}"]`);

  if (targetSection) targetSection.classList.add("active");
  if (activeLink) activeLink.classList.add("active");
}

allNavLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    showOnlySection(targetId);
  });
});

document.querySelectorAll(".hero-buttons a").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = button.getAttribute("href");
    showOnlySection(targetId);
  });
});

window.addEventListener("load", () => {
  showOnlySection("#home");
});

// ================= ACTIVE NAV ON SCROLL =================
const sections = document.querySelectorAll("section[id]");
const headerLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  headerLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ================= SCROLL REVEAL TRANSITIONS =================
const revealElements = document.querySelectorAll(
  ".section-title, .section-subtitle, .about-card, .skill-card, .premium-project-card, .service-card, .contact-info, .contact-form",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// ================= PARALLAX HERO =================
const hero = document.querySelector(".hero");
const glassCard = document.querySelector(".glass-card");
const shape1 = document.querySelector(".shape-1");
const shape2 = document.querySelector(".shape-2");

if (hero && glassCard && shape1 && shape2) {
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) / rect.width;
    const moveY = (y - rect.height / 2) / rect.height;

    glassCard.style.transform = `translate(${moveX * 25}px, ${moveY * 25}px)`;
    shape1.style.transform = `translate(${moveX * -40}px, ${moveY * -40}px)`;
    shape2.style.transform = `translate(${moveX * 40}px, ${moveY * 40}px)`;
  });

  hero.addEventListener("mouseleave", () => {
    glassCard.style.transform = "translate(0, 0)";
    shape1.style.transform = "translate(0, 0)";
    shape2.style.transform = "translate(0, 0)";
  });
}

// ================= APPLE-LEVEL FILTER =================
// ================= PROJECT FILTER =================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach((card, index) => {
      const category = card.dataset.category;

      const shouldShow = filter === "all" || category === filter;

      if (shouldShow) {
        setTimeout(() => {
          card.style.display = "block";

          requestAnimationFrame(() => {
            card.classList.remove("hide");
          });
        }, index * 60);
      } else {
        card.classList.add("hide");

        setTimeout(() => {
          card.style.display = "none";
        }, 450);
      }
    });
  });
});

// ================= 3D TILT + LIGHT =================
projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;

    // light follow
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

// ================= PROJECT CARD TILT =================
projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * -8;
    const rotateY = ((x - rect.width / 2) / rect.width) * 8;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) translateY(0)";
  });
});

// ================= CONTACT FORM =================
if (contactForm && formMessage) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        formMessage.textContent = "✅ Message sent successfully!";
        contactForm.reset();
      } else {
        formMessage.textContent =
          result.message || "❌ Failed to send message.";
      }
    } catch (err) {
      formMessage.textContent = "❌ Error sending message.";
    }
  });
}

// ================= PREMIUM CARD MOUSE MOTION =================
const motionCards = document.querySelectorAll(
  ".about-card, .skill-card, .service-card",
);

motionCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * -8;
    const rotateY = ((x - rect.width / 2) / rect.width) * 8;

    card.style.transform = `
      translateY(-14px)
      scale(1.03)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1) rotateX(0) rotateY(0)";
  });
});
