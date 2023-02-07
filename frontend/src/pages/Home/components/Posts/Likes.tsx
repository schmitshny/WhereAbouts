import { ThumbUpAlt, ThumbUpAltOutlined } from "@material-ui/icons";

interface LikesProps {
  isAlreadyLiked: boolean;
  likes: string[];
}

const Likes: React.FC<LikesProps> = ({ likes, isAlreadyLiked }) => {
  if (likes.length > 0) {
    return isAlreadyLiked ? (
      <>
        <ThumbUpAlt
          style={{ color: "pink", fontSize: "20px" }}
          fontSize="small"
        />
        &nbsp;
        {likes.length}
      </>
    ) : (
      <>
        <ThumbUpAltOutlined fontSize="small" style={{ color: "pink" }} />
        &nbsp;{likes.length}
      </>
    );
  }

  return (
    <>
      <ThumbUpAltOutlined
        fontSize="small"
        style={{ color: "pink", fontSize: "20px" }}
      />
      &nbsp;{likes.length}
    </>
  );
};

export default Likes;
