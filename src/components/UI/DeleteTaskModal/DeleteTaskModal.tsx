import { MouseEvent } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { deleteTask } from '../../../features/taskSlice';
import './DeleteTaskModal.css';

interface Props {
    taskId: string;
    onClose: () => void;
}

const DeleteTaskModal = ({ taskId, onClose }: Props) => {
    const dispatch = useAppDispatch();

    const handleConfirmDelete = () => {
        dispatch(deleteTask(taskId));
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal">
                <div className="modal-header">
                    <h2>Подтверждение удаления</h2>
                    <button className="close-button" onClick={handleCancel}>✕</button>
                </div>
                <div className="modal-content">
                    <p>Вы уверены, что хотите удалить эту задачу?</p>
                    <div className="buttons">
                        <button onClick={handleConfirmDelete}>Удалить</button>
                        <button onClick={handleCancel}>Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteTaskModal;
