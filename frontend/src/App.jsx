import React from 'react'
import { Button } from './components/ui/button'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/ui/Navbar'
import Home from '../pages/Home'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
import Verify from '../pages/Verify'
import VerifyEmail from '../pages/verifyEmail'
import Footer from './components/ui/Footer'
import Profile from '../pages/Profile'
import Products from '../pages/Products'
import AddProduct from './components/admin/AddProduct'
import Cart from '../pages/Cart'

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /><Home /><Footer /></>,
  },
  {
    path: "/cart",
    element: <><Navbar /><Cart /><Footer /></>,
  },
  {
    path: "/profile",
    element: <><Navbar /><Profile /><Footer /></>,
  },
  {
    path: "/products",
    element: <><Navbar /><Products /><Footer /></>,
  },
  {
    path: "/admin/add-product",
    element: <><Navbar /><AddProduct /><Footer /></>,
  },
  {
    path: "/signup",
    element: <><SignUp /></>,
  },
  {
    path: "/login",
    element: <><Login /></>,
  },
  {
    path: "/verify",
    element: <><Verify /></>,
  },
  {
    path: "/verify/:token",
    element: <><VerifyEmail /></>,
  },
])


function App() {
  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
