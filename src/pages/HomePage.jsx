import Banner from "../components/Banner";
import Newsletter from "../components/Newsletter";
import RecentBlogs from "../components/RecentBlogs";

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <RecentBlogs></RecentBlogs>
            <Newsletter></Newsletter>
        </div>
    );
};

export default HomePage;