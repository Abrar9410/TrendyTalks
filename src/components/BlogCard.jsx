import { CiHeart } from "react-icons/ci";


const BlogCard = ({blog}) => {

    const {thumbnail, category, title, description, userPhoto, userName, time, comment} = blog;

    return (
        <div className="border border-blue-700 rounded-sm">
            <figure className="rounded-t-sm">
                <img src={thumbnail} alt="Blog_Thumbnail" className="w-full sm:h-[40vw] lg:h-[25vw] xl:h-[20vw] rounded-t-sm"/>
            </figure>
            <div className="py-4 px-2 flex flex-col">
                <p className="font-semibold text-lg w-max border-b-2 border-red-600 pb-[1px]">{category}</p>
                <h3 className="font-bold text-lg min-[300px]:text-xl sm:text-2xl xl:text-3xl mt-4">{title}</h3>
                <p className="my-6">{description.slice(0, 300)}...</p>
                <div className="flex-grow"></div>
                <div className="flex justify-between items-center">
                    <button className="w-max px-3 py-2 border max-sm:text-sm">Read More</button>
                    <button className="btn btn-circle border border-fullBg outline-none btn-xs sm:btn-sm xl:btn-md bg-white sm:text-xl lg:text-2xl">
                        <CiHeart />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;