import { RootState } from "../../store/store.ts";
import { useAppSelector } from "../../store/hooks.ts";
import TaskComponent from "../../components/TaskComponent/TaskComponent.tsx";

interface TaskListProps {
    selectedFilterCategory: string;
    selectedFilterTags: string[];
}

const TaskList = ({ selectedFilterCategory, selectedFilterTags }: TaskListProps) => {
    const { tasks } = useAppSelector((state: RootState) => state.tasks.tasks);

    const filterTasks = tasks.filter((task) => {
        if (task.category.includes(selectedFilterCategory)) {
            return true;
        } else if (selectedFilterTags.some(tag => task.tags.includes(tag))) {
            return true;
        }
        return false;
    });

    return (
        <div className="task-list">
            <h1>{selectedFilterCategory}</h1>
            {filterTasks.map((task) => (
                <TaskComponent
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    );
};
export default TaskList;
