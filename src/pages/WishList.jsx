import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/Loading";


const WishList = () => {

    const [wishList, setWishList] = useState([]);
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get(`/wishlist/${user.email}`)
        .then(res => {
            setWishList(res.data);
            setDataLoading(false);
        })
    }, [user])

    if (dataLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            WISHLIST
        </div>
    );
};

export default WishList;