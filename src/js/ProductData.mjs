function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;  // Ensure this path is correct
  }

  // Fetch data from the JSON file
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => {
        console.log("Fetched data:", data);  // Debugging
        return data;
      });
  }

  // Find a specific product by its ID
  async findProductById(id) {
    const products = await this.getData();
    console.log("Product list:", products);  // Debugging
    return products.find((item) => item.Id === id);
  }
}