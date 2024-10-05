import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
  }

export default class ProductDetails {
  constructor(productId, dataSource) {
      this.productId = productId;
      this.dataSource = dataSource;
      this.product = {};
  }

    async init() {
      try {
        console.log('Product ID:', this.productId);
          this.product = await this.dataSource.findProductById(this.productId);
          console.log('API Response for Product:', this.product)

            if (this.product && this.product.Name) {
              this.renderProductDetails('.product-detail');
          } else {
              console.error('Product not found or missing required data');
          }
          
      } catch (error) {
          console.error('Error fetching product details:', error);
      }

      document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.error('Could not find element with selector:', selector);
        return;
    }

    element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
  }

  addToCart() {
    let cart = getLocalStorage("so-cart");
    const productExists = cart.some((item) => item.Id === this.product.Id);

    if (productExists) {
        alert(`${this.product.Name} is already in your cart.`);
    } else {
        cart.push(this.product);
        setLocalStorage("so-cart", cart);
        alert(`${this.product.Name} has been added to your cart!`);
    }
  }
}
 