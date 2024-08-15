import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../component/Navbar/Navbar";

const MainLayout = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MainLayout;