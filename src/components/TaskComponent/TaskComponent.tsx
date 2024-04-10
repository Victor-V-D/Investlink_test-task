import { ITask } from '../../interfaces/ITask';
import { updateTaskStatus } from '../../features/taskSlice';
import { useAppDispatch } from '../../store/hooks';
import './TaskComponent.css'
import DeleteTaskModal from '../UI/DeleteTaskModal/DeleteTaskModal';
import { useEffect, useState } from 'react';

interface Props {
    task: ITask;
}

const TaskComponent = ({ task }: Props) => {
    const dispatch = useAppDispatch();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newStatus, setStatus] = useState(task.status);
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        setStatus(task.status);
    }, [task.status]);

    useEffect(() => {
        if (task.date) {
            const dateObj = new Date(task.date);
            const hours = dateObj.getHours().toString().padStart(2, '0');
            const minutes = dateObj.getMinutes().toString().padStart(2, '0');
            const day = dateObj.getDate().toString().padStart(2, '0');
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const year = dateObj.getFullYear();
            setFormattedDate(`${hours}:${minutes} / ${day}.${month}.${year}`);
        } else {
            setFormattedDate('');
        }
    }, [task.date]);

    const handleOpenModal = () => {
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
    };

    const handleCheckboxChange = () => {
        setStatus(!task.status);
        dispatch(updateTaskStatus({ id: task.id, status: newStatus }));
    };

    return (
        <div className='task-card'>
            <input
                type="checkbox"
                checked={task.status}
                onChange={handleCheckboxChange}
            />
            <span>{task.text}</span>
            <p>{task.tags}</p>
            <span>{formattedDate}</span>
            <button onClick={handleOpenModal}>Удалить</button>
            {showDeleteModal && <DeleteTaskModal taskId={task.id} onClose={handleCloseModal} />}
        </div>
    );
};

export default TaskComponent;