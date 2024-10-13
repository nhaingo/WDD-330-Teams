import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

const checkoutForm = document.getElementById('checkout-form');
const checkout = new CheckoutProcess('so-cart', {
  subtotal: '#subtotal',
  shipping: '#shipping',
  tax: '#tax',
  total: '#order-total',
});

checkout.init();

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  checkout.checkout(checkoutForm);
});

loadHeaderFooter();
