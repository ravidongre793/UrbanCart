import Product from "../models/productModel.js";

// Add a new product (Admin only)
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields (name, description, price, category)"
            });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            image: image || "https://via.placeholder.com/300",
            category
        });

        await newProduct.save();

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct
        });
    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }); // Newest first
        return res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
