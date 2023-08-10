import { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { StateStore } from "./store/redux/Store";
import { lazy, Suspense } from "react";
import LoadingCpn from "./component/spin/LoadingCpn";
import I18n from "./component/I18n";

const Navbar = lazy(() => import("./component/NavBar/Navbar"));
const Login = lazy(() => import("./page/login/Login"));
const Register = lazy(() => import("./page/register/Register"));
const ManagerUserA = lazy(() => import("./page/admin/userA/ManagerUserA"));
const ManagerUserB = lazy(() => import("./page/admin/userB/ManagerUserB"));
const Admin = lazy(() => import("./page/admin/Admin"));


function App() {
  const getUser = useSelector((state: StateStore) => state.userLogin.userInfo);

  useEffect(() => {}, []);

  return (
    <div className="App">
      {/* <I18n/> */}
      <Router>
        <Suspense fallback={<LoadingCpn />}>
          <Routes>
            <Route path="/" element={<Navbar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin/userA"
              element={getUser ? <ManagerUserA /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/userB"
              element={getUser ? <ManagerUserB /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={
                getUser ? <Admin ifoUser={getUser} /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
