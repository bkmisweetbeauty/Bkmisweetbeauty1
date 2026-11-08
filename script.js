
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

function showApplicantPaymentPortal(token) {
  let resultBox = document.getElementById("bkmiPaymentInstructions");

  if (!resultBox) {
    resultBox = document.createElement("div");
    resultBox.id = "bkmiPaymentInstructions";
    applicationForm.insertAdjacentElement("afterend", resultBox);
  }

  resultBox.style.cssText =
    "background:#f7effb;padding:20px;margin-top:20px;border-radius:12px;color:#333;";

  let paymentStatusBox = document.getElementById("bkmiPaymentStatus");

  if (!paymentStatusBox) {
    paymentStatusBox = document.createElement("div");
    paymentStatusBox.id = "bkmiPaymentStatus";
    paymentStatusBox.style.cssText =
      "background:#fff;padding:20px;margin-top:20px;border-radius:12px;";
    resultBox.appendChild(paymentStatusBox);
  }

  paymentStatusBox.innerHTML = `
    <h3>Enrolment Payment Verification</h3>
    <p id="bkmiPaymentStatusMessage">
      Your full application is locked until BKMI confirms both payments.
    </p>
    <button type="button" id="bkmiCheckPaymentButton"
      style="background:#54206f;color:white;padding:13px;border:0;border-radius:8px;width:100%;margin-top:12px;">
      Check My Payment Status
    </button>
    <form id="bkmiFullApplication" hidden
      style="background:white;padding:20px;margin-top:20px;border:2px solid #54206f;border-radius:12px;">

      <h3>Complete Your Enrolment Application</h3>

      <label for="bkmiCourse">Select Your Course *</label>
      <select id="bkmiCourse" required
        style="display:block;width:100%;padding:12px;margin:10px 0;">
        <option value="">Choose a course</option>
        <option value="Cosmetology">Cosmetology</option>
        <option value="Hairdressing">Hairdressing</option>
        <option value="Makeup Artistry">Makeup Artistry</option>
        <option value="Nail Technology">Nail Technology</option>
        <option value="Spa Therapy">Spa Therapy</option>
        <option value="Semi-Permanent Brows and Lashes">Semi-Permanent Brows and Lashes</option>
        <option value="Barbering">Barbering</option>
        <option value="Wig Making">Wig Making</option>
        <option value="Professional Braiding">Professional Braiding</option>
      </select>

<h3>Personal Information & Guarantor Details</h3>

<label for="bkmiBirthYear">Date of Birth * — Year</label>
<select id="bkmiBirthYear" required
  style="display:block;width:100%;padding:12px;margin:10px 0;">
  <option value="">Select Year</option>
  ${Array.from({length: new Date().getFullYear() - 1939}, (_, i) => {
    const y = new Date().getFullYear() - i;
    return `<option value="${y}">${y}</option>`;
  }).join("")}
</select>

<label for="bkmiBirthMonth">Date of Birth * — Month</label>
<select id="bkmiBirthMonth" required
  style="display:block;width:100%;padding:12px;margin:10px 0;">
  <option value="">Select Month</option>
  ${["January","February","March","April","May","June","July","August","September","October","November","December"]
    .map((m,i) => `<option value="${String(i+1).padStart(2,"0")}">${m}</option>`).join("")}
</select>

<label for="bkmiBirthDay">Date of Birth * — Day</label>
<select id="bkmiBirthDay" required
  style="display:block;width:100%;padding:12px;margin:10px 0;">
  <option value="">Select Day</option>
  ${Array.from({length:31}, (_,i) => {
    const d = String(i+1).padStart(2,"0");
    return `<option value="${d}">${i+1}</option>`;
  }).join("")}
</select>

<label for="bkmiEducation">Highest Level of Education (Optional)</label>
<select id="bkmiEducation"
  style="display:block;width:100%;padding:12px;margin:10px 0;">
  <option value="">Select Education Level</option>
  <option>Primary School</option>
  <option>Junior Secondary School</option>
  <option>Senior Secondary School (WAEC/NECO/SSCE)</option>
  <option>OND</option>
  <option>NCE</option>
  <option>HND</option>
  <option>Bachelor's Degree</option>
  <option>Postgraduate Degree</option>
  <option>Other</option>
  <option>No Formal Education</option>
</select>

<label for="bkmiAddress">House Address (Optional)</label>
<textarea id="bkmiAddress" rows="3"
  style="display:block;width:100%;padding:12px;margin:10px 0;"
  placeholder="Enter your residential address"></textarea>

<h3>Guarantor Details (Optional)</h3>

<label for="bkmiGuarantorName">Guarantor's Full Name</label>
<input type="text" id="bkmiGuarantorName"
  style="display:block;width:100%;padding:12px;margin:10px 0;"
  placeholder="Guarantor's full name">

<label for="bkmiGuarantorPhone">Guarantor's Phone Number</label>
<input type="tel" id="bkmiGuarantorPhone"
  style="display:block;width:100%;padding:12px;margin:10px 0;"
  placeholder="Guarantor's phone number">

<label for="bkmiGuarantorEmail">Guarantor's Email Address</label>
<input type="email" id="bkmiGuarantorEmail"
  style="display:block;width:100%;padding:12px;margin:10px 0;"
  placeholder="Guarantor's email address">

      <label for="bkmiMessage">Additional Information (Optional)</label>
      <textarea id="bkmiMessage" rows="4"
        style="display:block;width:100%;padding:12px;margin:10px 0;"
        placeholder="Additional information"></textarea>

      <button type="submit"
        style="background:#54206f;color:white;padding:14px;border:0;border-radius:8px;width:100%;">
        Submit Full Application
      </button>

      <p id="bkmiFullApplicationMessage"></p>
    </form>
  `;

  const checkButton = document.getElementById("bkmiCheckPaymentButton");
  const fullApplication = document.getElementById("bkmiFullApplication");
  const statusMessage = document.getElementById("bkmiPaymentStatusMessage");

  async function checkApplicantPayments() {
    const savedToken = sessionStorage.getItem("bkmi_applicant_token");

    if (!savedToken) {
      statusMessage.textContent =
        "Your applicant session has expired. Please start again.";
      return;
    }

    checkButton.disabled = true;
    checkButton.textContent = "Checking...";

    try {
      const { data, error } =
        await supabaseClient.functions.invoke(
          "submit-applicant-application",
          {
            headers: {
              Authorization: `Bearer ${savedToken}`
            },
            body: {
              action: "check_payment_status"
            }
          }
        );

      if (error) throw error;

      if (!data || !data.success) {
        throw new Error(data?.error || "Unable to check payment status.");
      }

      if (data.payments_confirmed) {
        statusMessage.textContent =
          "Both payments have been confirmed. You can now complete your full application.";

        fullApplication.hidden = false;
        checkButton.textContent = "Payments Confirmed";
        checkButton.disabled = true;
      } else {
        fullApplication.hidden = true;
        statusMessage.textContent =
          "We are still waiting for BKMI to confirm both fees. Please check again after confirmation.";

        checkButton.disabled = false;
        checkButton.textContent = "Check My Payment Status";
      }

    } catch (error) {
      statusMessage.textContent =
        error.message || "Payment verification failed.";

      checkButton.disabled = false;
      checkButton.textContent = "Check My Payment Status";
    }
  }

  checkButton.addEventListener("click", checkApplicantPayments);

  fullApplication.addEventListener("submit", async (event) => {
    event.preventDefault();

    const messageElement = document.getElementById(
      "bkmiFullApplicationMessage"
    );

    const submitButton = fullApplication.querySelector(
      'button[type="submit"]'
    );

    const savedToken = sessionStorage.getItem("bkmi_applicant_token");

    if (!savedToken) {
      messageElement.textContent =
        "Your session has expired. Please start again.";
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    try {
      const { data, error } =
        await supabaseClient.functions.invoke(
          "submit-applicant-application",
          {
            headers: {
              Authorization: `Bearer ${savedToken}`
            },
            body: {
              course: document.getElementById("bkmiCourse").value,
              message: document.getElementById("bkmiMessage").value
            }
          }
        );

      if (error) throw error;

      if (!data || !data.success) {
        throw new Error(data?.error || "Application submission failed.");
      }

      messageElement.textContent =
        "Your application has been submitted successfully! BKMI will contact you.";

      submitButton.textContent = "Application Submitted";

      sessionStorage.removeItem("bkmi_applicant_token");
      sessionStorage.removeItem("bkmi_applicant_session_id");

    } catch (error) {
      messageElement.textContent =
        error.message || "Unable to submit your application.";

      submitButton.disabled = false;
      submitButton.textContent = "Submit Full Application";
    }
  });

  checkApplicantPayments();
}

// RESTORE APPLICANT PAYMENT PORTAL AFTER PAGE REFRESH

const savedApplicantToken = sessionStorage.getItem("bkmi_applicant_token");

if (savedApplicantToken && applicationForm) {
  showApplicantPaymentPortal(savedApplicantToken);
}

// CREATE NEW APPLICANT SESSION AND PAYMENT REQUESTS

if (applicationForm) {
  applicationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formError = document.getElementById("formError");
    const submitButton = applicationForm.querySelector('button[type="submit"]');

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

      if (!sessionData || !sessionData.success || !sessionData.applicant_token) {
        throw new Error(
          sessionData?.error || "Applicant session could not be created."
        );
      }

      const applicantToken = sessionData.applicant_token;

      sessionStorage.setItem("bkmi_applicant_token", applicantToken);
      sessionStorage.setItem(
        "bkmi_applicant_session_id",
        sessionData.applicant_session_id
      );

      const paymentTypes = ["Registration Fee", "Admission Fee"];
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
          throw new Error(data?.error || `Could not prepare ${paymentType}.`);
        }

        paymentRequests.push(data);
      }

      const account = paymentRequests[0].bank_details;

      showApplicantPaymentPortal(applicantToken);

      const resultBox = document.getElementById("bkmiPaymentInstructions");

      const accountDetails = document.createElement("p");
      accountDetails.style.whiteSpace = "pre-line";
      accountDetails.textContent =
        `Bank: ${account.bank_name}\n` +
        `Account Name: ${account.account_name}\n` +
        `Account Number: ${account.account_number}`;

      resultBox.insertBefore(
        accountDetails,
        document.getElementById("bkmiPaymentStatus")
      );

      paymentRequests.forEach((payment) => {
        const details = document.createElement("p");
        details.style.whiteSpace = "pre-line";
        details.textContent =
          `${payment.payment_type}: ₦${Number(payment.amount).toLocaleString("en-NG")}\n` +
          `Payment Reference: ${payment.reference}\n` +
          `Status: ${payment.payment_status}`;

        resultBox.insertBefore(
          details,
          document.getElementById("bkmiPaymentStatus")
        );
      });

      const whatsappButton = document.createElement("a");
      whatsappButton.href = paymentRequests[0].whatsapp_url;
      whatsappButton.target = "_blank";
      whatsappButton.rel = "noopener";
      whatsappButton.textContent = "Send Payment Details to BKMI on WhatsApp";
      whatsappButton.style.cssText =
        "display:inline-block;background:#54206f;color:white;padding:12px 18px;border-radius:8px;text-decoration:none;margin-top:12px;";

      resultBox.insertBefore(
        whatsappButton,
        document.getElementById("bkmiPaymentStatus")
      );

      resultBox.scrollIntoView({ behavior: "smooth" });

    } catch (error) {
      formError.textContent =
        error.message || "Unable to prepare your payment requests.";

    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit Application";
    }
  });
}
