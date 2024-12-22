import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import Blogs from "../pages/Blogs";
import FeaturedBlogs from "../pages/FeaturedBlogs";
import AddBlog from "../pages/AddBlog";
import WishList from "../pages/WishList";
import BlogDetails from "../pages/BlogDetails";
import UpdateBlog from "../pages/UpdateBlog";
import PrivateRoute from "./PrivateRoute";


const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <HomePage></HomePage>
            },
            {
                path: "/blogs",
                element: <Blogs></Blogs>
            },
            {
                path: "/featured",
                element: <FeaturedBlogs></FeaturedBlogs>
            },
            {
                path: "/add-blog",
                element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>
            },
            {
                path: "/wishlist",
                element: <PrivateRoute><WishList></WishList></PrivateRoute>
            },
            {
                path: "/blogs/:id",
                element: <BlogDetails></BlogDetails>
            },
            {
                path: "/update-blog",
                element: <PrivateRoute><UpdateBlog></UpdateBlog></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
        ]
    },
])

export default Router;