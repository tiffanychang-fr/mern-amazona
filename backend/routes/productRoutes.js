import express from "express";
import Product from "../models/productModel.js";

const productRouter = express.Router();

// GET localhost:5000/api/products
productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// GET localhost:5000/api/products/slug/:slug
productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

// GET localhost:5000/api/products/:id
productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

export default productRouter;
