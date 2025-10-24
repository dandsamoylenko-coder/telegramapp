import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; // стили по умолчанию

const MyCalendar = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className="mt-6 p-4 bg-white rounded-2xl shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Выберите дату и время</h2>
            <p className="text-gray-600 text-sm mb-4">
                Выберите подходящие окошки для записи.
            </p>

            <Calendar
                onChange={setDate}
                value={date}
                className="react-calendar"
            />

            <p className="mt-2 text-gray-700 text-sm">
                Выбрана дата: {date.toLocaleDateString("ru-RU", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })}
            </p>
        </div>
    );
};

export default MyCalendar;