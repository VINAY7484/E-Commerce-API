# Multi-Tenant E-Commerce API

A Node.js-based multi-tenant e-commerce API that allows vendors to manage their products and orders.

## Features

- Vendor authentication (register/login)
- Product management (CRUD operations)
- Order management
- JWT-based authentication
- Rate limiting
- Input validation
- Pagination
- MongoDB optimization with indexes

## Prerequisites

- Node.js (v14 or higher)
- MongoDB

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/multi-tenant-ecommerce
   JWT_SECRET=your_jwt_secret_key_here
   PORT=3000
   ```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/vendors/register` - Register a new vendor
- `POST /api/vendors/login` - Vendor login

### Products
- `POST /api/products` - Create a new product
- `GET /api/products` - List vendor's products (with pagination)
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Orders
- `GET /api/orders` - List orders for vendor's products
- `PUT /api/orders/:id` - Update order status

## Security Features

- Password hashing using bcrypt
- JWT authentication
- Rate limiting
- Input validation
- MongoDB indexes for optimization

## Project Structure

```
src/
├── config/
│   └── database.js
├── controllers/
│   ├── vendor.controller.js
│   ├── product.controller.js
│   └── order.controller.js
├── middleware/
│   ├── auth.middleware.js
│   └── validate.middleware.js
├── models/
│   ├── vendor.model.js
│   ├── product.model.js
│   └── order.model.js
├── routes/
│   ├── vendor.routes.js
│   ├── product.routes.js
│   └── order.routes.js
└── server.js
```

## Testing

Run tests using:
```bash
npm test
```

## API Documentation

### Vendor Registration
```bash
curl -X POST http://localhost:3000/api/vendors/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Vendor", "email": "vendor@test.com", "password": "password123"}'
```

### Vendor Login
```bash
curl -X POST http://localhost:3000/api/vendors/login \
  -H "Content-Type: application/json" \
  -d '{"email": "vendor@test.com", "password": "password123"}'
```

### Create Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name": "Test Product", "price": 99.99, "stock": 100}'
```

### Get Products
```bash
curl -X GET http://localhost:3000/api/products?page=1&limit=10 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Product
```bash
curl -X PUT http://localhost:3000/api/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name": "Updated Product", "price": 149.99, "stock": 200}'
```

### Delete Product
```bash
curl -X DELETE http://localhost:3000/api/products/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Orders
```bash
curl -X GET http://localhost:3000/api/orders?page=1&limit=10 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Order Status
```bash
curl -X PUT http://localhost:3000/api/orders/ORDER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```