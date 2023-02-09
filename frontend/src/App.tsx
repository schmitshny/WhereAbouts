import React from "react";
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./store/store";
import NavBar from "./components/navigation/NavBar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profiles/components/Profile";
import Account from "./pages/Profiles/Account";
import PostDetails from "./pages/PostDetails/PostDetails";
import Chat from "./pages/Chat/Chat";

function App() {
  const isUserLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/posts" />} />
          <Route path="/posts" element={<Home />} />;
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/auth"
            element={
              !isUserLoggedIn ? <Auth /> : <Navigate replace to="/posts" />
            }
          />
          <Route path="user/:id" element={<Profile />} />
          <Route
            path="/account/*"
            element={
              isUserLoggedIn ? <Account /> : <Navigate replace to="/posts" />
            }
          />
          <Route
            path="/chat"
            element={
              isUserLoggedIn ? <Chat /> : <Navigate replace to="/posts" />
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
