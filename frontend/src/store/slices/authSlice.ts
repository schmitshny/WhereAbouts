import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, userEditedData } from "../../interfaces/User/User";
import { SignedUser } from "../../interfaces/User/User";
import * as api from "../../api/index";
import { AppDispatch } from "../store";
import { NavigateFunction } from "react-router-dom";
interface AuthState {
  authData: null | SignedUser;
  isLoggedIn: boolean;
  errors: string;
  avatar: string;
}

const initialState: AuthState = {
  authData: null,
  isLoggedIn: localStorage.getItem("profile") ? true : false,
  errors: "",
  avatar: "",
};

export const signin = createAsyncThunk<
  Object,
  { user: User; navigate: NavigateFunction },
  { dispatch: AppDispatch }
>("/user/signin", async (params, thunkApi) => {
  try {
    const { data } = await api.signIn(params.user);
    if ("result" in data) {
      thunkApi.dispatch(setUserData(data));
      thunkApi.dispatch(setErrors(""));
      params.navigate("/");
    }
    if ("message" in data) {
      thunkApi.dispatch(setErrors(data.message));
    }
  } catch (error) {
    console.log(error);
    return thunkApi.rejectWithValue(error);
  }
});

export const signup = createAsyncThunk<
  Object,
  { user: User; navigate: NavigateFunction },
  { dispatch: AppDispatch }
>("/user/signup", async (params, thunkApi) => {
  try {
    const { data } = await api.signUp(params.user);
    if ("result" in data) {
      thunkApi.dispatch(setUserData(data));
      thunkApi.dispatch(setErrors(""));
      params.navigate("/");
    }
    if ("message" in data) {
      thunkApi.dispatch(setErrors(data.message));
    }
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const setAvatarImage = createAsyncThunk<
  Object,
  { id: string; avatar: string },
  { dispatch: AppDispatch }
>("/setAvatar/:id", async (user, thunkApi) => {
  try {
    const { data } = await api.setProfileAvatar(user.id, user.avatar);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const editUserData = createAsyncThunk<
  Object,
  { id: string; data: userEditedData },
  { dispatch: AppDispatch }
>("/user/editAccount/:id", async (user, thunkApi) => {
  try {
    const { data } = await api.editUser(user.id, user.data);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<SignedUser>) => {
      state.authData = action?.payload;
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.authData = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
    setErrors: (state, action: PayloadAction<string>) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editUserData.fulfilled, (state, action) => {
      let data = JSON.parse(localStorage.getItem("profile") || "") as any;
      data.result = action.payload;
      localStorage.setItem("profile", JSON.stringify(data));
    });
  },
});

export default authSlice.reducer;
export const { setUserData, logout, setErrors } = authSlice.actions;
