import { useEffect, useState } from "react";
import "./HelpNavBar.scss";
import List from "@mui/material/List";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SupportOutlinedIcon from "@mui/icons-material/SupportOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SmsFailedOutlinedIcon from "@mui/icons-material/SmsFailedOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import SendToMobileOutlinedIcon from "@mui/icons-material/SendToMobileOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import CookieOutlinedIcon from "@mui/icons-material/CookieOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { ListElement } from "../../../interfaces/Help";
import HelpNavBarItem from "./HelpNavBarItem";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useNavigate } from "react-router-dom";

interface IOpenState {
  [key: number]: boolean;
}

const HelpNavBar = () => {
  const [open, setOpen] = useState<IOpenState>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [showMenu, setShowMenu] = useState(true);
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    setOpen({ ...open, [id]: !open[id] });
  };

  useEffect(() => {
    setShowMenu(false);
  }, [navigate]);

  const handleShowMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const handleSelect = (item: string) => {
    if (selectedItem !== item) {
      setSelectedItem(item);
    }
  };
  const listItems: ListElement[] = [
    {
      id: 0,
      listItemText: "Help Center",
      listItemIcon: <HomeOutlinedIcon />,
      open: open[0],
      isCollabse: false,
      navigateTo: "/help",
    },
    {
      id: 1,
      listItemText: "Whereabouts features",
      listItemIcon: <ExploreOutlinedIcon />,
      open: open[1],
      isCollabse: true,
      collabseItems: [
        {
          collapseItemText: "Your account",
          collapseItemIcon: <AccountCircleOutlinedIcon />,
          navigateTo: "yourprofile",
        },
        {
          collapseItemIcon: <AddCircleOutlineOutlinedIcon />,
          collapseItemText: "Sharing photos",
          navigateTo: "sharingphotos",
        },
        {
          collapseItemIcon: <SearchOutlinedIcon />,
          collapseItemText: "Exploring photos",
          navigateTo: "exploringphotos",
        },
        {
          collapseItemIcon: <EmailOutlinedIcon />,
          collapseItemText: "Direct messaging",
          navigateTo: "directmessaging",
        },
      ],
    },
    {
      id: 2,
      listItemText: "Manage your account",
      listItemIcon: <ManageAccountsOutlinedIcon />,
      open: open[2],
      isCollabse: true,
      collabseItems: [
        {
          collapseItemText: "Signign up and getting started",
          collapseItemIcon: <AccountBoxOutlinedIcon />,
          navigateTo: "gettingstarted",
        },
        {
          collapseItemText: "Sign in to your account",
          collapseItemIcon: <LoginOutlinedIcon />,
          navigateTo: "loggingin",
        },
        {
          collapseItemIcon: <HighlightOffOutlinedIcon />,
          collapseItemText: "Delete your account",
          navigateTo: "deleteaccount",
        },
      ],
    },
    {
      id: 3,
      listItemText: "Privacy, security and reporting",
      listItemIcon: <LockOutlinedIcon />,
      open: open[3],
      isCollabse: true,
      collabseItems: [
        {
          collapseItemIcon: <ReportGmailerrorredOutlinedIcon />,
          collapseItemText: "How to report things",
          navigateTo: "report",
        },
        {
          collapseItemIcon: <SupportOutlinedIcon />,
          collapseItemText: "Staying safe",
          navigateTo: "stayingsafe",
        },
        {
          collapseItemIcon: <SendToMobileOutlinedIcon />,
          collapseItemText: "Sharing photos safely",
          navigateTo: "sharingphotossafely",
        },
      ],
    },
  ];
  return (
    <>
      <section className="hamburgerIcon">
        {showMenu ? (
          <CloseIcon
            style={{ fontSize: "25px", color: "rgba(0, 0, 0, 0.54)" }}
            onClick={handleShowMenu}
          />
        ) : (
          <MenuIcon
            style={{ fontSize: "25px", color: "black" }}
            onClick={handleShowMenu}
          />
        )}
      </section>

      <nav className={`helpnavbar ${showMenu ? "open" : ""}`}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {listItems.map((item) => {
            return (
              <HelpNavBarItem
                handleClick={handleClick}
                item={item}
                key={item.id}
                handleSelect={handleSelect}
                selectedItem={selectedItem}
              />
            );
          })}
        </List>
      </nav>
    </>
  );
};

export default HelpNavBar;
