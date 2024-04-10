import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import SearchBar from "../components/UI/SearchBar/SearchBar";


function AppRouter() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<SearchBar />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
