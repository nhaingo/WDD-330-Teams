import { setLocalStorage, getLocalStorage } from "./utils.mjs";
 
export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
      }    
 
      async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        console.log("Fetched product details:", this.product);
        this.renderProductDetails();
        const addToCartButton = document.getElementById('addToCart');
        if (addToCartButton) {
          addToCartButton.addEventListener('click', this.addToCart.bind(this));
        } else {
          console.error("Add to Cart button not found!");
        }
      }
 
      renderProductDetails() {
        const productContainer = document.getElementById('dynamic-product-details');
    
        if (this.product) {
          productContainer.innerHTML = `<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
          <h2 class="divider">${this.product.NameWithoutBrand}</h2>
          <img
            class="divider"
            src="${this.product.Image}"
            alt="${this.product.NameWithoutBrand}"
          />
          <p class="product-card__price">$${this.product.FinalPrice}</p>
          <p class="product__color">${this.product.Colors[0].ColorName}</p>
          <p class="product__description">
          ${this.product.DescriptionHtmlSimple}
          </p>
          <div class="product-detail__add">
            <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
          </div></section>`;
        } else {
          productContainer.innerHTML = '<p>Product not found</p>';
        }
      }

      addToCart() {
        let cart = getLocalStorage("shoppingCart");
        const productExists = cart.some((item) => item.Id === this.product.Id);
    
        if (productExists) {
            alert(`${this.product.Name} is already in your cart.`);
        } else {
            cart.push(this.product);
            setLocalStorage("shoppingCart", cart);
            alert(`${this.product.Name} has been added to your cart!`);
        }
      }
}
 