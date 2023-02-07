import "./Account.scss";
import { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { User } from "../../interfaces/User/User";
import "react-toastify/dist/ReactToastify.css";

import EditProfile from "./components/EditProfile";
import { ToastContainer } from "react-toastify";
import ChangePassword from "./components/ChangePassword";
import UserPosts from "./UserPosts";

const Account = () => {
  const [user, setUser] = useState<{ result: User; token: string } | null>(
    null
  );

  useEffect(() => {
    const loggedUser = localStorage.getItem("profile");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  return (
    <>
      <section className="AccountContainer">
        <main className="account">
          <nav className="account__nav">
            <ul>
              <li>
                <NavLink to="/account/edit">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/account/password">Password</NavLink>
              </li>
              <li>
                <NavLink to="/account/posts">Posts</NavLink>
              </li>
              <li>
                <NavLink to="/account/edit">Help</NavLink>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/edit"
              element={<EditProfile user={user} setUser={setUser} />}
            />
            <Route path="/password" element={<ChangePassword user={user} />} />
            <Route path="/posts" element={<UserPosts user={user} />} />
          </Routes>
        </main>
      </section>
      <ToastContainer />
    </>
  );
};

export default Account;
