const WHATSAPP_NUMBER = "5531986628694";
const currentYear = document.querySelector("#ano-atual");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const business = String(formData.get("business") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const text = [
    "Olá, Pedro. Quero conversar sobre um projeto.",
    "",
    `Nome: ${name}`,
    `Negócio ou área: ${business}`,
    "",
    "O que gostaria de melhorar:",
    message,
  ].join("\n");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  formStatus.textContent = "Abrindo o WhatsApp com sua mensagem preenchida.";
  window.open(url, "_blank", "noopener,noreferrer");
});
