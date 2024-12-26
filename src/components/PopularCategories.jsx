

const PopularCategories = () => {

    const popularCategories = ["Book and Writing", "Business", "Fashion and Beauty", "Food", "Health and Fitness", "Inspiration", "Lifestyle", "Music", "Personal", "Photography", "Sports", "Travel"];

    return (
        <>
            <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3 text-center px-2 mb-8 lg:mb-10">
                <h2 className="text-cyan-500 text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
                    Popular Categories
                </h2>
                <p className="w-11/12 sm:w-9/12 md:w-7/12 lg:w-1/2 text-sm sm:text-base text-orange-400 font-semibold">
                    These are the most popular category for Blogs among our users.
                </p>
            </div>
            <div className="mb-20 w-10/12 mx-auto grid max-[305px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-[350px]:gap-4 gap-8 justify-items-center">
                {
                    popularCategories.map(category => 
                        <div key={category.slice(0,4)} className="w-max text-center max-[450px]:text-base text-lg font-semibold max-[450px]:p-2 p-4 rounded-lg shadow-lg bg-cyan-400 text-black cursor-pointer">
                            {category}
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default PopularCategories;