import { Input } from "@material-ui/core";
import { FormEvent, useState } from "react";
import { changePassword } from "../../../api";
import { SignedUser } from "../../../interfaces/User/User";
import "./ChangePassword.scss";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utils/ToastOptions";
import { AxiosError } from "axios";

interface ChangePasswordProps {
  user: SignedUser | null;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ user }) => {
  const [formData, setFormData] = useState({
    password: "",
    newPasswrord: "",
    confirmPassword: "",
  });

  const preventSubmitByEnter = (
    event: React.KeyboardEvent<HTMLFormElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { password, newPasswrord, confirmPassword } = formData;
    if (newPasswrord !== confirmPassword) {
      toast.error("Passwords don't match", toastOptions);
      return;
    }
    if (user?.result?._id) {
      try {
        const data = await changePassword(
          password,
          newPasswrord,
          user?.result?._id
        );
        if (data.status !== 200) {
          toast.error(data.data.message, toastOptions);
        } else {
          toast.success(data.data.message, toastOptions);
        }
      } catch (error) {
        const axiosError = error as AxiosError<any>;

        toast.error(axiosError.response?.data.message, toastOptions);
      }
    }
  };

  return (
    <section className="user">
      <form
        className="user__forms changePasswordForm"
        onKeyDown={preventSubmitByEnter}
        onSubmit={handleSubmit}
      >
        <section className="user__forms__input">
          <label htmlFor="name">Old password</label>
          <Input
            type="password"
            name="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </section>
        <section className="user__forms__input">
          <label htmlFor="name">New password</label>
          <Input
            type="password"
            name="newPasswrord"
            required
            onChange={(e) =>
              setFormData({ ...formData, newPasswrord: e.target.value })
            }
          />
        </section>
        <section className="user__forms__input">
          <label htmlFor="name">Confirm new password</label>
          <Input
            type="password"
            name="confirmPassword"
            required
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </section>

        <button type="submit" className="btn btn--primary">
          Change password
        </button>
      </form>
    </section>
  );
};

export default ChangePassword;
