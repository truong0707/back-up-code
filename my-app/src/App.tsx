import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./page/login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Doashboard from "./page/admin/Doashboard";
import Register from "./page/register/Register";
import { useSelector } from "react-redux";
import { StateStore } from "./store/redux/Store";
import ManagerUserA from "./page/userA/ManagerUserA";
import ManagerUserB from "./page/userB/ManagerUserB";
import Navbar from "./component/NavBar/Navbar";

function App() {
  const getUser = useSelector((state: StateStore) => state.userLogin.userInfo);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route
            path="/admin"
            element={getUser ? <Doashboard /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/userA" element={getUser ? <ManagerUserA /> : <Navigate to="/login" />} />
          <Route path="/admin/userB" element={getUser ? <ManagerUserB /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
