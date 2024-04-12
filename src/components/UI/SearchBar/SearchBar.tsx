import { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { searchTasks } from '../../../features/taskSlice';
import './SearchBar.css';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        dispatch(searchTasks(searchTerm));
        onSearch(searchTerm);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            onSearch('');
        }
    };

    return (
        <div className="search-bar">
            <img src="../../../public/search.png" alt="Search Task" />
            <input
                type="text"
                placeholder="Поиск"
                value={searchTerm}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};

export default SearchBar;
