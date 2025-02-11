import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";


const FeaturedBlogs = () => {

    const [featuredBlogs, setFeaturedBlogs] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const {isDarkMode} = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/featured-blogs`)
        .then(res => {
            setFeaturedBlogs(res.data);
            setDataLoading(false)
        });
    }, [])

    const columns = [
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
            cell: (row) => (
                <div className="flex items-center gap-3 text-start font-semibold text-base p-2">
                    <img src={row.thumbnail} alt={row.title} className="w-12 h-12 rounded" />
                    <span>{row.title}</span>
                </div>
            ),
            minWidth: "245px",
            maxWidth: "450px",
        },
        {
            name: "Category",
            selector: (row) => row.category,
            sortable: true,
            minWidth: "110px",
            maxWidth: "200px",
        },
        {
            name: "Description",
            selector: (row) => row.description,
            sortable: true,
            cell: (row) => <span>{row.description.slice(0, 70)}...</span>, // Shortened description
            minWidth: "130px",
            maxWidth: "content"
        },
        {
            name: "Comments",
            selector: (row) => row.comments,
            sortable: true,
            cell: (row) => (
                <p><span>{row.comments} <span>{row.comments>1? "comments": "comment"}</span></span></p>
            ),
            minWidth: "115px",
            maxWidth: "150px",
        },
        {
            name: "Author",
            selector: (row) => row.userName,
            sortable: true,
            cell: (row) => (
                <div className="flex justify-center items-center gap-1 lg:gap-2">
                    <img src={row.userPhoto} alt={row.userName} className="w-6 h-6 rounded-full" />
                    <span>{row.userName}</span>
                </div>
            ),
            minWidth: "120px",
            maxWidth: "250px"
        },
        {
            name: "Published",
            selector: (row) => row.time,
            sortable: true,
            minWidth: "129px",
            maxWidth: "150px"
        },
        {
            name: "Action",
            selector: (row) => row.time,
            sortable: false,
            cell: (row) => (
                <div>
                    <Link to={`/blogs/${row._id}`} className="w-max py-1 px-2 rounded-lg bg-black dark:bg-white text-cyan-400 dark:text-cyan-500 hover:scale-105">Read More</Link>
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
                border: "1px solid skyblue",
                padding: "10px 1px"
            },
        },
        cells: {
            style: {
                justifyContent: "center", 
                alignItems: "center",   
                display: "flex",          // Ensure the cells use Flexbox
                backgroundColor: isDarkMode ? "black" : "white",
                color: isDarkMode ? "white" : "black",
                border: "1px solid skyblue", 
                padding: "10px 0",
                textWrap: "wrap"
            },
        },
    };

    if (dataLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="bg-black py-8 px-2 text-center">
                <h2 className="text-cyan-400 text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">Featured Blogs</h2>
            </div>
            <div className="w-11/12 mx-auto my-12 text-center overflow-x-auto">
                <DataTable
                    columns={columns}
                    data={featuredBlogs}
                    customStyles={tableStyles}
                    defaultSortFieldId={1} // Optional: Set default sorting
                />
            </div>
        </div>
    );
};

export default FeaturedBlogs;