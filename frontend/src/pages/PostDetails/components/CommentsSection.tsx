import { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useAppDispatch } from "../../../store/store";
import "./CommentsSection.scss";
import { Post } from "../../../interfaces/Posts";
import { commentPost } from "../../../store/slices/postSlice";

interface CommentsProps {
  post: Post;
}

const CommentsSection: React.FC<CommentsProps> = ({ post }) => {
  const [comments, setComments] = useState<string[]>(post?.comments || []);
  const [comment, setComment] = useState("");
  const commentsRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("profile")!);

  const handleComment = async () => {
    const finalComment = `${user?.result?.name}: ${comment}`;

    const newComments = await dispatch(
      commentPost({ value: finalComment, id: post._id })
    );
    setComments(newComments.payload as string[]);
    setComment("");
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside className="commentsSection">
      <section className="commentsSection__comments">
        <h5>Comments</h5>
        {comments.length === 0 && <span>No comments yet</span>}
        {comments?.map((comment, index) => (
          <p key={index}>
            <strong>{comment.split(": ")[0]}</strong>
            {comment.split(":")[1]}
          </p>
        ))}
        <div ref={commentsRef}></div>
      </section>
      {user?.result?.name && (
        <div style={{ width: "70%" }} className="commentsSection__textfield">
          <h6>Write a comment</h6>
          <TextField
            fullWidth
            minRows={3}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="btn btn--primary"
            disabled={!comment.length}
            onClick={handleComment}
          >
            Comment
          </button>
        </div>
      )}
    </aside>
  );
};

export default CommentsSection;
