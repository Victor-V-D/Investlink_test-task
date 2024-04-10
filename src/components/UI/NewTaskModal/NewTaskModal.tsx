import { MouseEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createTask, directoryTags } from '../../../features/taskSlice';
import { useAppDispatch } from '../../../store/hooks';
import './NewTaskModal.css'

interface Props {
    onClose: () => void;
}

const NewTaskModal = ({ onClose }: Props) => {
    const dispatch = useAppDispatch();


    const [taskText, setTaskText] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

    const handleAddTask = () => {
        if (!taskText.trim()) {
            setError('Поле текста задачи не может быть пустым');
            return;
        }
        if (selectedTags.length === 0) {
            setError('Выберите хотя бы один тег');
            return;
        }
        const newTask = {
            id: uuidv4(),
            status: false,
            important: false,
            category: 'Мои задачи',
            text: taskText,
            tags: selectedTags,
            date: new Date().toISOString(),
        };
        dispatch(createTask(newTask));
        onClose();
    };

    const handleTagChange = (tag: string) => {
        setSelectedTags(prevTags => prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]);
    };

    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    const handleCancel = () => {
        setError('');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal">
                <div className="modal-header">
                    <div className="modal-content">
                        <h2>Новая задача</h2>
                        <label htmlFor="task-text">Текст задачи:</label>
                        <input
                            id="task-text"
                            type="text"
                            value={taskText}
                            onChange={(e) => setTaskText(e.target.value)}
                        />
                        <div className='tags'>
                            <label>Выберите теги:</label>
                            {directoryTags.map((tag) => (
                                <div key={tag}>
                                    <input
                                        type="checkbox"
                                        id={tag}
                                        value={tag}
                                        checked={selectedTags.includes(tag)}
                                        onChange={() => handleTagChange(tag)}
                                    />
                                    <label htmlFor={tag}>{tag}</label>
                                </div>
                            ))}
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div className="buttons">
                            <button onClick={handleAddTask}>Сохранить</button>
                            <button onClick={handleCancel}>Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewTaskModal;
