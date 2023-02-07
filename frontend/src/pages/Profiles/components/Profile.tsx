import "./Profile.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../../api";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import noAvatarImage from "../../../assets/profile-empty-image.png";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import UserSinglePost from "./UserSinglePost";
import { getUsersPosts } from "../../../store/slices/postSlice";

const Profile = () => {
  const { id } = useParams();
  const { loading, usersPosts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<{
    name: string;
    lastName: string;
    avatarImage: string;
  } | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      if (id) {
        const { data } = await getUser(id);
        if (data) {
          setUser(data);
        }
        dispatch(getUsersPosts(id));
      }
    };
    try {
      getUserData();
    } catch (error) {
      console.log(error);
    }
  }, [id, dispatch]);

  return (
    <section className="AccountContainer">
      <main className="account">
        <section className="user">
          <section className="user__changeAvatar">
            <img
              src={user?.avatarImage ? user?.avatarImage : noAvatarImage}
              alt="default avatar"
            />

            <h5>{`${user?.name} ${user?.lastName}`}</h5>
          </section>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <section className="user__posts">
              <h6>POSTS</h6>
              <section className="user__posts__container">
                {usersPosts.map((post) => {
                  return (
                    <UserSinglePost post={post} key={post._id} owner={false} />
                  );
                })}
              </section>
            </section>
          )}
        </section>
      </main>
    </section>
  );
};

export default Profile;
