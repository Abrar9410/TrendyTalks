import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useScrollRestoration from "../hooks/useScrollRestoration";


const MainLayout = () => {
    useScrollRestoration();
    return (
        <>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-395px)]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </>
    );
};

export default MainLayout;