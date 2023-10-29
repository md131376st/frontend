import './App.css';
import {Outlet, useNavigate} from "react-router-dom";

import AppRoutes from "./routes";
import Header from "./Components/Header/header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from "react-toastify";
import * as React from "react";
import {useEffect, useState} from "react";
import {logIn} from "./Api/userApi";
import jwt from "jwt-decode";

function App() {
    const [user, setUser] = useState(undefined);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        // console.log("hi")
        // const userdata = localStorage.getItem('access_token')

        // if (userdata!==undefined){
        //     setUser( jwt(userdata));
        //     setLoggedIn(true);
        // }
    },[]
    );

    const navigate = useNavigate();


  return (
    <div className="App">
        <ToastContainer />
        <Header user={user} setUser={setUser} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
          <Outlet/>

          <div className="content">
              <AppRoutes  user = {user}/>
          </div>


    </div>
  );
}

export default App;
