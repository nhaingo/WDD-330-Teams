import { getLocalStorage, renderListWithTemplate } from './utils.mjs';

export default class ShoppingCart {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  getCartItems() {
    return getLocalStorage(this.key);
  }

  init() {
    const cartItems = this.getCartItems();
    this.renderCart(cartItems);
  }

  renderCart(cartItems) {
    renderListWithTemplate(cartItemTemplate, this.listElement, cartItems, 'beforeend', true);
  }
}

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  
    return newItem;
  }