import { Routes, Route } from "react-router-dom";

import "./Help.scss";
import "./Help/index.scss";
import HelpNavBar from "./Help/HelpNavBar";
import HelpHome from "./Help/HelpHome";
import YourProfile from "./Help/pages/Profile/YourProfile";
import SharingPhotos from "./Help/pages/Profile/SharingPhotos";
import ExploringPhotos from "./Help/pages/Profile/ExploringPhotos";
import DirectMessaging from "./Help/pages/Profile/DirectMessaging";
import Signingup from "./Help/pages/Manage Account/Signingup";
import DeleteAccount from "./Help/pages/Manage Account/DeleteAccount";
import StayingSafe from "./Help/pages/Manage Account/StayingSafe";
import AbuseSpam from "./Help/pages/Manage Account/AbuseSpam";
import Report from "./Help/pages/Privacy and security/Report";
import LoginAndPassword from "./Help/pages/Privacy and security/LoginAndPassword";
import SharingPhotosSafely from "./Help/pages/Manage Account/SharingPhotosSafely";
import SignIn from "./Help/pages/Manage Account/SignIn";

const Help = () => {
  return (
    <div className="help-container">
      <HelpNavBar />
      <Routes>
        <Route path="/" element={<HelpHome />} />
        <Route path="/yourprofile" element={<YourProfile />} />
        <Route path="/sharingphotos" element={<SharingPhotos />} />
        <Route path="/exploringphotos" element={<ExploringPhotos />} />
        <Route path="/directmessaging" element={<DirectMessaging />} />
        <Route path="/gettingstarted" element={<Signingup />} />
        <Route path="/loggingin" element={<SignIn />} />
        <Route path="/deleteaccount" element={<DeleteAccount />} />
        <Route path="/stayingsafe" element={<StayingSafe />} />
        <Route path="/sharingphotossafely" element={<SharingPhotosSafely />} />
        <Route path="/stayingsafe" element={<Signingup />} />
        <Route path="/abuse-spam" element={<AbuseSpam />} />
        <Route path="/login-password" element={<LoginAndPassword />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </div>
  );
};

export default Help;
