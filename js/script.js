document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  content.classList.add("fade-in");

  const links = document.querySelectorAll("a");
  const pageFlipSound = document.getElementById("pageFlip");
  const currentUrl = window.location.href.split(/[?#]/)[0];

  // Обработка ссылок
  links.forEach(link => {
    const href = link.href.split(/[?#]/)[0];

    if (href === currentUrl) {
      link.classList.add("active");
      link.addEventListener("click", e => e.preventDefault());
      return;
    }

    link.addEventListener("click", function(e) {
      e.preventDefault();

      if (pageFlipSound) {
        pageFlipSound.currentTime = 0;
        pageFlipSound.play();
      }

      content.classList.remove("fade-in");
      content.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = this.getAttribute("href");
      }, 600);
    });
  });

  // Обработка формы на странице контактов
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const content = `Имя: ${name}\nEmail: ${email}\nСообщение:\n${message}`;

      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "message.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      form.reset();
    });
  }
});
