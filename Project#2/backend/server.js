const express = require("express");
const cors = require("cors");
const path = require("path");
const products = require("./products");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/imgs", express.static(path.join(__dirname, "..", "imgs")));

const PORT = 3000;

app.get("/api/products", (req, res) => {
  res.json(products);
});
app.post("/api/products", (req, res) => {
    console.log("POST request received");
    console.log(req.body);

    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const description = req.body.description;
    const image = req.body.image;

    if (!name || !price || !category || !description || !image) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (price <= 0) {
        return res.status(400).json({
            message: "Price must be greater than 0"
        });
    }

    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price,
        category: category,
        description: description,
        image: image
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});
app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex(function(product) {
    return product.id === id;
  });

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  const deletedProduct = products.splice(index, 1);

  res.json({
    message: "Product deleted",
    product: deletedProduct[0]
  });
});
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
