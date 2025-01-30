
// const Product = require('../models/productmodel'); // Ensure the path is correct
// const { Op } = require("sequelize"); // Import Sequelize operators

// // Controller to fetch all products
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.findAll();
//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Error fetching all products:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// // Controller to fetch recommendations
// exports.getPopularity = async (req, res) => {
//   try {
//     const popularity = await Product.findAll({
//       order: [["popularity", "DESC"]],
//       limit: 10,
//     });
//     res.status(200).json(popularity);
//   } catch (error) {
//     console.error("Error fetching popularity:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// // Controller to fetch products by type
// exports.getType = async (req, res) => {
//   try {
//     const { type } = req.query;
//     if (!type) {
//       return res.status(400).json({ error: "Type query parameter is required" });
//     }

//     const products = await Product.findAll({
//       where: { type },
//     });

//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Error fetching type:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// // Controller to fetch product by ID
// exports.getProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByPk(id);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.status(200).json(product);
//   } catch (error) {
//     console.error("Error fetching product by ID:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// // Controller to search for products
// exports.searchProducts = async (req, res) => {
//   try {
//     const { q } = req.query;
//     if (!q) {
//       return res.status(400).json({ error: "Search query is required" });
//     }

//     const products = await Product.findAll({
//       where: {
//         name: {
//           [Op.like]: `%${q}%`,
//         },
//       },
//     });

//     if (products.length === 0) {
//       return res.status(404).json({ message: "No products found matching your search" });
//     }

//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Error searching products:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

const Product = require('../models/productmodel'); // Ensure the path is correct
const { Op } = require("sequelize"); // Import Sequelize operators

// Controller to fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching all products:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Controller to fetch recommendations (top 10 products by popularity)
exports.getPopularity = async (req, res) => {
  try {
    const popularity = await Product.findAll({
      order: [["popularity", "DESC"]],
      limit: 10,
    });
    res.status(200).json(popularity);
  } catch (error) {
    console.error("Error fetching popularity:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Controller to fetch products by type
exports.getType = async (req, res) => {
  try {
    const { type } = req.query;
    if (!type) {
      return res.status(400).json({ error: "Type query parameter is required" });
    }

    const products = await Product.findAll({
      where: { type },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by type:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Controller to fetch product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Controller to search for products by name
exports.searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${q}%`,
        },
      },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found matching your search" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching products:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Controller to add a new product
exports.addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const { name, price, description, type } = req.body;
    const imageUrl = req.file.path;  // req.file should have the image path

    const newProduct = await Product.create({
      name,
      price,
      description,
      type,
      image_url: imageUrl,  // Store the image URL in your DB
    });

    res.status(201).json(newProduct);  // Send the created product back as response
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product" });
  }

};

// Controller to update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, type, image_url } = req.body;
    console.log("Received PUT request for ID:", req.params.id);
console.log("Request body:", req.body);


    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.type = type || product.type;
    product.image_url = image_url || product.image_url;

    await product.save();

    res.status(200).json(product); // Return the updated product
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.destroy(); // Delete the product
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ error: error.message });
  }
};
