import "./SearchForm.scss";
import { AppBar, TextField } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPostsBySearch } from "../../../../store/slices/postSlice";
import { useAppDispatch } from "../../../../store/store";
import useStyle from "./styles";

const SearchForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const classes = useStyle();

  const handleAdd = (tag: string) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      onCancel();
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "enter") {
      searchPost();
    }
  };

  return (
    <div className="searchBar">
      <AppBar
        className={classes.appBarSearch}
        position="static"
        color="inherit"
      >
        <TextField
          name="search"
          variant="outlined"
          label="Search Places"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <ChipInput
          style={{ margin: "10px 0" }}
          value={tags}
          onAdd={handleAdd}
          onDelete={handleDelete}
          label="Search tags"
          variant="outlined"
        />
        <section className="searchButtons">
          <button
            className="btn btn--primary"
            onClick={searchPost}
            disabled={search.length === 0 && tags.length === 0}
          >
            Search
          </button>
          <button className="btn btn--secondary" onClick={onCancel}>
            Cancel
          </button>
        </section>
      </AppBar>
    </div>
  );
};

export default SearchForm;
