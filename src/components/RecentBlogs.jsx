import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";


const RecentBlogs = () => {
    
    const [recentBlogs, setRecentBlogs] = useState([]);
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/blogs?limit=6`)
        .then(res => {
            setRecentBlogs(res.data);
        })
    },[])

    return (
        <div className="mb-12 w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {
                recentBlogs && recentBlogs.map(blog =>
                    <BlogCard key={blog._id} blog={blog}></BlogCard>
                )
            }
        </div>
    );
};

export default RecentBlogs;