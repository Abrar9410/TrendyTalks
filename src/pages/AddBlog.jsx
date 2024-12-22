import { useContext, useState } from "react";
import Header from "../components/Header";
import { AuthContext } from "../providers/AuthProvider";


const AddBlog = () => {

    const {user} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddBlog = e => {
        e.preventDefault();
    }

    return (
        <div>
            <Header
                title="Add Your Blog"
                subtitle="Here is the place where you can write blogs on topic of your own choice. Express &
                        share your thoughts, knowledge & experience, or you can advertise your product!">    
            </Header>
            <div className="w-10/12 mx-auto mb-12 border rounded-xl sm:p-8 shadow-xl">
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
                            <input type="url" placeholder="cover-image url" name="thumbnail" className="input input-bordered w-full" required />
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
                            <select name="category" className="w-full h-12 rounded-lg px-4 border outline-none">
                                <option>select category</option>
                                <option value="Action">Action</option>
                                <option value="Action-Adventure">Action-Adventure</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Board Game">Board Game</option>
                                <option value="Horror">Horror</option>
                                <option value="Puzzle">Puzzle</option>
                                <option value="Role-playing">Role-playing</option>
                                <option value="RPG">RPG</option>
                                <option value="Simulation">Simulation</option>
                                <option value="Strategy">Strategy</option>
                                <option value="Sports">Sports</option>
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
                            <input type="url" placeholder="user photo" name="userPhoto" className="input input-bordered w-full" value={user.photoURL} readOnly required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="font-semibold">User Email</span>
                            </label>
                            <input type="email" placeholder="user email" name="userEmail" className="input input-bordered w-full" value={user.email} readOnly required />
                        </div>
                    </div>
                    <p>{errorMessage}</p>
                    <input type="submit" value="Post Blog" className="btn w-full h-12 rounded-lg border bg-green-500 text-lg font-semibold" />
                </form>
            </div>
        </div>
    );
};

export default AddBlog;