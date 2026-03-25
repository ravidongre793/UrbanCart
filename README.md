# 🛍️ EKart E-Commerce Platform

A modern, full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js) featuring a sleek, responsive UI, secure authentication, and a robust admin dashboard.

## 🚀 Key Features

### 👤 User Authentication & Security
- **JWT-based Authentication**: Secure login and session management using HTTP headers and `localStorage`.
- **OTP Email Verification**: Users must verify their email addresses during signup before accessing the platform.
- **Password Security**: Passwords are securely hashed using `bcrypt`.
- **Profile Management**: Users can securely change their passwords from their personalized dashboard.

### 💳 Shopping Experience
- **Dynamic Product Catalog**: View products in a responsive grid layout with high-quality hover animations and category tags.
- **Real-Time Shopping Cart**: Add products to cart instantly. The cart badge in the navigation bar updates in real-time across components without requiring a page refresh.
- **Cart Management**: View added items, see subtotal/total calculations, remove items, and experience a simulated checkout process.

### 🛡️ Admin Capabilities
- **Role-Based Access Control**: Distinguishes between standard users (`role: "user"`) and administrators (`role: "admin"`).
- **Product Management**: Admins have exclusive access to a secure "Add Product" dashboard to seamlessly upload new products to the catalog.

### ✨ Beautiful UI/UX
- **Glassmorphism Navbar**: A modern, sticky navigation bar with a frosted glass effect that adapts dynamically to mobile and desktop screens.
- **Responsive Animations**: Subtle micro-interactions, smooth hover scaling, and clean layouts built with **Tailwind CSS**.
- **Toast Notifications**: Interactive success/error feedback loops handled beautifully via `sonner`.

---

## 🛠️ Technology Stack

### Frontend (Client)
- **Framework**: React.js (via Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM (`createBrowserRouter`)
- **Icons**: Lucide React
- **Components**: shadcn/ui (Cards, Inputs, Labels, Buttons)
- **HTTP Client**: Axios

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: `jsonwebtoken` (JWT) & `bcrypt`
- **Mail/OTP**: `nodemailer`
- **Middleware**: Custom authentication and role-checking middleware (`isAuthenticated`, `isAdmin`)

---

## ⚙️ Local Development Setup

### Prerequisites
Make sure you have Node.js and MongoDB installed on your local machine.

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd EKART-RD
```

### 2. Backend Setup
Navigate into the backend directory and install dependencies:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory with the following variables:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_password
```
Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```
Start the Vite development server:
```bash
npm run dev
```

### 4. Access the App
The frontend will be running at `http://localhost:5173` and the backend strictly operates on `http://localhost:8000`. 

*(Note: To test the "Add Product" functionality, log into MongoDB Compass, find your user document, and manually change your `role` field from `"user"` to `"admin"`. Log out and log back in to see the changes).*

---

## 📈 Future Enhancements
- Global State Management (Redux Toolkit or React Context API)
- Real Payment Gateway Integration (Stripe/Razorpay)
- Cloudinary Integration for live product image uploads rather than URL links
- Advanced Product Filtering and Sorting
