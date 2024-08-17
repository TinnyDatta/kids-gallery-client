import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";

const MainLayout = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MainLayout;