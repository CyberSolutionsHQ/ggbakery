(function () {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));

  function isDesktopNav() {
    return window.matchMedia("(min-width: 53.75rem)").matches;
  }

  function setMenuState(isOpen) {
    if (!menuButton || !nav) return;
    const shouldOpen = Boolean(isOpen) && !isDesktopNav();
    nav.classList.toggle("nav--open", shouldOpen);
    menuButton.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
  }

  function closeMenu() {
    setMenuState(false);
  }

  if (menuButton && nav) {
    setMenuState(false);

    menuButton.addEventListener("click", function () {
      setMenuState(!nav.classList.contains("nav--open"));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("nav--open")) {
        closeMenu();
        menuButton.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("nav--open")) return;
      if (nav.contains(event.target) || menuButton.contains(event.target)) return;
      closeMenu();
    });

    window.addEventListener("resize", function () {
      if (isDesktopNav()) closeMenu();
    });
  }

  function normalizePathname(pathname) {
    const filename = pathname.split("/").pop() || "index.html";
    if (!filename.includes(".")) return "index.html";
    return filename.toLowerCase();
  }

  const currentFile = normalizePathname(window.location.pathname);
  navLinks.forEach(function (link) {
    const href = link.getAttribute("href") || "";
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    const linkFile = normalizePathname(new URL(href, window.location.href).pathname);
    if (linkFile === currentFile) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  const orderForm = document.querySelector("[data-order-form]");
  if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(orderForm);
      const name = (formData.get("name") || "").toString().trim();
      const phone = (formData.get("phone") || "").toString().trim();
      const items = (formData.get("items") || "").toString().trim();
      const desiredDate = (formData.get("date") || "").toString();
      const notes = (formData.get("notes") || "").toString().trim();

      const subject = "Special order request - " + (name || "Golden Gulf Bakery customer");
      const lines = [
        "Hello Golden Gulf Bakery,",
        "",
        "I would like to request a special order.",
        "",
        "Name: " + (name || "Not provided"),
        "Phone: " + (phone || "Not provided"),
        "Requested items: " + (items || "Not provided"),
        "Desired date: " + (desiredDate || "Not provided"),
        "Notes: " + (notes || "None"),
        "",
        "I understand special orders are limited and require approval under Mississippi cottage food laws."
      ];

      const body = lines.join("\n");
      const mailto =
        "mailto:goldengulfbakery@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      window.location.href = mailto;
    });
  }

  const logoImage = document.querySelector(".brand__logo");
  if (logoImage) {
    logoImage.addEventListener("error", function () {
      logoImage.classList.add("is-hidden");
    });
  }

  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    const toggleButton = function () {
      if (window.scrollY > 400) {
        backToTop.classList.add("is-visible");
      } else {
        backToTop.classList.remove("is-visible");
      }
    };

    window.addEventListener("scroll", toggleButton, { passive: true });
    toggleButton();

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const yearNode = document.querySelector("[data-current-year]");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
})();
