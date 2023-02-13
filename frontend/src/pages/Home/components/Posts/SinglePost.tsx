import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import moment from "moment";
import defaultAvatar from "./../../../../assets/profile-empty-image.png";
import { Post } from "../../../../interfaces/Posts";
import { useAppDispatch } from "../../../../store/store";
import {
  addLikePost,
  getPostsBySearch,
} from "../../../../store/slices/postSlice";
import Likes from "./Likes";
import { toast } from "react-toastify";
import { ToastOptions } from "react-toastify";
import "./SinglePost.scss";
import { toastOptions } from "../../../../utils/ToastOptions";

interface SinglePostProps {
  post: Post;
  setCurrentId: any;
}
const SinglePost: React.FC<SinglePostProps> = ({ post, setCurrentId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile")!);
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };
  const [likes, setLikes] = useState(post.likes);
  const [showFullMessage, setShowFullMessage] = useState(false);
  const userId = user?.result?.googleId || user?.result?._id;
  const isAlreadyLiked = likes.find((like) => like === userId);
  const [showReportButton, setShowReportButton] = useState(false);

  const handleLikeClick = async () => {
    if (userId) {
      dispatch(addLikePost(post._id));

      if (isAlreadyLiked) {
        setLikes(post.likes.filter((id) => id !== userId));
      } else {
        setLikes([...post.likes, userId]);
      }
    }
  };

  const seeUsersProfile = () => {
    navigate(`/user/${post.creator?._id}`);
  };

  let PostMessage = (
    <>
      {showFullMessage || post.message.length < 50 ? (
        post.message
      ) : (
        <>
          {post.message.substring(0, 50)}...
          <button onClick={() => setShowFullMessage(true)}>more</button>{" "}
        </>
      )}
    </>
  );

  const searchPostByTag = (tag: string) => {
    dispatch(getPostsBySearch({ search: "", tags: tag }));
    navigate(`/posts/search?searchQuery="none"&tags=${tag}`);
  };

  const handleReportPost = () => {
    setShowReportButton(false);
    toast.success("Thank you, We'll take a look at this post.", toastOptions);
  };

  return (
    <article className="card">
      <header className="card__header">
        <div className="card__header__creator">
          <img
            src={
              post.creator?.avatarImage
                ? post.creator?.avatarImage
                : defaultAvatar
            }
            alt="avatar"
            onClick={seeUsersProfile}
          />
          <section className="card__header__creator__name">
            <h5 onClick={seeUsersProfile}>{post.creator?.name}</h5>
            <h6 className="card__header__creator__date">
              {post.createdAt ? moment(post.createdAt).fromNow() : null}
            </h6>
          </section>
        </div>
        <h5 onClick={openPost} className="card__header__title">
          {post.title}
        </h5>
        <section className="report">
          <button onClick={() => setShowReportButton(!showReportButton)}>
            <MoreHoriz style={{ color: "pink", fontSize: "2rem" }} />
          </button>
          {showReportButton && (
            <button className="reportButton" onClick={handleReportPost}>
              Report
            </button>
          )}
        </section>
      </header>

      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className="editIcon">
          <Button
            style={{ color: "pink" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHoriz fontSize="large" />
          </Button>
        </div>
      )}
      <div onClick={openPost} className="card__image">
        <img
          src={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          alt={post.title}
        />
      </div>
      <div className="card__body">
        <section className="card__body__hashtags">
          {post.tags &&
            post.tags.map((tag) => (
              <p
                onClick={() => searchPostByTag(tag)}
                key={Math.random()}
              >{` #${tag}`}</p>
            ))}
        </section>
        <section className="card__body__message">{PostMessage}</section>
      </div>

      <div className="card__buttons">
        <button onClick={handleLikeClick}>
          <Likes likes={likes} isAlreadyLiked={!!isAlreadyLiked} />
        </button>

        <button onClick={openPost}>
          <ChatBubbleOutlineIcon
            fontSize="small"
            style={{ color: "pink", fontSize: "20px" }}
          />
          &nbsp;{post.comments?.length}
        </button>
      </div>
    </article>
  );
};

export default SinglePost;
