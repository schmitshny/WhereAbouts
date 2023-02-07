import "./PostDetails.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { getSinglePost } from "../../store/slices/postSlice";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import moment from "moment";
import corner from "../../assets/corner.png";
import CommentsSection from "./components/CommentsSection";

const PostDetails = () => {
  const { singlePost, loading } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="postDetails">
      <section className="postDetails__section">
        <h3 className="postDetails__section__title gradient">
          {singlePost.title}
        </h3>
        <h6>
          Created by: <span className="name">{singlePost.creator?.name}</span>
        </h6>

        <h6>{moment(singlePost.createdAt).fromNow()}</h6>
        <p className="postDetails__section__message">{singlePost.message}</p>
        <p className="postDetails__section__tags">
          {singlePost.tags?.map((tag) => `#${tag} `)}
        </p>

        <div className="postDetails__section__comments">
          <CommentsSection post={singlePost} />
        </div>
        {/* <div className="corner">
          <img src={corner} alt="corner" />
        </div> */}
      </section>
      <section className="postDetails__image">
        <img
          src={
            singlePost.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          alt={singlePost.title}
        />
      </section>
    </main>
  );
};

export default PostDetails;
