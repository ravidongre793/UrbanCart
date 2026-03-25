import express from "express";
import { addProduct, getAllProducts } from "../controllers/productControllers.js";
import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js";

const router = express.Router();

// GET all products (Accessible to anyone)
router.get("/all", getAllProducts);

// POST add a product (Protected: logged in + admin role)
router.post("/add", isAuthenticated, isAdmin, addProduct);

export default router;
