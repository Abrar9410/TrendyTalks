import axios from "axios";
import { useContext, useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";


const RecentBlogs = () => {
    
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [wishList, setWishList] = useState([]);
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/blogs?limit=6`)
        .then(res => {
            setRecentBlogs(res.data);
        })
        if (user) {
            axiosSecure.get(`/wishlist/${user.email}`)
            .then(res => setWishList(res.data))
        }
        else {
            setWishList([]);
        }
    },[user])

    return (
        <div className="mb-12 w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {
                recentBlogs && recentBlogs.map(blog =>
                    <BlogCard key={blog._id} blog={blog} wishList={wishList}></BlogCard>
                )
            }
        </div>
    );
};

export default RecentBlogs;