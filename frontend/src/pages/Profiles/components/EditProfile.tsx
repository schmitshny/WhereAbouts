import "./EditProfile.scss";
import Avatar from "react-avatar-edit";
import noAvatarImage from "../../../assets/profile-empty-image.png";
import cameraImage from "../../../assets/camera.png";
import Modal from "../../../components/Modal/Modal";
import { User } from "../../../interfaces/User/User";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { editUserData, setAvatarImage } from "../../../store/slices/authSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utils/ToastOptions";

import { Input, TextField } from "@material-ui/core";

interface State {
  result: User;
  token: string;
}

interface EditProfileProps {
  user: State | null;
  setUser: (prevState: any) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, setUser }) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const [preview, setPreview] = useState<string>("");
  const [formData, setFormData] = useState({
    name: user?.result.name || "",
    lastName: user?.result.lastName || "",
    email: user?.result.email || "",
    bio: user?.result.bio || "",
  });

  useEffect(() => {
    if (user?.result)
      setFormData({
        name: user?.result.name,
        lastName: user?.result.lastName,
        email: user?.result.email,
        bio: user?.result.bio || "",
      });
  }, [user]);

  const handleClose = () => {
    setPreview("");
  };

  const handleCrop = (view: string) => {
    setPreview(view);
  };

  const preventSubmitByEnter = (
    event: React.KeyboardEvent<HTMLFormElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleCancel = () => {
    setPreview("");
    setOpenModal(false);
  };

  const handleSave = async () => {
    setOpenModal(false);
    const data =
      user && user.result
        ? await dispatch(
            setAvatarImage({ id: user?.result?._id, avatar: preview })
          )
        : undefined;
    if (data) {
      setUser((prevState: State) => {
        if (!prevState) {
          return null;
        }
        return {
          ...prevState,
          result: {
            ...prevState.result,
            avatarImage: preview,
          },
        };
      });
    } else {
      toast.error("Error setting avatar. Please try again.", toastOptions);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (user?.result._id) {
      const data = await dispatch(
        editUserData({ id: user?.result._id, data: formData })
      );
      if (data.payload) {
        toast.success("Profile edited", toastOptions);
      }
    }
  };

  return (
    <>
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
            <img
              src={cameraImage}
              alt="camera"
              onClick={() => setOpenModal(true)}
            />
          </section>
          <h5>{`${user?.result?.name} ${user?.result?.lastName}`}</h5>
        </section>

        <form
          className="user__forms"
          onKeyDown={preventSubmitByEnter}
          onSubmit={handleSubmit}
        >
          <section className="user__forms__input">
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              name="name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
              required
            />
          </section>
          <section className="user__forms__input">
            <label htmlFor="name">Lastname</label>
            <Input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </section>
          <section className="user__forms__input">
            <label htmlFor="name">Email</label>
            <Input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </section>
          <section className="user__forms__input">
            <label htmlFor="name">Bio</label>
            <TextField
              multiline={true}
              style={{ width: "70%" }}
              name="bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
          </section>
          <button type="submit" className="btn btn--primary">
            Edit profile
          </button>
        </form>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          children={
            <section className="setAvatarContainer">
              <div className="avatarSelector">
                <Avatar
                  width={window.innerWidth < 320 ? 250 : 300}
                  height={300}
                  src={undefined}
                  onClose={handleClose}
                  onCrop={handleCrop}
                  labelStyle={{ color: "white", fontSize: "2rem" }}
                  label="Choose an image"
                />
              </div>
              <div className="buttons">
                <button
                  className="btn btn--primary"
                  onClick={handleSave}
                  disabled={preview ? false : true}
                >
                  Save
                </button>
                <button className="btn btn--secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </section>
          }
        />
      </section>
    </>
  );
};

export default EditProfile;
