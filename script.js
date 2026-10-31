// Add BKMI's official WhatsApp number below in international format without + or spaces.
// Example for a Nigerian number: 2348012345678
const BKMI_WHATSAPP_NUMBER = "2347037115801";

document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "✕" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}));

document.getElementById("applicationForm").addEventListener("submit", event => {
  event.preventDefault();
  const number = BKMI_WHATSAPP_NUMBER;
  if (!/^234\d{10}$/.test(number) || number === "2340000000000") {
    document.getElementById("formError").textContent =
      "The school WhatsApp number has not been added yet. Please contact the school directly while this is being configured.";
    return;
  }
  const data = new FormData(event.currentTarget);
  const message = [
    "Hello BKMI-Sweetbeauty Cosmetology School, I would like to make a course enquiry.",
    `Name: ${data.get("fullName")}`,
    `Phone: ${data.get("phone")}`,
    `Course of interest: ${data.get("course")}`,
    `Message: ${data.get("message") || "Please share more information."}`
  ].join("\n");
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
