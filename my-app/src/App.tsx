import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateStore } from "./store/redux/Store";
import React, { lazy, Suspense } from "react";
import LoadingCpn from "./component/spin/LoadingCpn";
import "./i18n/i18n";
import "./App.css";
import NotFound from "./page/notFound/NotFound";
import UserDetail from "./page/userDetail/UserDetail";
import Dashboard from "./layouts/Dashboard";
import ManagerUserA from "./page/admin/userA/ManagerUserA";
import ManagerUserB from "./page/admin/userB/ManagerUserB";
import Admin from "./page/admin/Admin";


const Navbar = lazy(() => import("./component/NavBar/Navbar"));
const Login = lazy(() => import("./page/login/Login"));
const Register = lazy(() => import("./page/register/Register"));
// const ManagerUserA = lazy(() => import("./page/admin/userA/ManagerUserA"));
// const ManagerUserB = lazy(() => import("./page/admin/userB/ManagerUserB"));
// const Admin = lazy(() => import("./page/admin/Admin"));

const App = () => {
  const getUser = useSelector((state: StateStore) => state.userLogin.userInfo);

  return (
    <div className="App">
      <Router>
        {/* <Suspense fallback={<LoadingCpn />}> */}
        <Routes>
          {/* page  */}

          <Route path="/" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin */}
          <Route path="/admin" element={<Dashboard />}>
            <Route path="managerUserA" element={<ManagerUserA />} />
            <Route path="managerUserB" element={<ManagerUserB />} />
            <Route path="home" element={<Admin ifoUser={getUser} />} />
            <Route path="user-detail/:id" element={<UserDetail />} />
          </Route>

          {/* not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* </Suspense> */}
      </Router>
    </div>
  );
};
export default App;
