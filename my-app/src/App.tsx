import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateStore } from "./store/redux/Store";
import React from "react";
import "./i18n/i18n";
import "./App.css";
import NotFound from "./page/notFound/NotFound";
import UserDetail from "./page/userDetail/UserDetail";
import Dashboard from "./layouts/Dashboard";
import ManagerUserA from "./page/admin/userA/ManagerUserA";
import ManagerUserB from "./page/admin/userB/ManagerUserB";
import Admin from "./page/admin/Admin";
import Navbar from "./component/NavBar/Navbar";
import Login from "./page/login/Login";
import Register from "./page/register/Register";
import AddMenu from "./page/admin/managerMenu/AddMenu";
import DeleDeleteUpdateMenu from "./page/admin/managerMenu/Delete&UpdateMenu";


const App = () => {
  const getUser = useSelector((state: StateStore) => state.userLogin.userInfo);

  return (
    <div className="App">
      <Router>
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
            <Route path="add-menu" element={<AddMenu />} />
            <Route
              path="delete&update-menu"
              element={<DeleDeleteUpdateMenu />}
            />
          </Route>

          {/* not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
