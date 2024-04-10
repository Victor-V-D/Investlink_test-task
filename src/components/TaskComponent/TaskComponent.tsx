import { ITask } from '../../interfaces/ITask';
import { updateTaskStatus } from '../../features/taskSlice';
import { useAppDispatch } from '../../store/hooks';
import './task-card.css'
import DeleteTaskModal from '../UI/DeleteTaskModal/DeleteTaskModal';
import { useEffect, useState } from 'react';

interface Props {
    task: ITask;
}

const TaskComponent = ({ task }: Props) => {
    const dispatch = useAppDispatch();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newStatus, setStatus] = useState(task.status);

    useEffect(() => {
        setStatus(task.status);
    }, [task.status]);

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
        <div className='task-card' style={{ marginBottom: '10px' }}>
            <input 
                type="checkbox" 
                checked={task.status} 
                onChange={handleCheckboxChange} 
            />
            <span>{task.text}</span>
            <p>{task.tags}</p>
            <span>{task.date}</span>
            <button onClick={handleOpenModal}>Удалить</button>
            {showDeleteModal && <DeleteTaskModal taskId={task.id} onClose={handleCloseModal} />}
        </div>
    );
};

export default TaskComponent;