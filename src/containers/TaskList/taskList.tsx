import { RootState } from "../../store/store.ts";
import { useAppSelector } from "../../store/hooks.ts";
import TaskComponent from "../../components/TaskComponent/TaskComponent.tsx";

interface TaskListProps {
    selectedFilter: string;
}

const TaskList = ({ selectedFilter }: TaskListProps) => {
    const { tasks } = useAppSelector((state: RootState) => state.tasks.tasks);

    const filterTasks = tasks.filter((task) => {
        if (task.category.includes(selectedFilter)) {
            return true;
        } else if (task.tags.includes(selectedFilter)) {
            return true;
        }
        return false;
    });

    return (
        <div className="task-list">
            <h1>{selectedFilter}</h1>
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
