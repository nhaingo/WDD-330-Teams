import {
  setLocalStorage,
  getLocalStorage,
  loadHeaderFooter,
} from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

const cartListElement = document.querySelector('.product-list');
const shoppingCart = new ShoppingCart('so-cart', cartListElement);

shoppingCart.init();
loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  document.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', removeCartItem);
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href="#" class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
  <button class='remove-item' data-id='${item.Id}'>X</button>
</li>`;

  return newItem;
}

function removeCartItem(event) {
  const itemId = event.target.getAttribute('data-id');
  let cartItems = getLocalStorage('so-cart');

  cartItems = cartItems.filter((item) => item.Id !== itemId);

  setLocalStorage('so-cart', cartItems);
  renderCartContents();
}
renderCartContents();
