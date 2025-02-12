import { useContext, useState } from "react";
import Header from "../components/Header";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import moment from "moment";


const AddBlog = () => {

    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddBlog = e => {
        e.preventDefault();
        setErrorMessage('');
        const form = e.target;
        const title = form.title.value;
        const thumbnail = form.thumbnail.value;
        const description = form.description.value;
        const category = form.category.value;
        const time = moment().format('lll');
        const comments= 0;
        const userName = form.userName.value;
        const userPhoto = form.userPhoto.value;
        const userEmail = form.userEmail.value;
        if (category === 'select category') {
            setErrorMessage('Please select the category of your Blog!');
            return;
        }
        const newBlog = {
            title,
            thumbnail,
            description,
            category,
            time,
            comments,
            userName,
            userPhoto,
            userEmail
        };
        axiosSecure.post('/blogs', newBlog)
        .then(res => {
            if (res.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Blog Posted Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset(); 
            }
        })
    }

    return (
        <div>
            <Header
                title="Add Your Blog"
                subtitle="Here is the place where you can write blogs on topic of your own choice. Express &
                        share your thoughts, knowledge & experience, or you can advertise your product!">    
            </Header>
            <div className="w-10/12 mx-auto mb-12 border rounded-xl sm:p-8 shadow-xl bg-white dark:bg-black">
                <form onSubmit={handleAddBlog} className="sm:space-y-8">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="font-semibold">Blog Title</span>
                            </label>
                            <input type="text" placeholder="title" name="title" className="input input-bordered w-full" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="font-semibold">Blog Thumbnail</span>
                            </label>
                            <input type="text" placeholder="cover-image url" name="thumbnail" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-semibold">Blog Description</span>
                        </label>
                        <textarea placeholder="write your blog" name="description" className="textarea-bordered textarea-lg w-full border rounded-lg min-h-56"></textarea>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="font-semibold">Category</span>
                            </label>
                            <select name="category" className="w-full h-12 rounded-lg px-4 border outline-none cursor-pointer">
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
                            <input type="text" placeholder="username" name="userName" className="input input-bordered w-full" value={user.displayName} readOnly required />
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="font-semibold">User Image</span>
                            </label>
                            <input type="text" placeholder="user photo" name="userPhoto" className="input input-bordered w-full" value={user.photoURL} readOnly required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="font-semibold">User Email</span>
                            </label>
                            <input type="email" placeholder="user email" name="userEmail" className="input input-bordered w-full" value={user.email} readOnly required />
                        </div>
                    </div>
                    <p>{errorMessage}</p>
                    <input type="submit" value="Post Blog" className="btn w-full h-12 rounded-lg bg-green-500 text-white text-lg font-semibold outline-none border-none" />
                </form>
            </div>
        </div>
    );
};

export default AddBlog;