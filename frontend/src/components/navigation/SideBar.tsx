import "./Sidebar.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { NavLink, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { logout } from "../../store/slices/authSlice";

interface SidebarProps {
  openSearch: () => void;
  openForm: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ openSearch, openForm }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isUserLogged = useAppSelector((state) => state.auth.isLoggedIn);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/");
  }, [dispatch, navigate]);
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <NavLink to="/">
            <HomeIcon style={{ color: "#e8c92a" }} />
            <h5>Home</h5>
          </NavLink>
        </li>
        <li onClick={openSearch}>
          <SearchOutlinedIcon />
          <h5>Search</h5>
        </li>
        <li>
          <NavLink to="/chat">
            <ForumOutlinedIcon />
            <h5>Chat</h5>
          </NavLink>
        </li>
        <li onClick={openForm}>
          <AddBoxOutlinedIcon />
          <h5>Create</h5>
        </li>

        <li>
          <NavLink to="/account/edit">
            <SettingsOutlinedIcon />
            <h5>Settings</h5>
          </NavLink>
        </li>

        <li className="hideOnSmallScreen">
          <NavLink to="/help">
            <HelpCenterOutlinedIcon />
            <h5>Help</h5>
          </NavLink>
        </li>

        {isUserLogged && (
          <li onClick={handleLogout} className="hideOnSmallScreen">
            <ExitToAppOutlinedIcon style={{ color: "#ef4b78" }} />
            <h5>Log out</h5>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
