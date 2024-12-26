import Banner from "../components/Banner";
import Newsletter from "../components/Newsletter";
import PopularBlogs from "../components/PopularBlogs";
import PopularCategories from "../components/PopularCategories";
import RecentBlogs from "../components/RecentBlogs";

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <RecentBlogs></RecentBlogs>
            <PopularBlogs></PopularBlogs>
            <PopularCategories></PopularCategories>
            <Newsletter></Newsletter>
        </div>
    );
};

export default HomePage;