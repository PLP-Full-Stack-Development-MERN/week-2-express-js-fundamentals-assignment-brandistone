### Project Structure

express-assignment/
│-- routes/
│    ├── userRoutes.js
│    ├── productRoutes.js
│-- middleware/
│    ├── logger.js
│-- controllers/
│    ├── userController.js
│    ├── productController.js
│-- index.js
│-- package.json
│-- README.md
│-- .env
```

---

### 1. **`index.js`**

This file sets up the Express server, imports middleware, routes, and starts the server.

```javascript
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const logger = require('./middleware/logger');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log request details
app.use(logger);

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

---

### 2. **`middleware/logger.js`**

Custom middleware to log request details.

```javascript
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

module.exports = logger;
```

---

### 3. **`controllers/userController.js`**

Controller for handling user-related operations.

```javascript
let users = [];

exports.getUsers = (req, res) => {
  res.json(users);
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: Date.now(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  let user = users.find(user => user.id == id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = name;
  user.email = email;
  res.json(user);
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  users = users.filter(user => user.id != id);
  res.status(204).send();
};
```

---

### 4. **`controllers/productController.js`**

Controller for handling product-related operations.

```javascript
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
```

---

### 5. **`routes/userRoutes.js`**

User routes to handle user-related requests.

```javascript
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
```

---

### 6. **`routes/productRoutes.js`**

Product routes to handle product-related requests.

```javascript
const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
```

---

### 7. **`.env`**

Store environment variables here, like the server port.

```env
PORT=3000
```

---

### 8. **`README.md`**

Basic project setup and API documentation.

```markdown
# Express.js Assignment

## Setup Instructions

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with the following content:
   ```
   PORT=3000
   ```
4. Run the server:
   ```
   node index.js
   ```

## API Endpoints

### Users
- `GET /api/users`: Get all users.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:id`: Update user by ID.
- `DELETE /api/users/:id`: Delete user by ID.

### Products
- `GET /api/products`: Get all products.
- `POST /api/products`: Create a new product.
- `PUT /api/products/:id`: Update product by ID.
- `DELETE /api/products/:id`: Delete product by ID.
```

---

### 9. **Testing**

Once your server is running, you can test the API using Postman or cURL. For example, to test the `GET /api/users` route:

```bash
curl http://localhost:3000/api/users
```

