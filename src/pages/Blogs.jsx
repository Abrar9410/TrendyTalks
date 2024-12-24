import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";


const Blogs = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/blogs`)
            .then(res => {
                setBlogs(res.data);
            })
    }, [])

    return (
        <>
            <Header
            title="All Blogs"
            subtitle="Here you will find all the Blogs that have been posted until now.">
            </Header>
            <div className="mb-12 w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                {
                    blogs && blogs.map(blog =>
                        <BlogCard key={blog._id} blog={blog}></BlogCard>
                    )
                }
            </div>
        </>
    );
};

export default Blogs;