import { MouseEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createTask, directoryTags } from '../../../features/taskSlice';
import { useAppDispatch } from '../../../store/hooks';
import Calendar from '../Calendar/Calendar';
import './NewTaskModal.css'

interface Props {
    onClose: () => void;
}

const NewTaskModal = ({ onClose }: Props) => {
    const dispatch = useAppDispatch();

    const [taskText, setTaskText] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isImportant, setIsImportant] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
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
        if (!selectedDate) {
            setError('Выберите дату');
            return;
        }

        const categories = isImportant ? 'Важные' : 'Мои задачи';

        const newTask = {
            id: uuidv4(),
            status: false,
            important: isImportant,
            category: categories,
            text: taskText,
            tags: selectedTags,
            date: selectedDate ? selectedDate.toISOString() : '',
        };
        dispatch(createTask(newTask));
        onClose();
    };

    const handleTagChange = (tag: string) => {
        setSelectedTags(prevTags => prevTags.includes(tag)
            ? prevTags.filter(t => t !== tag) : [...prevTags, tag]);
    };

    const handleImportantChange = () => {
        setIsImportant(prevState => !prevState)
    };

    const handleDateSelect = (date: Date, hour: number, minute: number) => {
        const selectedDateWithTime = new Date(date);
        selectedDateWithTime.setHours(hour);
        selectedDateWithTime.setMinutes(minute);
        setSelectedDate(selectedDateWithTime);
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
        <div className="add-modal-overlay" onClick={handleOverlayClick}>
            <div className="add-modal">
                <div className="add-modal-header">
                    <p>Задача</p>
                    <img src="../../../public/close.png" alt="Close Task" onClick={handleCancel} />
                </div>
                <div className="add-modal-content">
                    <div>
                        <label htmlFor="task-text">Название</label>
                        <input
                            id="task-text"
                            className='add-input'
                            type="text"
                            placeholder="Название задачи"
                            value={taskText}
                            onChange={(e) => setTaskText(e.target.value)}
                        />
                    </div>

                    <div className='add-modal-important'>
                        <input
                            type="checkbox"
                            id="important"
                            checked={isImportant}
                            onChange={handleImportantChange}
                        />
                        <label htmlFor="important">Важная задача</label>
                    </div>

                    <div>
                        <label htmlFor="selected-date">Дата и время окончания</label>
                        <div className="date-input add-modal-space">
                            <input
                                id="selected-date"
                                className='add-input'
                                type="text"
                                placeholder="Дата и время"
                                value={selectedDate ? selectedDate.toLocaleString('default',
                                    {
                                        hour: '2-digit', minute: '2-digit',
                                        day: '2-digit', month: '2-digit', year: 'numeric'
                                    }
                                ) : ''}
                                readOnly
                            />
                            <img src="../../../public/calendar.png" alt="Calendar" onClick={() =>
                                setIsCalendarOpen(!isCalendarOpen)} />
                        </div>
                    </div>
                    {isCalendarOpen && <Calendar onDateSelect={handleDateSelect} />}

                    <div>
                        <label>Тэги</label>
                        <div className='add-modal-tags add-modal-space'>
                            {directoryTags.map((tag) => (
                                <div key={tag} className='add-modal-tag'>
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
                    </div>
                    {error && <p className="add-error">{error}</p>}
                    <div className='add-modal-buttons'>
                        <button className='add-button' onClick={handleAddTask}>Добавить</button>
                        <button className='cancel-button' onClick={handleCancel}>Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewTaskModal;
