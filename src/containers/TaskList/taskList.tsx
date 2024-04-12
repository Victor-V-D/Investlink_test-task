import { useState, useEffect } from 'react';
import { RootState } from "../../store/store.ts";
import { useAppSelector } from "../../store/hooks.ts";
import TaskComponent from "../../components/TaskComponent/TaskComponent.tsx";
import SearchBar from '../../components/UI/SearchBar/SearchBar.tsx';
import './TaskList.tsx.css';

interface TaskListProps {
    selectedFilterCategory: string;
    selectedFilterTags: string[];
}

const TaskList = ({ selectedFilterCategory, selectedFilterTags }: TaskListProps) => {
    const { tasks } = useAppSelector((state: RootState) => state.tasks.tasks);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTasks, setFilteredTasks] = useState(tasks);

    useEffect(() => {
        let filtered = tasks.filter(task => {
            if (selectedFilterCategory && !task.category.includes(selectedFilterCategory)) {
                return false;
            }
            if (selectedFilterTags.length > 0 && !selectedFilterTags.some(tag => task.tags.includes(tag))) {
                return false;
            }
            if (searchQuery && !task.text.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            return true;
        });
        setFilteredTasks(filtered);
    }, [tasks, selectedFilterCategory, selectedFilterTags, searchQuery]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="task-list">
            <SearchBar onSearch={handleSearch} />
            <p className="filter-list">{selectedFilterCategory}</p>
            {filteredTasks.map(task => (
                <TaskComponent key={task.id} task={task} searchQuery={searchQuery} />
            ))}
        </div>
    );
};

export default TaskList;
