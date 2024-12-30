import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const UpdateBlog = () => {

    const blog = useLoaderData();
    const { _id, thumbnail, category, title, description, userName, userPhoto, userEmail } = blog;
    const axiosSecure = useAxiosSecure();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()

    const handleUpdateBlog = e => {
        e.preventDefault();
        setErrorMessage('');
        const form = e.target;
        const updatedTitle = form.title.value;
        const updatedThumbnail = form.thumbnail.value;
        const updatedDescription = form.description.value;
        const updatedCategory = form.category.value;
        const userEmail = form.userEmail.value;
        if (category === 'select category') {
            setErrorMessage('Please select the category of your Blog!');
            return;
        }
        const updatedBlog = {
            title: updatedTitle,
            thumbnail: updatedThumbnail,
            description: updatedDescription,
            category: updatedCategory,
            userEmail
        };
        axiosSecure.patch(`/update-blog/${_id}`, updatedBlog)
        .then(res => {
            if (res.data.modifiedCount>0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Blog Updated Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(`/blogs/${_id}`);
            }
        })
    }

    return (
        <div>
            <div className="w-10/12 mx-auto mb-12 border rounded-xl sm:p-8 shadow-xl">
                <form onSubmit={handleUpdateBlog} className="sm:space-y-8">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="font-semibold">Blog Title</span>
                            </label>
                            <input type="text" placeholder="title" name="title" defaultValue={title} className="input input-bordered w-full" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="font-semibold">Blog Thumbnail</span>
                            </label>
                            <input type="text" placeholder="cover-image url" name="thumbnail" defaultValue={thumbnail} className="input input-bordered w-full" required />
                        </div>
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-semibold">Blog Description</span>
                        </label>
                        <textarea placeholder="write your blog" name="description" defaultValue={description} className="textarea-bordered textarea-lg w-full border rounded-lg min-h-56"></textarea>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="font-semibold">Category</span>
                            </label>
                            <select name="category" defaultValue={category} className="w-full h-12 rounded-lg px-4 border outline-none cursor-pointer">
                                <option>select category</option>
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
                        </div>
                        <div>
                            <label className="label">
                                <span className="font-semibold">User Name</span>
                            </label>
                            <input type="text" placeholder="username" name="userName" className="input input-bordered w-full" value={userName} readOnly required />
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="font-semibold">User Image</span>
                            </label>
                            <input type="text" placeholder="user photo" name="userPhoto" className="input input-bordered w-full" value={userPhoto} readOnly required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="font-semibold">User Email</span>
                            </label>
                            <input type="email" placeholder="user email" name="userEmail" className="input input-bordered w-full" value={userEmail} readOnly required />
                        </div>
                    </div>
                    <p>{errorMessage}</p>
                    <input type="submit" value="UPDATE" className="btn w-full h-12 rounded-lg border bg-green-500 text-lg font-semibold" />
                </form>
            </div>
        </div>
    );
};

export default UpdateBlog;