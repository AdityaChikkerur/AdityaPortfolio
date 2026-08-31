(() => {
  "use strict";

  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const cursorGlow = document.getElementById("cursorGlow");


  /* ---------------- OPENING VOYAGE ---------------- */
  const introScreen = document.getElementById("introScreen");
  if (introScreen) {
    document.documentElement.classList.add("intro-running");
    window.setTimeout(() => {
      introScreen.classList.add("intro-finished");
      document.documentElement.classList.remove("intro-running");
      document.body.classList.add("home-revealed");
      window.dispatchEvent(new Event("home:revealed"));
    }, 5900);
  }

  /* ---------------- THEME ---------------- */
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀";
  }

  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀" : "☾";

    localStorage.setItem(
      "portfolio-theme",
      isDark ? "dark" : "light"
    );
  });

  /* ---------------- CURSOR GLOW ---------------- */
  window.addEventListener(
    "pointermove",
    (event) => {
      if (!cursorGlow) return;

      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    },
    { passive: true }
  );

  /* ---------------- SMOOTH ANCHORS ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const selector = link.getAttribute("href");
      if (!selector || selector === "#") return;

      const target = document.querySelector(selector);
      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  /* ---------------- MAGNETIC BUTTONS ---------------- */
  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();

      const x =
        (event.clientX - rect.left - rect.width / 2) * 0.08;

      const y =
        (event.clientY - rect.top - rect.height / 2) * 0.08;

      element.style.transform = `translate(${x}px, ${y}px)`;
    });

    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });
})();

/* =========================================================
   HOME NAME + TERMINAL TYPEWRITER
   ========================================================= */
(() => {
  const name = document.getElementById('nameTyping');
  const surname = document.getElementById('surnameTyping');

  if (name && surname) {
    const first = 'I’m Aditya';
    const last = 'Chikkerur.';
    let i = 0;
    let j = 0;

    const typeFirst = () => {
      if (i < first.length) {
        name.textContent += first[i++];
        window.setTimeout(typeFirst, 85);
      } else {
        window.setTimeout(typeLast, 260);
      }
    };

    const typeLast = () => {
      if (j < last.length) {
        surname.textContent += last[j++];
        window.setTimeout(typeLast, 95);
      }
    };

    const startTyping = () => window.setTimeout(typeFirst, 420);

    if (document.body.classList.contains('home-revealed')) {
      startTyping();
    } else {
      window.addEventListener('home:revealed', startTyping, { once: true });
    }
  }
})();
