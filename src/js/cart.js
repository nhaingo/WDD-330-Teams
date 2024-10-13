import ShoppingCart from './ShoppingCart.mjs';
import { loadHeaderFooter } from './utils.mjs';

const cartListElement = document.querySelector('.product-list');
const shoppingCart = new ShoppingCart('so-cart', cartListElement);

shoppingCart.init();

loadHeaderFooter();

document.querySelector('.checkout-btn').addEventListener('click', function () {
  window.location.href = '../checkout/index.html';
});
