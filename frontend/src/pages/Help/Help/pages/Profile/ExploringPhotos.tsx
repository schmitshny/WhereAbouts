import CollapseItem from "../../components/CollapseItem";
import HelpHeader from "../../components/HelpHeader";
import RelatedTopics from "../../components/RelatedTopics";
import "./ExploringPhotos.scss";
import searchIconWeb from "../../../../../assets/help/searchIconWeb.png";
import searchForm from "../../../../../assets/help/searchForm.png";
import hashtags from "../../../../../assets/help/hashtags.png";
import postDetails from "../../../../../assets/help/postDetails.png";
import comments from "../../../../../assets/help/comments.png";
import addComment from "../../../../../assets/help/addComment.png";

const ExploringPhotos = () => {
  return (
    <div className="HelpArticleContainer">
      <HelpHeader text="Exploring photos" />
      <section className="helpArticle helpparagraph">
        <p className="helpTextPrimary">
          You can discover new things on Whereabouts based on people you follow
          and posts you like.
        </p>
      </section>
      <CollapseItem
        title="Using Search and Explore."
        content={
          <ol>
            <li>
              1. Click search icon to open a search tab.
              <div className="screenshot">
                <img src={searchIconWeb} alt="search icon " />
              </div>
            </li>
            <li>
              2. Enter the places or tags you are interested in and click
              "search"
              <div className="screenshot">
                <img src={searchForm} alt="search form " />
              </div>
            </li>
          </ol>
        }
      />
      <CollapseItem
        title="Finding hashtag and location pages."
        content={
          <ol>
            <li>
              1. Click hashtag to search similar posts
              <div className="screenshot">
                <img src={hashtags} alt="hashtags" />
              </div>
            </li>
          </ol>
        }
      />
      <CollapseItem
        title="See posts details"
        content={
          <ol>
            <li>
              1. Click on the post you are interested in to see its details
              <div className="screenshot">
                <img src={postDetails} alt="hashtags" />
              </div>
            </li>
          </ol>
        }
      />
      <CollapseItem
        title="See posts comments"
        content={
          <ol>
            <li>
              1. Click on the post you are interested in to see its details
              <div className="screenshot">
                <img src={postDetails} alt="comments" />
              </div>
              <div className="screenshot">
                <img src={comments} alt="comments" />
              </div>
            </li>
            <li>
              2. Write your comment and click "comment"
              <div className="screenshot">
                <img src={addComment} alt="comment" />
              </div>{" "}
            </li>
          </ol>
        }
      />
      <RelatedTopics
        topics={[
          { text: "Sharing Photos", link: "/help/sharingphotos" },
          { text: "Sharing Photos Safely", link: "/help/sharingphotossafely" },
        ]}
      />
    </div>
  );
};

export default ExploringPhotos;
