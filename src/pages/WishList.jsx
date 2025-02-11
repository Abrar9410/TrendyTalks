import useAxiosSecure from "../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const WishList = () => {

    const { user, wishList, setWishList, loading, setLoading } = useContext(AuthContext);
    const {isDarkMode} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();


    const fetchWishList = () => {
        setLoading(true);
        axiosSecure.get(`/wishlist?email=${user.email}`)
        .then(res => {
            setWishList(res.data);
            setLoading(false);
        })
    }

    const handleRemove = id => {
        Swal.fire({
            title: "Remove from WishList?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/wishlist/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        fetchWishList();
                        toast.success('Blog removed from your WishList', {
                            position: "top-center",
                            autoClose: 1500
                        })
                    }
                })
            }
        });
    }

    const columns = [
        {
            name: "Title",
            selector: (row) => row.blog.title,
            sortable: true,
            cell: (row) => (
                <div className="flex items-center gap-3 text-start font-semibold text-base p-2">
                    <img src={row.blog.thumbnail} alt="Blog_Thumbnail" className="w-12 h-12 rounded" />
                    <span>{row.blog.title}</span>
                </div>
            ),
            minWidth: "245px",
            maxWidth: "450px",
        },
        {
            name: "Category",
            selector: (row) => row.blog.category,
            sortable: true,
            minWidth: "110px",
            maxWidth: "200px",
        },
        {
            name: "Description",
            selector: (row) => row.blog.description,
            sortable: true,
            cell: (row) => <span>{row.blog.description.slice(0, 70)}...</span>, // Shortened description
            minWidth: "130px",
            maxWidth: "content"
        },
        {
            name: "Comments",
            selector: (row) => row.blog.comments,
            sortable: true,
            cell: (row) => (
                <p><span>{row.blog.comments} <span>{row.blog.comments>1? "comments": "comment"}</span></span></p>
            ),
            minWidth: "115px",
            maxWidth: "150px",
        },
        {
            name: "Author",
            selector: (row) => row.blog.userName,
            sortable: true,
            cell: (row) => (
                <div className="flex justify-center items-center gap-1 lg:gap-2">
                    <img src={row.blog.userPhoto} alt={row.blog.userName[0]} className="w-6 h-6 rounded-full" />
                    <span>{row.blog.userName}</span>
                </div>
            ),
            minWidth: "120px",
            maxWidth: "250px"
        },
        {
            name: "Published",
            selector: (row) => row.blog.time,
            sortable: true,
            minWidth: "129px",
            maxWidth: "150px"
        },
        {
            name: "Action",
            selector: (row) => row.blog.time,
            sortable: false,
            cell: (row) => (
                <div className="flex flex-col justify-center items-center gap-2">
                    <Link to={`/blogs/${row.blog._id}`} className="w-max py-1 px-2 rounded-lg bg-black dark:bg-white text-cyan-400 dark:text-cyan-500 hover:scale-105">Read More</Link>
                    <button onClick={() => handleRemove(row._id)} className="w-max py-1 px-2 rounded-lg bg-red-500 text-black hover:scale-105">Remove</button>
                </div>
            ),
            minWidth: "100px",
            maxWidth: "120px"
        },
    ];

    const tableStyles = {
        table: {
            style: {
                tableLayout: "auto"
            }
        },
        headCells: {
            style: {
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: isDarkMode ? "gray" : "#f3f4f6",
                color: isDarkMode ? "white" : "black",
                fontWeight: "bold",
                fontSize: "1.12rem",
                border: "1px solid orange",
                padding: "10px 0"
            },
        },
        cells: {
            style: {
                justifyContent: "center",
                alignItems: "center",
                display: "flex",          // Ensure the cells use Flexbox
                backgroundColor: isDarkMode ? "black" : "white",
                color: isDarkMode ? "white" : "black",
                border: "1px solid orange",
                padding: "10px 1px",
                textWrap: "wrap"
            },
        },
    };

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <Header
            title="Your WishList"
            subtitle="Check out your favourite Blogs from here.">
            </Header>
            <div className="w-11/12 mx-auto my-12 text-center overflow-x-auto">
                <DataTable
                    columns={columns}
                    data={wishList}
                    customStyles={tableStyles}
                    defaultSortFieldId={1} // Optional: Set default sorting
                />
            </div>
        </div>
    );
};

export default WishList;