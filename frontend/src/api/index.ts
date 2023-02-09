import axios, { AxiosResponse } from "axios";
import { User, userEditedData } from "../interfaces/User/User";
import searchQuery from "../interfaces/searchQuery";
import { IFetchPost, Post } from "../interfaces/Posts";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
export const host = API_URL;

const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers!.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")!).token
    }`;
  }
  return req;
});

//posts
export const fetchPosts = (page: string): Promise<AxiosResponse<IFetchPost>> =>
  API.get(`/posts?page=${page}`);

export const fetchSinglePost = (id: string): Promise<AxiosResponse<Post>> =>
  API.get(`/posts/${id}`);

export const fetchPostsBySearch = (
  searchQuery: searchQuery
): Promise<AxiosResponse<Post[]>> =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost: Post) => API.post("/posts", newPost);
export const updatePost = (id: string, updatedPost: Post) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id: string) => API.delete(`/posts/${id}`);
export const likePost = (id: string) => API.patch(`/posts/${id}/likePost`);
export const comment = (comment: string, id: string) =>
  API.post(`/posts/${id}/commentPost`, { comment });

export const fetchUsersPosts = (
  userId: string
): Promise<AxiosResponse<Post[]>> => API.get(`posts/getUserPosts/${userId}`);

//user

export const signIn = (
  FormData: User
): Promise<
  AxiosResponse<{ result: User; token: string } | { message: string }>
> => API.post("/user/signin", FormData);

export const signUp = (
  FormData: User
): Promise<
  AxiosResponse<{ result: User; token: string } | { message: string }>
> => API.post("/user/signup", FormData);

export const setProfileAvatar = (
  id: string,
  avatar: string
): Promise<AxiosResponse<{ isSet: string }>> =>
  API.patch(`/user/setAvatar/${id}`, { image: avatar });

export const editUser = (
  id: string,
  data: userEditedData
): Promise<AxiosResponse<User>> =>
  API.patch(`/user/editAccount/${id}`, {
    name: data.name,
    email: data.email,
    bio: data.bio,
    lastName: data.lastName,
  });

export const getUser = (
  id: string
): Promise<
  AxiosResponse<{ name: string; lastName: string; avatarImage: string }>
> => API.get(`user/getUserInfo/${id}`);

export const getAllUsers = (
  currentUserId: string
): Promise<AxiosResponse<User[]>> => API.get(`/user/allUsers/${currentUserId}`);

export const changePassword = (
  password: string,
  newPassword: string,
  id: string
): Promise<AxiosResponse<{ message: string }>> =>
  API.patch(`/user/changePassword`, {
    currentPassword: password,
    newPassword: newPassword,
    userId: id,
  });

//chat
export const getAllMessages = (from: string, to: string) =>
  API.post(`/messages/getMessages`, { from, to });

export const sendMessage = (
  from: string,
  to: string,
  message: string,
  image: string = ""
) => {
  API.post(`/messages/addMessage`, { from, to, message, image });
};
