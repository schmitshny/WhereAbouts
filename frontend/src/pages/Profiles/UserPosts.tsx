import { SignedUser } from "../../interfaces/User/User";
import "./UserPosts.scss";
import noAvatarImage from "../../assets/profile-empty-image.png";
import cameraImage from "../../assets/camera.png";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getUsersPosts } from "../../store/slices/postSlice";
import UserSinglePost from "./components/UserSinglePost";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

interface UserPostsProps {
  user: SignedUser | null;
}

export const UserPosts: React.FC<UserPostsProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const { usersPosts, loading } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (user?.result?._id) {
      dispatch(getUsersPosts(user?.result?._id));
    }
  }, [user?.result?._id, dispatch]);

  return (
    <section className="user">
      <section className="user__changeAvatar">
        <img
          src={
            user?.result?.avatarImage
              ? user?.result?.avatarImage
              : noAvatarImage
          }
          alt="default avatar"
        />
        <section className="user__changeAvatar__cameraImage">
          <img src={cameraImage} alt="camera" />
        </section>
        <h5>{`${user?.result?.name} ${user?.result?.lastName}`}</h5>
      </section>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <section className="user__posts">
          <h6>POSTS</h6>
          <section className="user__posts__container">
            {usersPosts.map((post) => {
              return <UserSinglePost post={post} key={post._id} owner={true} />;
            })}
          </section>
        </section>
      )}
    </section>
  );
};

export default UserPosts;
