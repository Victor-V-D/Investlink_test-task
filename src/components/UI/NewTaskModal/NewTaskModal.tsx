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

        const newTask = {
            id: uuidv4(),
            status: false,
            important: isImportant,
            category: 'Мои задачи',
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

                        <div className='important'>
                            <label htmlFor="important">Важная задача:</label>
                            <input
                                type="checkbox"
                                id="important"
                                checked={isImportant}
                                onChange={handleImportantChange}
                            />
                        </div>

                        <div className="date-input">
                            <label htmlFor="selected-date">Выберите дату:</label>
                            <input
                                id="selected-date"
                                type="text"
                                value={selectedDate ? selectedDate.toLocaleString('default',
                                    {
                                        hour: '2-digit', minute: '2-digit',
                                        day: '2-digit', month: '2-digit', year: 'numeric'
                                    }
                                ) : ''}
                                readOnly
                            />
                            <img src="calendar-icon.png" alt="Календарь" onClick={() =>
                                setIsCalendarOpen(!isCalendarOpen)} />
                        </div>
                        {isCalendarOpen && <Calendar onDateSelect={handleDateSelect} />}

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
