import "./Posts.scss";
import { useAppSelector } from "../../../../store/store";
import SinglePost from "./SinglePost";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

interface PostsProps {
  setCurrentId: any;
}

const Posts: React.FC<PostsProps> = ({ setCurrentId }) => {
  const { posts, loading } = useAppSelector((state) => state.posts);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <section className="posts">
      {posts.length === 0 && <div className="noPostInfo">No posts found</div>}
      {posts &&
        posts.map((post) => {
          return (
            <article className="posts" key={`${post._id}1`}>
              <SinglePost post={post} setCurrentId={setCurrentId} />
            </article>
          );
        })}
    </section>
  );
};

export default Posts;
