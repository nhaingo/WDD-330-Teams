import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

const category = getParam('category');
if (category) {
  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);
  document.title = `Top Products: ${capitalizedCategory}`;
  document.querySelector('#category-title').textContent =
    `Top Products: ${capitalizedCategory}`;
}
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const productListing = new ProductListing(category, dataSource, listElement);

productListing.init();
loadHeaderFooter();
