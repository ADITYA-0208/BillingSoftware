import { useEffect, useContext } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Menubar from "./components/Menubar/Menubar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ManageCategory from "./pages/ManageCategory/ManageCategory.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";
import ManageItems from "./pages/ManageItems/ManageItems.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import Login from "./pages/Login/Login.jsx";
import OrderHistory from "./pages/OrderHistory/OrderHistory.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import { AppContext } from "./context/AppContext.jsx";

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth } = useContext(AppContext);

    // 🔥 Redirect to dashboard on first load or if on /login
    useEffect(() => {
        if (location.pathname === "/" || location.pathname === "/login") {
            navigate("/dashboard", { replace: true });
        }
    }, [location.pathname, navigate]);

    const ProtectedRoute = ({ element, allowedRoles }) => {
        if (!auth.token) {
            return <Navigate to="/dashboard" replace />; // allow access anyway
        }

        if (allowedRoles && !allowedRoles.includes(auth.role)) {
            return <Navigate to="/dashboard" replace />;
        }

        return element;
    };

    return (
        <div>
            {location.pathname !== "/login" && location.pathname !== "/" && <Menubar />}
            <Toaster />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/category" element={<ManageCategory />} />
                <Route path="/users" element={<ManageUsers />} />
                <Route path="/items" element={<ManageItems />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
