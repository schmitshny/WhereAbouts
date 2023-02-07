import { Post } from "../../../interfaces/Posts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import DeleteIcon from "@mui/icons-material/Delete";
import noImage from "../../../assets/noImage.png";
import { useAppDispatch } from "../../../store/store";
import { removePost } from "../../../store/slices/postSlice";
import { useNavigate } from "react-router-dom";

const UserSinglePost: React.FC<{ post: Post; owner: boolean }> = ({
  post,
  owner,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <section className="user__posts__container__post">
      <img src={post.selectedFile || noImage} alt={post.title} />
      <section
        className="user__posts__container__post__overlay"
        onClick={() => navigate(`/posts/${post._id}`)}
      >
        <section className="postInfo">
          <FavoriteIcon style={{ fontSize: "30px", color: "white" }} />
          {post.likes?.length}
        </section>
        <section className="postInfo">
          <ModeCommentIcon style={{ fontSize: "30px", color: "white" }} />
          {post.comments?.length}
        </section>
        {owner && (
          <section className="deleteIcon">
            <DeleteIcon
              style={{ color: "red", fontSize: "35px" }}
              onClick={() => dispatch(removePost(post._id))}
            />
          </section>
        )}
      </section>
    </section>
  );
};

export default UserSinglePost;
