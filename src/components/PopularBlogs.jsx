import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Loading from "./Loading";

const PopularBlogs = ({wishList}) => {

    const [popularBlogs, setPopularBlogs] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/popular-blogs?limit=3`)
            .then(res => {
                setPopularBlogs(res.data);
                setDataLoading(false);
            })
    }, [])

    if (dataLoading) {
        return <Loading></Loading>
    }

    return (
        <>
            <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3 text-center px-2 mb-6 lg:mb-8">
                <h2 className="text-cyan-500 text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
                    Popular Blogs
                </h2>
                <p className="w-11/12 sm:w-9/12 md:w-7/12 lg:w-1/2 text-sm sm:text-base text-orange-400 font-semibold">
                    Check out the most Liked blogs. See what people are loving!
                </p>
            </div>
            <div className="mb-12 w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                {
                    popularBlogs && popularBlogs.map((blog, idx) =>
                        <BlogCard key={idx} blog={blog} wishList={wishList}></BlogCard>
                    )
                }
            </div>
        </>
    );
};

export default PopularBlogs;