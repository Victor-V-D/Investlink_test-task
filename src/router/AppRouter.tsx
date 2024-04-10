import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import TaskList from "../containers/TaskList/TaskList";
import SearchBar from "../components/UI/SearchBar/SearchBar";


function AppRouter() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<SearchBar />} />
        <Route path="/" element={<TaskList />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
