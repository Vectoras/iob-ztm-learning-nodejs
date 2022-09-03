const products = [
  {
    id: 'redshoe',
    description: 'Red Shoe',
    price: 42.12,
    reviews: [],
  },
  {
    id: 'bluejean',
    description: 'Blue Jeans',
    price: 55.55,
    reviews: [],
  },
  {
    id: 'yellowjacket',
    description: 'Yellow Jacket',
    price: 38.0,
    reviews: [],
  },
  {
    id: 'greenscarf',
    description: 'Green Scarf',
    price: 8.99,
    reviews: [],
  },
];

// public model functions

function getAllProducts() {
  return products;
}

function getProductsByPrice(min, max) {
  return products.filter((product) => {
    return product.price >= min && product.price <= max;
  });
}

function getProductById(id) {
  return products.find((product) => {
    return product.id === id;
  });
}

function addNewProduct(id, description, price) {
  const newProduct = {
    id,
    description,
    price,
    reviews: [],
  };

  products.push(newProduct);

  return newProduct;
}

function addNewProductReview(productId, rating, comment) {
  const matchedProduct = getProductById(productId);

  if (matchedProduct) {
    const newProductReview = {
      id: Date.now(),
      rating,
      comment,
    };

    matchedProduct.reviews.push(newProductReview);

    return newProductReview;
  }

  // return null;    the trainer in the video has not added this
}

// exporting

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductById,
  addNewProduct,
  addNewProductReview,
};
