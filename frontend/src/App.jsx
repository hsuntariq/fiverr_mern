import React from "react";
import "./globals.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast"
import Main from "./pages/Main";
import AddResetPassword from "./components/AddResetPassword";
const App = () => {





  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/home' element={<Main />} />
          <Route path='/reset-password/:token' element={<AddResetPassword />} />
          {/* <Route path='*' element={<Error />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
