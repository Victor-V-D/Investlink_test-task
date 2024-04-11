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
        <div className="delete-modal-overlay" onClick={handleOverlayClick}>
            <div className="delete-modal">
                <div className="delete-modal-header">
                    <img src="../../../public/alert.png" alt="Alert" />
                </div>
                <div className="delete-modal-content">
                    <p className='delete-text-h'>Вы уверены?</p>
                    <p className='delete-text-p'>Вы не сможете восстановить это.</p>
                    <div className="delete-buttons">
                        <button className='delete-button' onClick={handleConfirmDelete}>Да, удалить</button>
                        <button className='cancel-button' onClick={handleCancel}>Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteTaskModal;
