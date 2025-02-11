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
import Contact from "../pages/Contact";
import AboutDev from "../pages/AboutDev";
import TermsOfService from "../pages/TermsOfService";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import CookiePolicy from "../pages/CookiePolicy";


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
                path: "/contact",
                element: <Contact></Contact>
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
                element: <BlogDetails></BlogDetails>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/blogs/${params.id}`)
            },
            {
                path: "/update-blog/:id",
                element: <PrivateRoute><UpdateBlog></UpdateBlog></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/blogs/${params.id}`)
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/about-dev",
                element: <AboutDev></AboutDev>
            },
            {
                path: "/terms-of-service",
                element: <TermsOfService></TermsOfService>
            },
            {
                path: "/privacy-policy",
                element: <PrivacyPolicy></PrivacyPolicy>
            },
            {
                path: "/cookie-policy",
                element: <CookiePolicy></CookiePolicy>
            },
        ]
    },
])

export default Router;