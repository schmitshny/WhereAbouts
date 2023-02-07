import { useCallback, useEffect, useState } from "react";
import "./NavBar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import NoAvatarImage from "../../assets/profile-empty-image.png";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { User } from "../../interfaces/User/User";
import { logout } from "../../store/slices/authSlice";

interface MyToken {
  name: string;
  exp: number;
}

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authData } = useAppSelector((state) => state.auth);
  const isLogged = useAppSelector((state) => state.auth.isLoggedIn);
  const [user, setUser] = useState<{ result: User; token: string } | null>(
    null
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
    setUser(null);
    navigate("/");
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode<MyToken>(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }

    const loggedUser = localStorage.getItem("profile");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, [setUser, authData, navigate, handleLogout, user?.token]);

  return (
    <nav className="nav">
      <header className="nav__logo">
        <NavLink to="/">Whereabouts</NavLink>
      </header>
      <aside className="nav__auth">
        {isLogged && user ? (
          <>
            <NavLink to="/account/edit">
              <img
                className="nav__auth__avatar"
                src={
                  user.result.avatarImage
                    ? user.result.avatarImage
                    : NoAvatarImage
                }
                alt="profile"
              />

              <div className="nav__auth__username">{`${user.result?.name} ${
                user.result?.lastName || ""
              }`}</div>
            </NavLink>
          </>
        ) : (
          <button
            className="btn btn--primary"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </button>
        )}
      </aside>
    </nav>
  );
};

export default NavBar;
