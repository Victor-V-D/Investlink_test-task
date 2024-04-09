import './SearchBar.css'

const SearchBar = () => {
    return (
        <div className="search-bar">
            <img src="../../../public/search.png" alt="Search Task" />
            <input type="text" placeholder="Поиск" />
        </div>
    );
};

export default SearchBar;