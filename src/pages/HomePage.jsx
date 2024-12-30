import { useContext, useEffect, useState } from "react";
import Banner from "../components/Banner";
import Newsletter from "../components/Newsletter";
import PopularBlogs from "../components/PopularBlogs";
import PopularCategories from "../components/PopularCategories";
import RecentBlogs from "../components/RecentBlogs";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const HomePage = () => {

    
    const { wishList } = useContext(AuthContext);

    return (
        <div>
            <Banner></Banner>
            <RecentBlogs wishList={wishList}></RecentBlogs>
            <PopularBlogs wishList={wishList}></PopularBlogs>
            <PopularCategories></PopularCategories>
            <Newsletter></Newsletter>
        </div>
    );
};

export default HomePage;