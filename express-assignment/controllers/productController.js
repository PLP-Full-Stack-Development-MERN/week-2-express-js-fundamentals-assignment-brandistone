let products = [];

exports.getProducts = (req, res) => {
  res.json(products);
};

exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: Date.now(), name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  let product = products.find(product => product.id == id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  product.name = name;
  product.price = price;
  res.json(product);
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  products = products.filter(product => product.id != id);
  res.status(204).send();
};
