const express = require("express");
const app = express();
const productsRouter = require("./products/products.router");
const categoriesRouter = require("./categories/categories.router");
const suppliersRouter = require("./suppliers/suppliers.router");
const restaurantsRouter = require("./restaurants/restaurants.router");

const commentsRouter = require("./comments/comments.router");
const postsRouter = require("./posts/posts.router");
const usersRouter = require("./users/users.router");

app.use(express.json());

app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/suppliers", suppliersRouter);
app.use("/restaurants", restaurantsRouter);

app.use("/comments", commentsRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

// Not found handler
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
