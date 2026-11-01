
// BKMI-Sweetbeauty official WhatsApp number
const BKMI_WHATSAPP_NUMBER = "2347037115801";

// Supabase connection details
const SUPABASE_URL = "https://ahercmxxwwbeobywyudv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_L0hGKk2ACWTVsTFrsfCvMQ_kK-nHXa1";

// Connect to Supabase
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

// Display current year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// MOBILE NAVIGATION
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
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
}

// ONLINE APPLICATION FORM
const applicationForm = document.getElementById("applicationForm");

if (applicationForm) {
  applicationForm.addEventListener("submit", async event => {
    event.preventDefault();

    const formError = document.getElementById("formError");
    const submitButton = applicationForm.querySelector(
      'button[type="submit"]'
    );

    formError.textContent = "";

    const data = new FormData(applicationForm);

    const fullName = data.get("fullName").trim();
    const phone = data.get("phone").trim();
    const email = data.get("email").trim();
    const course = data.get("course");
    const message = data.get("message").trim();

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

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

      if (error) {
        throw error;
      }

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
      if (whatsappWindow) {
        whatsappWindow.close();
      }

      console.error("Application submission error:", error);

      formError.textContent =
        "We could not submit your application. Please try again or contact BKMI on WhatsApp.";

    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit Application";
    }
  });
}
