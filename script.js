
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
// BKMI APPLICANT SESSION AND BANK TRANSFER

const applicationForm = document.getElementById("applicationForm");

if (applicationForm) {
  applicationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formError = document.getElementById("formError");
    const submitButton = applicationForm.querySelector(
      'button[type="submit"]'
    );

    const formData = new FormData(applicationForm);

    const fullName = String(formData.get("fullName") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const course = String(formData.get("course") || "").trim();

    formError.textContent = "";

    if (!fullName || !phone || !course) {
      formError.textContent =
        "Please enter your name, phone number and select a course.";
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Preparing payment...";

    try {
      // STEP 1: CREATE APPLICANT SESSION

      const { data: sessionData, error: sessionError } =
        await supabaseClient.functions.invoke(
          "create-applicant-session",
          {
            body: {
              full_name: fullName,
              email: email,
              phone: phone
            }
          }
        );

      if (sessionError) throw sessionError;

      if (
        !sessionData ||
        !sessionData.success ||
        !sessionData.applicant_token
      ) {
        throw new Error(
          sessionData?.error || "Applicant session could not be created."
        );
      }

      const applicantToken = sessionData.applicant_token;

      // Keep the applicant session for the next enrolment stage.
      sessionStorage.setItem(
        "bkmi_applicant_token",
        applicantToken
      );

      sessionStorage.setItem(
        "bkmi_applicant_session_id",
        sessionData.applicant_session_id
      );

      // STEP 2: CREATE BOTH BANK TRANSFER REQUESTS

      const paymentTypes = [
        "Registration Fee",
        "Admission Fee"
      ];

      const paymentRequests = [];

      for (const paymentType of paymentTypes) {
        const { data, error } =
          await supabaseClient.functions.invoke(
            "initialize-applicant-bank-transfer",
            {
              headers: {
                Authorization: `Bearer ${applicantToken}`
              },
              body: {
                payment_type: paymentType
              }
            }
          );

        if (error) throw error;

        if (!data || !data.success) {
          throw new Error(
            data?.error || `Could not prepare ${paymentType}.`
          );
        }

        paymentRequests.push(data);
      }

      // STEP 3: DISPLAY PAYMENT INSTRUCTIONS

      const firstPayment = paymentRequests[0];
      const account = firstPayment.bank_details;

      let resultBox = document.getElementById(
        "bkmiPaymentInstructions"
      );

      if (!resultBox) {
        resultBox = document.createElement("div");
        resultBox.id = "bkmiPaymentInstructions";
        applicationForm.insertAdjacentElement(
          "afterend",
          resultBox
        );
      }

      resultBox.style.cssText =
        "background:#f7effb;padding:20px;margin-top:20px;border-radius:12px;color:#333;";

      resultBox.innerHTML = "";

      const heading = document.createElement("h3");
      heading.textContent = "BKMI-Sweetbeauty Payment Instructions";
      resultBox.appendChild(heading);

      const introduction = document.createElement("p");
      introduction.textContent =
        "Please transfer both fees to the account below. Your enrolment application will be available after BKMI confirms both payments.";
      resultBox.appendChild(introduction);

      const accountDetails = document.createElement("p");
      accountDetails.textContent =
        `Bank: ${account.bank_name}\n` +
        `Account Name: ${account.account_name}\n` +
        `Account Number: ${account.account_number}`;
      accountDetails.style.whiteSpace = "pre-line";
      resultBox.appendChild(accountDetails);

      paymentRequests.forEach((payment) => {
        const paymentDetails = document.createElement("p");

        paymentDetails.textContent =
          `${payment.payment_type}: ₦${Number(
            payment.amount
          ).toLocaleString("en-NG")}\n` +
          `Payment Reference: ${payment.reference}\n` +
          `Status: ${payment.payment_status}`;

        paymentDetails.style.whiteSpace = "pre-line";
        resultBox.appendChild(paymentDetails);
      });

      const whatsappButton = document.createElement("a");
      whatsappButton.href = firstPayment.whatsapp_url;
      whatsappButton.target = "_blank";
      whatsappButton.rel = "noopener";
      whatsappButton.textContent =
        "Send Payment Details to BKMI on WhatsApp";
      whatsappButton.style.cssText =
        "display:inline-block;background:#54206f;color:white;padding:12px 18px;border-radius:8px;text-decoration:none;margin-top:12px;";

      resultBox.appendChild(whatsappButton);

      formError.textContent =
        "Your payment requests have been created. Please complete both transfers.";

      submitButton.textContent = "Payment Requests Created";

    } catch (error) {
      console.error("BKMI applicant payment error:", error);

      formError.textContent =
        error.message ||
        "We could not prepare your payment requests. Please contact BKMI.";

      submitButton.disabled = false;
      submitButton.textContent = "Submit Application";
    }
  });
}
