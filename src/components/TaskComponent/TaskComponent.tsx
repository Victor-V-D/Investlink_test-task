import { useEffect, useState } from 'react';
import { ITask } from '../../interfaces/ITask';
import { updateTaskCategory, updateTaskStatus } from '../../features/taskSlice';
import { useAppDispatch } from '../../store/hooks';
import DeleteTaskModal from '../UI/DeleteTaskModal/DeleteTaskModal';
import './TaskComponent.css'

interface Props {
    task: ITask;
    searchQuery: string;
}

const TaskComponent = ({ task, searchQuery }: Props) => {
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
        if (task.category !== 'Удалённые') {
            dispatch(updateTaskCategory({ id: task.id, category: 'Удалённые' }));
        } else {
            setShowDeleteModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
    };

    const handleCheckboxChange = () => {
        const updatedStatus = !task.status;
        setStatus(updatedStatus);
        dispatch(updateTaskStatus({ id: task.id, status: updatedStatus }));
        if (task.category !== 'Выполненные') {
            dispatch(updateTaskCategory({ id: task.id, category: 'Выполненные' }));
        } else {
            dispatch(updateTaskCategory({ id: task.id, category: 'Мои задачи' }));
        }
    };

    return (
        <div className='task-card'>
            <div className='block'>
                <input
                    type="checkbox"
                    checked={newStatus}
                    onChange={handleCheckboxChange}
                    className="checkbox-input"
                />
                <span className={task.important ? 'important-task' : ''}>
                    {searchQuery ? (
                        <>
                            {task.text.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, index) => (
                                part.toLowerCase() === searchQuery.toLowerCase() ? (
                                    <span key={index} className="highlight">{part}</span>
                                ) : (
                                    <span key={index}>{part}</span>
                                )
                            ))}
                        </>
                    ) : (
                        task.text
                    )}
                </span>
            </div>
            <div className='block custom-block'>
                <span className="tags-block space">
                    {task.tags.map((tag, index) => (
                        <span key={index} className={`tag-style-${tag}`}>
                            {tag}
                        </span>
                    ))}
                </span>
                <span className='date-block space'>{formattedDate}</span>
                <img src="../../../public/delete.png" alt="Delete Task"
                    onClick={handleOpenModal} className='space' />
            </div>
            {showDeleteModal && <DeleteTaskModal taskId={task.id} onClose={handleCloseModal} />}
        </div>
    );
};

export default TaskComponent;