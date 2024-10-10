const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }

  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    try {
        console.log('Fetching product with ID:', id);
        const response = await fetch(baseURL + `product/${id}`);
        const data = await convertToJson(response);

        console.log('API Full Response:', data);

        return data.Result;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
    }
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(baseURL + "checkout/", options);

    return await convertToJson(response);
  }
}