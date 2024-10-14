import ExternalServices from './ExternalServices.mjs';
import ProductListing from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';
import Alert from './Alert.mjs';

const dataSource = new ExternalServices('tents');
const listElement = document.querySelector('.product-list');
const productListing = new ProductListing('tents', dataSource, listElement);

productListing.init();
loadHeaderFooter();
new Alert();
