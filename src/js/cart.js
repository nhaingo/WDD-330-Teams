import ShoppingCart from './ShoppingCart.mjs';
import { loadHeaderFooter } from './utils.mjs';

const cartListElement = document.querySelector('.product-list');
const shoppingCart = new ShoppingCart('so-cart', cartListElement);

shoppingCart.init();

loadHeaderFooter();
