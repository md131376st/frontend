import './App.css';
import {Outlet} from "react-router-dom";

import AppRoutes from "./routes";
import Header from "./Components/Header/header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from "react-toastify";
import * as React from "react";

function App() {
  return (
    <div className="App">
        <Header/>
          <Outlet/>
            <ToastContainer />
          <div className="content">
              <AppRoutes />
          </div>


    </div>
  );
}

export default App;
