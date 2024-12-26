import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";


const Blogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [wishList, setWishList] = useState([]);
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/blogs?filter=${filter}&search=${search}`)
        .then(res => {
            setBlogs(res.data);
            if (user) {
                axiosSecure.get(`/wishlist/?email=${user.email}`)
                    .then(res => {
                        setWishList(res.data);
                        setDataLoading(false);
                    })
            }
            else {
                setWishList([]);
                setDataLoading(false);
            }
        })   
    }, [user, filter, search])

    if (dataLoading) {
        return <Loading></Loading>
    }

    return (
        <>
            <Header
            title="All Blogs"
            subtitle="Here you will find all the Blogs that have been posted until now.">
            </Header>
            <div className="w-11/12 mx-auto mb-12 flex flex-col-reverse sm:flex-row sm:justify-center sm:items-center gap-4">
                <select onChange={e=>setFilter(e.target.value)} name="category" className="w-max max-[250px]:h-8 h-12 rounded-lg px-1 sm:px-2 md:px-4 border border-orange-500 focus:border-cyan-500 focus:outline-orange-500 cursor-pointer max-[215px]:text-xs max-[450px]:text-sm">
                    <option value="">Filter by Category</option>
                    <option value="Book and Writing">Book and Writing</option>
                    <option value="Business">Business</option>
                    <option value="Fashion and Beauty">Fashion and Beauty</option>
                    <option value="Food">Food</option>
                    <option value="Health and Fitness">Health and Fitness</option>
                    <option value="Inspiration">Inspiration</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Music">Music</option>
                    <option value="Personal">Personal</option>
                    <option value="Photography">Photography</option>
                    <option value="Sports">Sports</option>
                    <option value="Travel">Travel</option>
                </select>
                <input onChange={e=>setSearch(e.target.value)} type="text" placeholder="Search by Title" className="w-full md:w-1/3 input input-bordered border-orange-500 focus:outline-cyan-500 focus-within:border-cyan-500"/>
            </div>
            <div className="mb-12 w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                {
                    blogs && blogs.map(blog =>
                        <BlogCard key={blog._id} blog={blog} wishList={wishList}></BlogCard>
                    )
                }
            </div>
        </>
    );
};

export default Blogs;