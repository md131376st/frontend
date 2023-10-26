import './App.css';
import {Outlet, useNavigate} from "react-router-dom";

import AppRoutes from "./routes";
import Header from "./Components/Header/header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from "react-toastify";
import * as React from "react";
import {useEffect, useState} from "react";
import {logIn} from "./Api/userApi";

function App() {
    const [user, setUser] = useState(undefined);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginErr, setLoginErr] = useState(undefined);
    const [studyPlan, setStudyPlan] = useState([]);
    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             const user = await getUserInfo(); // we have the user info here
    //             setLoginErr(undefined);
    //             setLoggedIn(true);
    //             if (user.studyplan !== 0) {
    //                 const courseList = await API.getStudyPlan(user.id);
    //                 setStudyPlan(courseList);
    //             }
    //             setUser(user);
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     };
    //     checkAuth();
    // }, []);

    const navigate = useNavigate();
    const handleLogin = async (credentials) => {
        try {
            const user = await logIn(credentials);
            setLoginErr(undefined);
            setLoggedIn(true);
            setUser(user);
            navigate('/');

        } catch (err) {

            setLoginErr(err);
            navigate('/login');
        }
    };

    // const handleLogout = async () => {
    //         await API.logOut();
    //     setLoggedIn(false);
    //     setUser(undefined);
    //     navigate('/');
    // };

  return (
    <div className="App">
        <ToastContainer />
        <Header user={user} setUser={setUser} setLoggedIn={setLoggedIn}/>
          <Outlet/>

          <div className="content">
              <AppRoutes />
          </div>


    </div>
  );
}

export default App;
