import { useContext, useEffect, useState } from "react";
import Banner from "../components/Banner";
import Newsletter from "../components/Newsletter";
import PopularBlogs from "../components/PopularBlogs";
import AboutUs from "../components/AboutUs";
import RecentBlogs from "../components/RecentBlogs";
import { AuthContext } from "../providers/AuthProvider";


const HomePage = () => {

    
    const { wishList } = useContext(AuthContext);

    return (
        <div>
            <Banner></Banner>
            <RecentBlogs wishList={wishList}></RecentBlogs>
            <PopularBlogs wishList={wishList}></PopularBlogs>
            <AboutUs></AboutUs>
            <Newsletter></Newsletter>
        </div>
    );
};

export default HomePage;