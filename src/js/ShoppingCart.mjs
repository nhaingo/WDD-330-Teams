import { getLocalStorage, setLocalStorage, } from './utils.mjs';

export default class ShoppingCart {
  constructor(storageKey, listElement) {
    this.storageKey = storageKey;
    this.listElement = listElement;
    this.cartTotalTop = document.querySelector('.cart-total-top');
    this.cartFooter = document.querySelector('.cart-footer');
    this.cartCheckoutBtn = document.querySelector('.cart-checkout');
  }

  init() {
    this.renderCartContents();
  }

  getCartItems() {
    return getLocalStorage(this.storageKey) || [];
  }

  renderCartContents() {
    const cartItems = this.getCartItems();
    const htmlItems = cartItems.map((item) => this.cartItemTemplate(item));
    this.listElement.innerHTML = htmlItems.join('');

    this.listElement.querySelectorAll('.remove-item').forEach((button) => {
      button.addEventListener('click', (event) => this.removeCartItem(event));
    });

    this.updateCartFooter();
    this.updateCheckoutButton();
  }

  cartItemTemplate(item) {
    return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class='remove-item' data-id='${item.Id}'>X</button>
  </li>`;
  }

  removeCartItem(event) {
    const itemId = event.target.getAttribute('data-id');
    let cartItems = this.getCartItems();

    cartItems = cartItems.filter((item) => item.Id !== itemId);

    setLocalStorage(this.storageKey, cartItems);
    this.renderCartContents();
  }

  updateCartFooter() {
    const cartItems = this.getCartItems();
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    if (cartItems.length > 0) {
      this.cartTotalTop.classList.add('show');
      this.cartTotalTop.textContent = `Total: $${total.toFixed(2)}`;

      this.cartFooter.classList.add('show');
      this.cartFooter.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
    } else {
      this.cartTotalTop.classList.remove('show');
      this.cartFooter.classList.remove('show');
    }
  }

  updateCheckoutButton() {
    const cartItems = this.getCartItems();
    
    if (cartItems.length > 0) {
      this.cartCheckoutBtn.classList.remove('hide');
    } else {
      this.cartCheckoutBtn.classList.add('hide');
    }
  }
}