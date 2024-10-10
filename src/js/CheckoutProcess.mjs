import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

export default class CheckoutProcess {
  constructor(key) {
    this.key = key;
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
    const subtotalElement = document.querySelector("#subtotal");
    const itemNumElement = document.querySelector("#num-items");

    itemNumElement.textContent = this.cartItems.length;

    this.subtotal = this.cartItems.reduce((total, item) => total + item.FinalPrice, 0);
    subtotalElement.textContent = `$${this.subtotal.toFixed(2)}`;

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
    document.querySelector("#shipping").textContent = `$${this.shipping.toFixed(2)}`;
    document.querySelector("#tax").textContent = `$${this.tax.toFixed(2)}`;
    document.querySelector("#order-total").textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    const orderDetails = this.prepareOrder(form);

    try {
      const response = await services.checkout(orderDetails);
      console.log("Order details being sent:", orderDetails);
      console.log("Response from server:", response);
      if (response.success) {
        console.log("Order successful", response);
        alert('Order successful');
      } else {
        console.log("Order failed:", response);
        alert('Check Console');
      }
    } catch (error) {
      console.error("An error occurred during checkout:", error);
    }
  }

  prepareOrder(form) {
    const formData = new FormData(form);
    const items = this.packageItems(this.cartItems);

    return {
      orderDate: new Date().toISOString(),
      fname: formData.get("fname"),
      lname: formData.get("lname"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip"),
      cardNumber: formData.get("cardNumber"),
      expiration: formData.get("expiration"),
      code: formData.get("code"),
      items: items,
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping.toFixed(2),
      tax: this.tax.toFixed(2),
    };
  }

  packageItems(items) {
    return items.map((item) => ({
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    }));
  }
}
