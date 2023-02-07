import { TextField, Typography, Paper } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  createNewPost,
  UpdateExistingPost,
} from "../../../../store/slices/postSlice";

import { Post } from "../../../../interfaces/Posts";
import "./CreateForm.scss";
import useStyles from "./styles";

interface FormProps {
  currentId?: string | null;
  setCurrentId?: any;
}

const initialPostData = {
  _id: "",
  title: "",
  message: "",
  tags: [],
  selectedFile: "",
  likes: [],
};

const CreateForm: React.FC<FormProps> = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const post = useAppSelector((state) =>
    currentId ? state.posts.posts.find((post) => post._id === currentId) : null
  );
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user = JSON.parse(localStorage.getItem("profile")!);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState<Post>(initialPostData);

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post, currentId]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (currentId) {
      dispatch(UpdateExistingPost({ ...postData, name: user?.result?.name }));
    } else {
      dispatch(
        createNewPost({
          post: { ...postData, name: user?.result?._id },
          navigate,
        })
      );
    }
    clearForm();
  };

  const handleAddTag = (tag: string) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };
  const handleDeleteTag = (tagToDelete: string) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== tagToDelete),
    });
  };
  const clearForm = () => {
    // setCurrentId(0);
    setPostData(initialPostData);
  };

  if (!isLoggedIn) {
    return (
      <Paper className={classes.paper} style={{ margin: "0 auto" }}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Place
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          minRows={4}
          multiline
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        <ChipInput
          style={{ margin: "10px 0" }}
          value={postData.tags}
          onAdd={handleAddTag}
          onDelete={handleDeleteTag}
          label="Tags"
          variant="outlined"
          fullWidth
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }: { base64: string }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <div className="searchButtons">
          <button className="btn btn--primary" type="submit">
            Submit
          </button>
          <button onClick={clearForm} className="btn btn--secondary">
            Clear
          </button>
        </div>
      </form>
    </Paper>
  );
};

export default CreateForm;
