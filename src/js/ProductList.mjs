import { renderListWithTemplate } from './utils.mjs';

export default class ProductListing {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }

    filterProducts(productList) {
        return productList.slice(0, 4);
      }
  
    async init() {
      const productList = await this.dataSource.getData(this.category);
      const filteredList = this.filterProducts(productList);
      console.log('Product List:', productList);
      this.renderList(filteredList);
    }
  
    renderList(productList) {
        console.log(productList);
        this.listElement.innerHTML = productList.map((product) => productCardTemplate(product)).join('');
    }
  }

  function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
  }