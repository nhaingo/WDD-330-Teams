import { getLocalStorage, setLocalStorage } from "./utils.mjs";


const generateModal = () => `
  <dialog class="signUpLetter">
    <h1>20% off!</h1>
    <p>Create an account and get a chance to get 20% off in your next purchase.</p>
      <div class="news_actions">
        <a href="/signup.html" class="signUpButton button">Register now!</a>
        <a class="maybeLatterButton button">Maybe latter</a>
      </div>
  </dialog>
`;

export default class NewsLetterSignUp {
  constructor() {
    this.showDialog = true;
    this.dialogElement = null;
  }
  init() {
    this.checkLocalStorage();
    this.insertModal();
    this.dialogElement = document.querySelector(".signUpLetter");
    this.renderModal();
  }
  checkLocalStorage() {
    const isNewVisitor = getLocalStorage("isNewVisitor");
    if (isNewVisitor === null || isNewVisitor === "true") {
      this.showDialog = true;
    } else {
      this.showDialog = false;
    }
  }

  insertModal() {
    if (this.showDialog) {
      const modal = generateModal();
      document.querySelector("body").insertAdjacentHTML("afterbegin", modal);
    }
  }

  renderModal() {
    if (this.showDialog) {
      this.dialogElement.showModal();
      this.maybeLeterListener();
      this.signUpListerner();
    }
  }

  signUpListerner() {
    document.querySelector(".signUpButton").addEventListener("click", (e) => {
      e.preventDefault();
      alert.init();
      this.dialogElement.close();
      setLocalStorage("isNewVisitor", false);
      window.location.href = "/signup.html";
    });
  }

  maybeLeterListener() {
    document
      .querySelector(".maybeLatterButton")
      .addEventListener("click", (e) => {
        e.preventDefault();
        this.dialogElement.close();
        alert.init();
        alert.renderAlert(
          "NEWSLETTER:",
          "SIGN UP NOW and get 20% off on your next purchase!",
          "warning",
        );
        setLocalStorage("isNewVisitor", false);
      });
  }