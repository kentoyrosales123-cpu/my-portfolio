// ================= NAVIGATION =================
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// ================= CONTACT FORM =================
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

// ================= ROTATING TYPING EFFECT =================
const roles = ["Full-Stack Developer", "Engineer", "Educator", "Researcher"];

const typingText = document.getElementById("typing-text");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 1500); // pause before deleting
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

// Start animation when page loads
window.addEventListener("load", typeRole);
// ================= PARALLAX MOUSE EFFECT =================
const hero = document.querySelector(".hero");
const glassCard = document.querySelector(".glass-card");
const shape1 = document.querySelector(".shape-1");
const shape2 = document.querySelector(".shape-2");

if (hero && glassCard && shape1 && shape2) {
  hero.addEventListener("mousemove", (e) => {
    const heroRect = hero.getBoundingClientRect();

    const x = e.clientX - heroRect.left;
    const y = e.clientY - heroRect.top;

    const centerX = heroRect.width / 2;
    const centerY = heroRect.height / 2;

    const moveX = (x - centerX) / centerX;
    const moveY = (y - centerY) / centerY;

    glassCard.style.transform = `translate(${moveX * 18}px, ${moveY * 18}px)`;
    shape1.style.transform = `translate(${moveX * -35}px, ${moveY * -35}px)`;
    shape2.style.transform = `translate(${moveX * 35}px, ${moveY * 35}px)`;
  });

  hero.addEventListener("mouseleave", () => {
    glassCard.style.transform = "translate(0, 0)";
    shape1.style.transform = "translate(0, 0)";
    shape2.style.transform = "translate(0, 0)";
  });
}
// ================= SINGLE SECTION VIEW =================
const sections = document.querySelectorAll(".section, .hero");
const navLinksAll = document.querySelectorAll(".nav-links a");

// ================= PRO TRANSITION NAV =================
let currentSection = null;

function showSection(id) {
  const nextSection = document.querySelector(id);

  if (!nextSection) return;

  // First load
  if (!currentSection) {
    nextSection.classList.add("active");
    currentSection = nextSection;
    return;
  }

  if (nextSection === currentSection) return;

  const allSections = document.querySelectorAll(".section, .hero");

  const currentIndex = [...allSections].indexOf(currentSection);
  const nextIndex = [...allSections].indexOf(nextSection);

  const exitClass = nextIndex > currentIndex ? "exit-left" : "exit-right";

  currentSection.classList.add(exitClass);

  setTimeout(() => {
    currentSection.classList.remove("active", "exit-left", "exit-right");

    nextSection.classList.add("active");
    currentSection = nextSection;
  }, 400);
}

// handle navbar click
navLinksAll.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    showSection(targetId);
  });
});

// handle hero buttons click
document.querySelectorAll(".hero-buttons a").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = button.getAttribute("href");
    showSection(targetId);
  });
});

// show HOME by default
window.addEventListener("load", () => {
  showSection("#home");
});
// ================= INTERACTIVE PROJECTS =================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".premium-project-card");

// Filter projects
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      const category = card.dataset.category;

      if (filter === "all" || filter === category) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

// 3D hover tilt + modal open
projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * -10;
    const rotateY = ((x - rect.width / 2) / rect.width) * 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
  });

  



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
      formMessage.textContent = result.message || "❌ Failed to send message.";
    }
  } catch (err) {
    formMessage.textContent = "❌ Error sending message.";
  }
});
