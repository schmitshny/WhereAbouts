import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../store/slices/authSlice";
import { signin, signup } from "../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { gapi } from "gapi-script";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import Input from "./Input";
import useStyles from "./styles";
import { User } from "../../interfaces/User/User";

const initialUserState: User = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  _id: "",
  avatarImage: "",
};

const Auth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const isLoading = useAppSelector((state) => state.auth.loading);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<User>(initialUserState);
  let errorMessage = useAppSelector((state) => state.auth.errors);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isSignup) {
      dispatch(signup({ user: formData, navigate }));
    } else {
      dispatch(signin({ user: formData, navigate }));
    }
  };
  const handleChange = (event: InputEvent) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const switchMode = () => {
    setIsSignup((prevState) => !prevState);
    errorMessage = "";
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="name"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Typography
              color="secondary"
              style={{ paddingLeft: 8, fontSize: 13 }}
            >
              {errorMessage === "User doesn't exist." ||
              errorMessage === "User already exists."
                ? errorMessage
                : ""}
            </Typography>
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            <Typography
              color="secondary"
              style={{ paddingLeft: 8, fontSize: 13 }}
            >
              {errorMessage === "Invalid password" && !isSignup
                ? errorMessage
                : ""}
            </Typography>
            {isSignup && (
              <>
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handleChange}
                  type="password"
                />
                <Typography
                  color="secondary"
                  style={{ paddingLeft: 8, fontSize: 13 }}
                >
                  {errorMessage === "Password don't match" ? errorMessage : ""}
                </Typography>
              </>
            )}
          </Grid>

          <button
            className="btn btn--primary"
            type="submit"
            style={{ marginTop: "1rem", width: "100%" }}
            disabled={isLoading}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
