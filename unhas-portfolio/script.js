// Substitua por seu número de WhatsApp no formato internacional, sem espaços nem traços.
// Exemplo Brasil (DDD 11): 55 + 11 + número -> "5511999999999"
const WHATSAPP_NUMBER = "5512992100548";

const SERVICE_GALLERIES = {
  manicure: [
    "https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3738343/pexels-photo-3738343.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  pedicure: [
    "https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3738346/pexels-photo-3738346.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  blindagem: [
    "https://images.pexels.com/photos/3738349/pexels-photo-3738349.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  gel: [
    "https://images.pexels.com/photos/3738345/pexels-photo-3738345.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3738343/pexels-photo-3738343.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  spa: [
    "https://images.pexels.com/photos/3738346/pexels-photo-3738346.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3738362/pexels-photo-3738362.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  relaxante: [
    "https://images.pexels.com/photos/3738349/pexels-photo-3738349.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3738355/pexels-photo-3738355.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  detox: [
    "https://images.pexels.com/photos/3738362/pexels-photo-3738362.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
  linfatica: [
    "https://images.pexels.com/photos/3738355/pexels-photo-3738355.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3738346/pexels-photo-3738346.jpeg?auto=compress&cs=tinysrgb&w=800",
  ],
};

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

function initServiceGalleries() {
  const cards = document.querySelectorAll(".card[data-gallery]");

  cards.forEach((card) => {
    const key = card.getAttribute("data-gallery");
    const images = SERVICE_GALLERIES[key];
    const imgDiv = card.querySelector(".card-img");
    const prev = card.querySelector(".gallery-arrow-prev");
    const next = card.querySelector(".gallery-arrow-next");

    if (!images || images.length === 0 || !imgDiv) return;

    card.dataset.galleryIndex = "0";
    imgDiv.style.backgroundImage = `url('${images[0]}')`;

    const changeImage = (direction) => {
      const current = Number(card.dataset.galleryIndex || "0");
      const total = images.length;
      const nextIndex = (current + direction + total) % total;
      imgDiv.classList.add("is-changing");

      setTimeout(() => {
        card.dataset.galleryIndex = String(nextIndex);
        imgDiv.style.backgroundImage = `url('${images[nextIndex]}')`;
        imgDiv.classList.remove("is-changing");
      }, 180);
    };

    if (prev) {
      prev.addEventListener("click", (event) => {
        event.stopPropagation();
        changeImage(-1);
      });
    }

    if (next) {
      next.addEventListener("click", (event) => {
        event.stopPropagation();
        changeImage(1);
      });
    }
  });
}

function initLogoMark() {
  const logo = document.querySelector(".logo");
  const img = document.querySelector(".logo-mark");

  if (!logo || !img) return;

  img.addEventListener("load", () => {
    logo.classList.add("has-image");
  });
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
  initServiceGalleries();
  initLogoMark();
});

