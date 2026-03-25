import express from "express";
import { register, verify, reVerify, login, logout, forgotPassword, verifyOtp, changePassword, allUser, getUserById} from "../controllers/userControllers.js";
import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js";

const router = express.Router();
router.post("/register", register);
// Support both GET (for link clicks) and POST (for API calls)
router.get("/verify", verify);
router.post("/verify", verify);
router.post("/reVerify", reVerify);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp/:email", verifyOtp);
router.post("/change-password/:email", changePassword);
router.get("/all-user", isAuthenticated, isAdmin, allUser);
router.get("/get-user/:userId",getUserById);

export default router;