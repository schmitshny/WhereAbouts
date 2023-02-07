import { useState } from "react";
import "./Home.scss";
import Continents from "./components/continents/Continents";
import Posts from "./components/Posts/Posts";
import { useLocation } from "react-router-dom";
import Paginate from "./components/pagination/Pagination";
import { useAppDispatch } from "../../store/store";
import Sidebar from "../../components/navigation/SideBar";
import SearchForm from "./components/SearchForm/SearchForm";
import CreateForm from "./components/CreateForm/CreateForm";
import Modal from "../../components/Modal/Modal";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useAppDispatch();
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openCreateForm, setOpenCreateForm] = useState(false);

  const query = useQuery();
  const page = query.get("page") || 1;

  return (
    <div className="container">
      <main>
        <Continents />

        <Posts setCurrentId={setCurrentId} />
        <Paginate page={+page} />
        <Sidebar
          openSearch={() => setOpenSearchBar(true)}
          openForm={() => setOpenCreateForm(true)}
        />
        <Modal
          open={openSearchBar}
          onClose={() => setOpenSearchBar(false)}
          children={<SearchForm onCancel={() => setOpenSearchBar(false)} />}
        />
        <Modal
          open={openCreateForm}
          onClose={() => setOpenCreateForm(false)}
          children={<CreateForm />}
        />
      </main>
    </div>
  );
};

export default Home;
