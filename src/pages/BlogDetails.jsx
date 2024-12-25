import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import moment from "moment";
import Loading from "../components/Loading";


const BlogDetails = () => {

    const blog = useLoaderData();
    const { _id, thumbnail, category, title, description, userName, userPhoto, userEmail, time, comments } = blog;
    const [commentsCount, setCommentsCount] = useState(comments);
    const [allComments, setAllComments] = useState([]);
    const { user, loading } = useContext(AuthContext);
    const [dataLoading, setDataLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllComments();
    }, [])

    const fetchAllComments = () => {
        setDataLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/comments/${_id}`)
            .then(res => {
                setAllComments(res.data);
                setCommentsCount(res.data.length);
                setDataLoading(false);
            })
    }

    const handleAddComment = e => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment.value;
        if (comment==="") {
            return;
        }
        const newComment = {
            comment,
            time: moment().format('lll'),
            blogId: _id,
            commenterName: user.displayName,
            commenterEmail: user.email,
            commenterPhoto: user.photoURL
        };
        axiosSecure.post('/comments', newComment)
            .then(res => {
                if (res.data.insertedId) {
                    fetchAllComments();
                    form.reset();
                }
            })
    }

    if (loading || dataLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="mb-12">
            <figure className="w-11/12 mx-auto">
                <img src={thumbnail} alt="blog_coverIMG" className="w-full max-h-[90vh]"/>
            </figure>
            <div className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-4 px-2 flex flex-col items-center">
                <p className="font-semibold text-lg w-max border-b-2 border-red-600 pb-[1px]">{category}</p>
                <h3 className="max-w-[95%] font-bold text-center text-lg min-[300px]:text-xl sm:text-2xl xl:text-3xl mt-4">{title}</h3>
                <p className="my-6">{description}</p>
                <div className="w-full text-xs sm:text-sm flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mt-6">
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                        <span>by </span>
                        <div className="flex items-center gap-1">
                            <div className="w-8 h-8 rounded-full border"><img className="w-full h-full rounded-full" src={userPhoto} alt="user_IMG" /></div>
                            <span className="font-bold text-lg">{userName}</span>
                        </div>
                    </div>
                    <span>-</span>
                    <span>{time.slice(0, (time.length - 7))}</span>
                    <span>-</span>
                    <p>
                        <span>{commentsCount === 0 ? "No" : commentsCount}</span>
                        <span>{commentsCount > 1 ? " Comments" : " Comment"}</span>
                    </p>
                </div>
                <hr className="w-2/3 mt-12"/>
                <div className="w-11/12 mx-auto mt-12 space-y-2">
                    {
                        commentsCount === 0?
                        <p className="text-center text-xl">No Comment to Show</p>:
                        allComments.map(comment => 
                            <div key={comment._id} className="p-4 sm:p-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border">
                                        <img className="w-full h-full rounded-full" src={comment.commenterPhoto} alt="user_IMG" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h4 className="font-bold min-[250px]:text-lg">{comment.commenterName}</h4>
                                        <p className="text-xs">{comment.time}</p>
                                    </div>
                                </div>
                                <p className="pl-10 lg:pl-12 pt-4 max-[250px]:text-sm">{comment.comment}</p>
                            </div>
                        )
                    }
                </div>
                {
                    user ? <div></div> :
                    <p className="mt-8 text-center text-lg">
                        <span onClick={()=>navigate("/login")} className="font-semibold text-blue-700 hover:cursor-pointer hover:underline">Login</span> or <span onClick={()=>navigate("/register")} className="font-semibold text-blue-700 hover:cursor-pointer hover:underline">Register</span> to comment on Blogs.
                    </p>
                }
                {
                    user && user.email !== userEmail ?
                    <form onSubmit={handleAddComment} className="w-full sm:w-10/12 mx-auto mt-12 flex flex-col items-end gap-2">
                        <div className="w-full">
                            <label className="label text-lg font-semibold">
                                <span className="font-semibold">Leave a Comment</span>
                            </label>
                            <textarea placeholder="write a comment" name="comment" className="textarea-bordered textarea-lg w-full border rounded-lg h-40"></textarea>
                        </div>
                        <input type="submit" value="Post Comment" className="w-max p-2 bg-blue-700 text-white shadow-md hover:scale-105 hover:cursor-pointer"/>
                    </form>:
                    <></>
                }
                {
                    user && user.email === userEmail ?
                    <div className="flex flex-col items-center gap-6 mt-8">
                        <p className="text-center text-xl font-semibold">Sorry! Can't Comment on Your Own Post.</p>
                        <button onClick={() => navigate(`/update-blog/${_id}`)} className="w-full sm:w-1/2 bg-green-500 text-white font-semibold text-lg px-1 py-2 shadow-md hover:scale-105">Update Blog</button>
                    </div>:<></>
                }
            </div>
        </div>
    );
};

export default BlogDetails;