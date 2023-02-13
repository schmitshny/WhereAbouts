import "./HelpHome.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HelpHeader from "./components/HelpHeader";
import { NavLink } from "react-router-dom";

const HelpHome = () => {
  return (
    <>
      <div className="HomeHelpContainer">
        <HelpHeader text="Help Center" />

        <header className="HelpHeader">How can we help you?</header>

        <section className="mostSearched">
          <h2 className="mostSearched__header">Most searched:</h2>
          <h4 className="mostSearched__topic">
            <NavLink to="/help/yourprofile">How to change my username</NavLink>
          </h4>
          <h4 className="mostSearched__topic">
            <NavLink to="/help/deleteaccount">How to delete my account</NavLink>
          </h4>
          <h4 className="mostSearched__topic">
            <NavLink to="/help/directmessaging">How to send message</NavLink>
          </h4>
          <h4 className="mostSearched__topic">
            <NavLink to="/help/yourprofile">How to see my posts</NavLink>
          </h4>
        </section>
      </div>
    </>
  );
};

export default HelpHome;
