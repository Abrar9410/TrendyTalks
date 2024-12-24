import { CiHeart } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";


const BlogCard = ({blog, wishList}) => {

    const {_id, thumbnail, category, title, description, userEmail, userName, time, comments} = blog;
    const {user} = useContext(AuthContext);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!user) {
            return setDisabled(false);
        }
        if (user?.email===userEmail) {
            setDisabled(true);
        }
        else {
            const alreadyAdded = wishList?.find(item => item.blog._id === _id);
            if (alreadyAdded) {
                setDisabled(true);
            }
            else {
                setDisabled(false);
            }
        }
    }, [user, wishList])

    const handleAddToWishList = id => {
        if (!user) {
            navigate("/login");
        }
        const wishedBlog = {
            blog,
            addedBy: user.email
        }
        axiosSecure.post('/wishlist', wishedBlog)
        .then(res => {
            if (res.data.insertedId) {
                toast.success('Blog added to your WishList!', {
                    position: "top-center",
                    autoClose: 1500
                })
                setDisabled(true);
            }
        })
        .catch(error => {
            toast.error(error.message, {
                position: "top-center",
                autoClose: 1500
            })
        })
    }

    return (
        <div className="border border-blue-700 rounded-sm shadow-xl">
            <figure className="rounded-t-sm">
                <img src={thumbnail} alt="Blog_Thumbnail" className="w-full sm:h-[40vw] lg:h-[25vw] xl:h-[20vw] rounded-t-sm"/>
            </figure>
            <div className="py-4 px-2">
                <p className="font-semibold text-lg w-max border-b-2 border-red-600 pb-[1px]">{category}</p>
                <h3 className="font-bold text-lg min-[300px]:text-xl sm:text-2xl xl:text-3xl mt-4">{title}</h3>
                <p className="my-6">{description.slice(0, 300)}...</p>
                <div className="flex justify-between items-center">
                    <Link to={`/blogs/${_id}`} className="w-max px-2 py-1 sm:px-3 sm:py-2 border max-sm:text-sm shadow-md hover:scale-105">
                        Read More
                    </Link>
                    <button onClick={()=>handleAddToWishList(_id)}
                            disabled={disabled}
                            className="btn btn-circle border border-fullBg outline-none btn-xs sm:btn-sm xl:btn-md bg-white sm:text-xl lg:text-2xl shadow-md hover:scale-105 disabled:cursor-not-allowed">
                        <CiHeart />
                    </button>
                </div>
                <div className="text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center mt-6">
                    <p>
                        <span>by </span>
                        <span className="font-bold">{userName}</span>
                    </p>
                    <span>-</span>
                    <span>{time.slice(0, (time.length - 7))}</span>
                    <span>-</span>
                    <p>
                        <span>{comments===0?"No":comments}</span>
                        <span>{comments>1?" Comments":" Comment"}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;