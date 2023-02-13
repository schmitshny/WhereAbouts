import "./YourProfile.scss";
import RelatedTopics from "../../components/RelatedTopics";
import HelpHeader from "../../components/HelpHeader";
import CollapseItem from "../../components/CollapseItem";
import emptyProfileImage from "../../../../../assets/profile-empty-image.png";
import changeAvatarImage from "../../../../../assets/help/changeAvatar.png";
import cropAvatar from "../../../../../assets/help/cropAvatar.png";

const YourProfile = () => {
  return (
    <>
      <div className="HelpArticleContainer">
        <HelpHeader text="Your Profile" />
        <section className="helpArticle helpparagraph">
          <p className="helpTextPrimary">
            Your profile is where you can find your photos, videos and settings
            on Instagram. Here, you can view what you've shared, see a list of
            the people you're following and who's following you.
          </p>
        </section>
        <CollapseItem
          title="Add a bio to your profile"
          content={
            <ol>
              <li>
                1. Click your profile picture or username in the top right to go
                to your profile.
              </li>
              <li>2. Click Profile at the right, then click Bio</li>
              <li>3. Write your bio to your account.</li>
              <li>4. Click edit profile</li>
            </ol>
          }
        />
        <CollapseItem
          title="Update your username"
          content={
            <ol>
              <li>
                1. Click your profile picture or username in the top right to go
                to your profile.
              </li>
              <li>2. Click Profile at the left, then click name</li>
              <li>3. Edit your name</li>
              <li>4. Click edit profile</li>
            </ol>
          }
        />
        <CollapseItem
          title="Update your profile picture"
          content={
            <ol>
              <li>
                1. Click your profile picture or username in the top right to go
                to your profile.
              </li>
              <li>2. Click Profile at the left, then click name</li>
              <li>
                3. Click
                <img
                  className="small"
                  src={emptyProfileImage}
                  alt="default avatar"
                />
                or your profile image
              </li>
              <li>
                4. Click "Choose an image"
                <div className="screenshot">
                  <img src={changeAvatarImage} alt="change avatar screen" />
                </div>
              </li>
              <li>5. Choose image from your device and click open</li>
              <li>
                6. Crop the image and click save
                <div className="screenshot">
                  <img src={cropAvatar} alt="change avatar screen" />
                </div>
              </li>
            </ol>
          }
        />

        <RelatedTopics
          topics={[
            {
              text: "Signing Up and Getting Started",
              link: "/help/gettingstarted",
            },
            { text: "Sharing photos", link: "/help/sharingphotos" },
          ]}
        />
      </div>
    </>
  );
};

export default YourProfile;
