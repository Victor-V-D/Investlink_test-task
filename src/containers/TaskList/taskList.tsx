import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { RootState } from "../../store/store.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import TaskComponent from "../../components/TaskComponent/TaskComponent.tsx";
import SearchBar from '../../components/UI/SearchBar/SearchBar.tsx';
import './TaskList.css';
import { updateTaskOrder } from '../../features/taskSlice.ts';

interface TaskListProps {
    selectedFilterCategory: string;
    selectedFilterTags: string[];
}

const TaskList = ({ selectedFilterCategory, selectedFilterTags }: TaskListProps) => {
    const dispatch = useAppDispatch();
    const { tasks } = useAppSelector((state: RootState) => state.tasks.tasks);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [loadedTasksCount, setLoadedTasksCount] = useState(5);

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

    const handleShowMore = () => {
        setLoadedTasksCount(prevCount => prevCount + 5);
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const newTaskOrder = Array.from(filteredTasks);
        const [removedTask] = newTaskOrder.splice(result.source.index, 1);
        newTaskOrder.splice(result.destination.index, 0, removedTask);
        dispatch(updateTaskOrder(newTaskOrder));
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="task-list">
                <SearchBar onSearch={handleSearch} />
                <p className="filter-list">{selectedFilterCategory}</p>
                <Droppable droppableId="task-list">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {filteredTasks.slice(0, loadedTasksCount).map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <TaskComponent key={task.id} task={task} searchQuery={searchQuery} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {filteredTasks.length > loadedTasksCount && (
                    <p className='showMore' onClick={handleShowMore}>открыть еще 5 задач</p>
                )}
            </div>
        </DragDropContext>
    );
};

export default TaskList;
