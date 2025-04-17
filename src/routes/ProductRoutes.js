const routes = require("express").Router();
const productController = require("../controllers/ProductController");
const upload = require("../middlewares/multerConfig"); // Import the multer configuration

routes.post("/add", productController.addProduct);
routes.get("/getAllProducts", productController.getProducts);
routes.get("/getProductById/:id", productController.getProductById);
routes.get('/products/:id', productController.getProductById);
routes.get("/getproductbycategory/:categoryId", productController.getProductsByCategory);
routes.get("/getproductbysubcategory/:subCategoryId", productController.getProductsBySubCategory);
routes.post("/addwithimage", productController.addProductWithImage);
routes.put("/updateProduct/:id", upload.single("image"), productController.updateProduct);
routes.delete("/deleteProduct/:productId", productController.deleteProduct);

module.exports = routes;
