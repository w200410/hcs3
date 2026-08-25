const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");

function closeMenu() {
  if (!mainNav || !menuButton) return;
  mainNav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "開啟導覽選單");
}

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "關閉導覽選單" : "開啟導覽選單");
  });

  mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const submitButton = contactForm?.querySelector('button[type="submit"]');
const submitButtonLabel = submitButton?.innerHTML;

function setFormStatus(message, type = "") {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`.trim();
}

if (contactForm && formStatus && submitButton) {
  contactForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => field.removeAttribute("aria-invalid"));
    field.addEventListener("change", () => field.removeAttribute("aria-invalid"));
  });

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setFormStatus("");

    if (!contactForm.checkValidity()) {
      const firstInvalidField = contactForm.querySelector(":invalid");
      firstInvalidField?.setAttribute("aria-invalid", "true");
      firstInvalidField?.focus();
      setFormStatus("請確認姓名、公司名稱、Email 與希望討論的問題是否填寫完整。", "error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "資料傳送中…";
    setFormStatus("正在傳送您的需求，請稍候。");

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Form submission failed");

      contactForm.reset();
      setFormStatus("感謝您的來訊，我們已收到需求，將依您提供的方便時間儘快聯絡。", "success");
    } catch (error) {
      setFormStatus("目前無法送出表單，請稍後再試，或直接來電 07-223-8769。", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = submitButtonLabel;
    }
  });
}
