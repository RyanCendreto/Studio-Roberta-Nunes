// Substitua por seu número de WhatsApp no formato internacional, sem espaços nem traços.
// Exemplo Brasil (DDD 11): 55 + 11 + número -> "5511999999999"
const WHATSAPP_NUMBER = "5512992100548";

function buildWhatsappUrl(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  if (!year || !month || !day) return dateStr;
  return `${day}/${month}/${year}`;
}

function handleBookingSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const note = document.getElementById("note").value.trim();

  if (!name || !service || !date) {
    alert("Por favor, preencha pelo menos nome, tipo de serviço e dia desejado.");
    return;
  }

  const dateFormatted = formatDate(date);

  let message = `Olá! Gostaria de agendar um horário para unhas.%0A%0A`;
  message += `• Nome: ${name}%0A`;
  message += `• Serviço: ${service}%0A`;
  message += `• Dia desejado: ${dateFormatted || "não informado"}%0A`;
  message += `• Horário aproximado: ${time || "não informado"}%0A`;

  if (note) {
    message += `%0AObservações:%0A${encodeURIComponent(note)}`;
  }

  const url = buildWhatsappUrl(decodeURIComponent(message));
  window.open(url, "_blank");
}

function handleHeroWhatsapp() {
  const message = "Olá! Gostaria de agendar um horário para unhas.";
  const url = buildWhatsappUrl(message);
  window.open(url, "_blank");
}

function handleFloatingWhatsapp() {
  const message = "Olá! Gostaria de agendar um horário para unhas.";
  const url = buildWhatsappUrl(message);
  window.open(url, "_blank");
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".card");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      cards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

function setCurrentYear() {
  const span = document.getElementById("year");
  if (span) {
    span.textContent = new Date().getFullYear();
  }
}

function setMinBookingDate() {
  const dateInput = document.getElementById("date");
  if (!dateInput) return;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  dateInput.min = `${year}-${month}-${day}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("booking-form");
  const heroBtn = document.getElementById("hero-whatsapp-btn");
  const floatingBtn = document.getElementById("floating-whatsapp-btn");

  if (bookingForm) {
    bookingForm.addEventListener("submit", handleBookingSubmit);
  }

  if (heroBtn) {
    heroBtn.addEventListener("click", handleHeroWhatsapp);
  }

  if (floatingBtn) {
    floatingBtn.addEventListener("click", handleFloatingWhatsapp);
  }

  setupFilters();
  setCurrentYear();
  setMinBookingDate();
});

