const menuToggle = document.querySelector(".menu-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const navLinks = document.querySelector(".nav-links");
const certButtons = document.querySelectorAll(".cert-card button");
const modal = document.getElementById("previewModal");
const modalImage = modal.querySelector("img");
const modalTitle = modal.querySelector("h3");
const modalLink = modal.querySelector(".modal-link");
const modalClose = modal.querySelector(".modal-close");
const THEME_KEY = "portfolioTheme";

const getDefaultTheme = () => {
  const hour = new Date().getHours();
  return hour >= 7 && hour < 19 ? "light" : "dark";
};

const applyTheme = (theme) => {
  document.body.classList.toggle("light", theme === "light");
  document.body.classList.toggle("dark", theme === "dark");
  if (themeToggle) {
    themeToggle.textContent = theme === "light" ? "🌙 Dark" : "☀️ Light";
    themeToggle.setAttribute(
      "aria-label",
      `Switch to ${theme === "light" ? "dark" : "light"} theme`,
    );
  }
};

const storedTheme = localStorage.getItem(THEME_KEY);
applyTheme(storedTheme || getDefaultTheme());

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light")
      ? "dark"
      : "light";
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("opened");
  });
}

certButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".cert-card");
    const image = card.dataset.image;
    const title = card.dataset.title;
    const link = card.dataset.link;

    modalImage.src = image;
    modalImage.alt = title;
    modalTitle.textContent = title;
    modalLink.href = link;
    modalLink.textContent =
      link && link !== "#"
        ? "Open verification page"
        : "No verification link available";
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
  });
});

const closeModal = () => {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
};

modalClose.addEventListener("click", closeModal);
modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

const contactEmail = document.getElementById("contactEmail");
const sendGmailButton = document.getElementById("sendGmailButton");
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

if (sendGmailButton) {
  sendGmailButton.addEventListener("click", () => {
    const email = contactEmail?.value.trim();

    if (contactEmail && !email) {
      contactEmail.focus();
      return;
    }

    const subject = encodeURIComponent("Hello from your portfolio");
    const body = encodeURIComponent(email ? `Visitor email: ${email}` : "");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=yaseenibnkhan@gmail.com&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank");
  });
}

const updateActiveNav = () => {
  const scrollPosition = window.scrollY + window.innerHeight / 2;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const anchor = document.querySelector(
      `.nav-links a[href='#${section.id}']`,
    );

    if (scrollPosition >= top && scrollPosition < bottom) {
      anchor?.classList.add("active");
    } else {
      anchor?.classList.remove("active");
    }
  });
};

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);
