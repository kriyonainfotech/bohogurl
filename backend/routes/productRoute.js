const {jwtAuthMiddleware}=require('../jwt')
const upload=require('./../config/multerConfig')

const express = require('express');
const {
  getAllProducts,
  getPopularity,
  getType,
  getProductById,
  searchProducts,
  addProduct,
  updateProduct,
  deleteProduct
} = require('./../controllers/productController');

const router = express.Router();

// Fetch all products
router.get('/',getAllProducts);//adding .....
router.post('/add',upload.single('image_url'),addProduct)
router.put('/edit/:id',updateProduct)
router.delete('/delete/:id',deleteProduct)

// Fetch recommended products
router.get('/popularity',getPopularity);

// Fetch best sellers
router.get('/type', getType);

// Fetch product by ID
router.get('/:id', getProductById);

// Search products
router.get('/search', async (req, res) => {
  const { q } = req.query; // Get the search query from the query string
  
  if (!q || q.trim() === '') {
    return res.status(400).json({ error: 'Search query is required.' });
  }

  try {
    const products = await searchProducts(q); // Call the searchProducts method from the controller
    if (products.length === 0) {
      return res.status(404).json({ message: `No products found for "${q}"` });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for products.' });
  }
});

module.exports = router;
