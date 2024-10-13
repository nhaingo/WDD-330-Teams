import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(form) {
  const formData = new FormData(form),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelectors) {
    this.key = key;
    this.outputSelectors = outputSelectors;
    this.cartItems = [];
    this.subtotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.cartItems = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const subtotalElement = document.querySelector(this.outputSelectors.subtotal);
    const itemNumElement = document.querySelector("#num-items");

    itemNumElement.innerText = this.cartItems.length;

    this.subtotal = this.cartItems.reduce((total, item) => total + item.FinalPrice, 0);
    subtotalElement.innerText = `$${this.subtotal.toFixed(2)}`;

    this.calculateOrderTotal();
  }

  calculateOrderTotal() {
    const itemCount = this.cartItems.length;
    this.shipping = itemCount > 1 ? 10 + (itemCount - 1) * 2 : 10;
    this.tax = this.subtotal * 0.06;

    this.orderTotal = this.subtotal + this.shipping + this.tax;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(this.outputSelectors.shipping).textContent = `$${this.shipping.toFixed(2)}`;
    document.querySelector(this.outputSelectors.tax).textContent = `$${this.tax.toFixed(2)}`;
    document.querySelector("#order-total").textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout() {
    const form = document.forms["checkout-form"];

    const json = formDataToJSON(form);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.cartItems);
    console.log(json);
    try {
      const res = await services.checkout(json);
      console.log(res);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }

      console.log(err);
    }
  }

}
