import { useState } from 'react';
import './Calendar.css';

interface Props {
    onDateSelect: (date: Date, hour: number, minute: number) => void;
}

const Calendar = ({ onDateSelect }: Props) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState(selectedDate.getHours());
    const [selectedMinute, setSelectedMinute] = useState(selectedDate.getMinutes());

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        onDateSelect(date, selectedHour, selectedMinute);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let newValue = parseInt(value);

        if (newValue < parseInt(event.target.min)) {
            newValue = parseInt(event.target.min);
        } else if (newValue > parseInt(event.target.max)) {
            newValue = parseInt(event.target.max);
        }

        if (name === "hour") {
            setSelectedHour(newValue);
        } else if (name === "minute") {
            setSelectedMinute(newValue);
        }

        onDateSelect(selectedDate, selectedHour, selectedMinute);
    };

    const renderDaysOfWeek = () => {
        const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        return daysOfWeek.map((day, index) => (
            <div key={index} className="day-of-week">{day}</div>
        ));
    };

    const renderDaysOfMonth = () => {
        const lastDayOfMonth = new Date(selectedDate.getFullYear(),
            selectedDate.getMonth() + 1, 0);
        const numberOfDaysInMonth = lastDayOfMonth.getDate();

        const days = [];
        for (let i = 1; i <= numberOfDaysInMonth; i++) {
            const currentDate = new Date(selectedDate.getFullYear(),
                selectedDate.getMonth(), i);
            const classNames = ["day"];
            if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
                classNames.push("weekend");
            }
            if (currentDate.toDateString() === new Date().toDateString()) {
                classNames.push("today");
            }
            if (currentDate.toDateString() === selectedDate.toDateString()) {
                classNames.push("selected-day");
            }
            days.push(
                <div key={i} className={classNames.join(" ")} onClick={() =>
                    handleDateSelect(currentDate)}>
                    {i}
                </div>
            );
        }
        return days;
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        onDateSelect(date, selectedHour, selectedMinute);
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <img src="../../../public/back.png" alt="Calendar back" onClick={() =>
                    handleDateChange(new Date(selectedDate.getFullYear(),
                        selectedDate.getMonth() - 1, 1))} />
                <div>
                    <span className='date-month'>
                        {`${selectedDate.toLocaleString('default', { month: 'long' })} `}
                    </span>
                    <span className='date-year'>
                        {`${selectedDate.getFullYear()}`}
                    </span>
                </div>
                <img src="../../../public/forward.png" alt="Calendar forward" onClick={() =>
                    handleDateChange(new Date(selectedDate.getFullYear(),
                        selectedDate.getMonth() + 1, 1))} />
            </div>

            <div className="calendar-days-of-week">
                {renderDaysOfWeek()}
            </div>
            <div className="calendar-days">
                {renderDaysOfMonth()}
            </div>

            <div className="calendar-time">
                <input
                    type="number"
                    name="hour"
                    value={selectedHour}
                    onChange={handleTimeChange}
                    min="0"
                    max="23"
                    placeholder="Часы"
                />
                <p>:</p>
                <input
                    type="number"
                    name="minute"
                    value={selectedMinute}
                    onChange={handleTimeChange}
                    min="0"
                    max="59"
                    placeholder="Минуты"
                />
            </div>
        </div>
    );
};

export default Calendar;