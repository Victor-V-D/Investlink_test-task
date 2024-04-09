import { ITask } from '../../interfaces/ITask';
import './task-card.css'

interface Props {
    task: ITask;
}

const TaskComponent = ({ task }: Props) => {
    return (
        <div className='task-card' style={{ marginBottom: '10px' }}>
            checkbox
            <span>{task.text}</span>
            <p>{task.tags}</p>
            <span>{task.date}</span>
            <button>Удалить</button>
            <button>Переместить</button>
        </div>
    );
};

export default TaskComponent;