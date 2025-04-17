const productModel = require("../models/ProductModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudanryUtil");

//set storage engin
const storage = multer.diskStorage({
    // destination: "./uploads",
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});


//multer object
const upload = multer({
    storage: storage,
}).single("image");



// Add a new product
const addProduct = async (req, res) => {
    try {
        const savedProduct = await productModel.create(req.body);
        res.status(201).json({
            message: "Product added successfully",
            data: savedProduct,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// add a new product with image

const addProductWithImage = async (req, res) => {

    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        try {

            const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
            console.log(cloudinaryResponse);
            console.log(req.body);

            const product = await productModel.create({
                name: req.body.name,
                price: req.body.price,
                offerPrice: req.body.offerPrice,
                categoryId: req.body.category_id, // Corrected field name
                subCategoryId: req.body.sub_category_id, // Corrected field name
                vendorId: req.body.vendor_id, // Corrected field name
                productImageURL1: cloudinaryResponse.secure_url,
                productDetails: req.body.productDetails
            });



            return res.status(201).json({
                message: "Product added successfully",
                data: product,
            });

        } catch (uploadErr) {
            console.error("❌ Error during Cloudinary or DB save:", uploadErr);
            return res.status(500).json({ message: "Internal Server Error", error: uploadErr.message });
        }
    });
};



// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await productModel
            .find()
            .populate("categoryId")
            .populate("subCategoryId")

        res.status(200).json({
            message: "All Products",
            data: products,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id).populate("categoryId subCategoryId");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({
            message: "Product found",
            data: product,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get products by category
const getProductsByCategory = async (req, res) => {
    try {
        const products = await productModel.find({ categoryId: req.params.categoryId }).populate("categoryId");
        res.status(200).json({
            message: "Products by category",
            data: products,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get products by subcategory
const getProductsBySubCategory = async (req, res) => {
    try {
        const products = await productModel.find({ subCategoryId: req.params.subCategoryId }).populate("subCategoryId");
        res.status(200).json({
            message: "Products by subcategory",
            data: products,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Handle image upload
        if (req.file) {
            // Delete old image from Cloudinary (optional)
            if (product.productImageURL1) {
                const oldImagePublicId = product.productImageURL1.split('/').pop().split('.')[0]; // Extract public_id
                await cloudinaryUtil.deleteFileFromCloudinary(oldImagePublicId);
            }

            // Upload new image to Cloudinary
            const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
            req.body.productImageURL1 = cloudinaryResponse.secure_url; // Update image URL in product data
        } else {
            // If no new image, keep the existing one
            req.body.productImageURL1 = product.productImageURL1;
        }

        // Update the product with new data
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product 1deleted successfully",
            data: deletedProduct,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addProduct, getProducts, getProductById, getProductsByCategory, getProductsBySubCategory, updateProduct, deleteProduct, addProductWithImage };
