import TaskComponent from "../../components/TaskComponent/TaskComponent.tsx";
import { RootState } from "../../store/store.ts";
import { useAppSelector } from "../../store/hooks.ts";
// import './TaskList.css'

const TaskList = () => {
    const { tasks } = useAppSelector((state: RootState) => state.tasks.tasks);

    return (
        <div className="task-list">
            <h1>Мои Задачи</h1>
            {tasks.map((task) => (
                <TaskComponent
                    key={task.id}
                    task={task}
                />
            ))}
            <p>Задача</p>
        </div>
    );
};

export default TaskList;