import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  let jsonResult = {};
  formData.forEach((value, key) => (jsonResult[key] = value));
  return jsonResult;
}

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const baseUrl = "http://server-nodejs.cit.byui.edu:3000/";
  let payload = formDataToJSON(e.target);

  try {
    const response = await fetch(`${baseUrl}users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      // Redirect to cart page upon successful signup
      window.location.href = "/cart.html";
    } else {
      throw new Error("Failed to create user");
    }
  } catch (error) {
    alert("Failed to create user. Please try again.");
  }
});