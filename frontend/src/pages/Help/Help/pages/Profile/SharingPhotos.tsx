import CollapseItem from "../../components/CollapseItem";
import HelpHeader from "../../components/HelpHeader";
import RelatedTopics from "../../components/RelatedTopics";
import "./SharingPhotos.scss";
import addScreen from "../../../../../assets/help/createScreenWeb.png";
import addScreenMobile from "../../../../../assets/help/createScreenMobile.png";
import createForm from "../../../../../assets/help/createForm.png";
import editPosts from "../../../../../assets/help/editPosts.png";
import editButton from "../../../../../assets/help/editButton.png";
import editForm from "../../../../../assets/help/editForm.png";
import deleteIcon from "../../../../../assets/help/deleteIcon.png";

const SharingPhotos = () => {
  return (
    <div className="HelpArticleContainer">
      <HelpHeader text="Sharing Photos" />
      <section className="helpArticle helpparagraph">
        <p className="helpTextPrimary">
          You can use Instagram to share photos with your friends.
        </p>
      </section>
      <CollapseItem
        title="Post photo on Whereabouts"
        content={
          <ol>
            <li>
              1. Click create on the navigation to open a form
              <div className="screenshot">
                <img src={addScreen} alt="navbar" />
              </div>
              or plus icon if you using mobile device
              <div className="screenshot">
                <img src={addScreenMobile} alt="navbar" />
              </div>
            </li>
            <li>
              2. Add title, message, tags
              <div className="screenshot">
                <img src={createForm} alt="create form" />
              </div>
            </li>
            <li>3. Click "choose file" and select image from your device</li>
            <li>4. Click "cancel" if you want to stop adding a post</li>
            <li>5. Click "submit" if you are done and want to add a post </li>
          </ol>
        }
      />
      <CollapseItem
        title="Edit your posts"
        content={
          <ol>
            <li>
              1. Click your profile picture or username in the top right to go
              to your profile.
            </li>
            <li>
              2. Click "Posts" to see all your posts
              <div className="screenshot">
                <img src={editPosts} alt="edit form" />
              </div>
            </li>
            <li>
              3. Click edit button on the post you want to edit to open edit
              form
              <div className="screenshot">
                <img src={editButton} alt="edit button" />
              </div>
            </li>
            <li>
              4. Edit your post and click submit
              <div className="screenshot">
                <img src={editForm} alt="edit form" />
              </div>
            </li>
          </ol>
        }
      />
      <CollapseItem
        title="Delete post"
        content={
          <ol>
            <li>
              1. Click your profile picture or username in the top right to go
              to your profile.
            </li>
            <li>
              2. Click "Posts" to see all your posts
              <div className="screenshot">
                <img src={editPosts} alt="edit form" />
              </div>
            </li>
            <li>
              3. Click delete button on the post you want to delete
              <div className="screenshot">
                <img src={deleteIcon} alt="edit button" />
              </div>
            </li>
          </ol>
        }
      />
      <RelatedTopics
        topics={[
          { text: "Sharing Photos Safely", link: "/help/sharingphotossafely" },
          { text: "Exploring photos", link: "/help/exploringphotos" },
        ]}
      />
    </div>
  );
};

export default SharingPhotos;
