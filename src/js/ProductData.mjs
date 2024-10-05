const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }

  // Fetch data from the JSON file
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // Find a specific product by its ID
  async findProductById(id) {
    try {
        console.log('Fetching product with ID:', id);
        const response = await fetch(baseURL + `product/${id}`);
        const data = await convertToJson(response);

        // Log the full response to check if the structure is what you expect
        console.log('API Full Response:', data);

        // Check if data.Result contains the product
        return data.Result;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
    }
  }
}