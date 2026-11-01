
// BKMI-Sweetbeauty official WhatsApp number
const BKMI_WHATSAPP_NUMBER = "2347037115801";

// Supabase connection details
// Replace these two values with your own Supabase Project URL
// and Publishable key.
const SUPABASE_URL = "PASTE_YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_PUBLISHABLE_KEY = "PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

// Online application form
const applicationForm = document.getElementById("applicationForm");

applicationForm.addEventListener("submit", async event => {
  event.preventDefault();

  const formError = document.getElementById("formError");
  const submitButton = applicationForm.querySelector('button[type="submit"]');

  formError.textContent = "";

  const data = new FormData(applicationForm);

  const fullName = data.get("fullName").trim();
  const phone = data.get("phone").trim();
  const email = data.get("email").trim();
  const course = data.get("course");
  const message = data.get("message").trim();

  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  // Open WhatsApp window now to avoid popup blocking after submission.
  const whatsappWindow = window.open("about:blank", "_blank");

  try {
    const { error } = await supabaseClient
      .from("Applications")
      .insert({
        "Full Name": fullName,
        "Email": email || null,
        "Phone Number": phone,
        "Course": course,
        "Message": message || null
      });

    if (error) throw error;

    const whatsappMessage = [
      "Hello BKMI-Sweetbeauty Cosmetology School, I have submitted an online application.",
      `Name: ${fullName}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not provided"}`,
      `Course: ${course}`,
      `Message: ${message || "Please share more information."}`
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/${BKMI_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    if (whatsappWindow) {
      whatsappWindow.location.href = whatsappUrl;
    } else {
      window.location.href = whatsappUrl;
    }

    applicationForm.reset();
  } catch (error) {
    if (whatsappWindow) whatsappWindow.close();

    console.error("Application submission error:", error);

    formError.textContent =
      "We could not submit your application. Please try again or contact BKMI on WhatsApp.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Submit application";
  }
});
