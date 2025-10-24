import React, { useState } from "react";

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const Schedule = () => {
    const [schedule, setSchedule] = useState([]);
    const [newDay, setNewDay] = useState(weekdays[0]);
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");

    const handleAdd = () => {
        if (!fromTime || !toTime) return;
        setSchedule([...schedule, { day: newDay, from: fromTime, to: toTime }]);
        setFromTime("");
        setToTime("");
    };

    return (
        <div className="mt-6 p-4 bg-white rounded-2xl shadow-md w-full max-w-md flex flex-col gap-4">
            {/* Заголовок */}
            <h2 className="text-lg font-bold text-gray-900">Расписание</h2>

            {/* Форма в одну строку */}
            <div className="flex gap-2 items-center">
                <select
                    value={newDay}
                    onChange={(e) => setNewDay(e.target.value)}
                    className="border border-gray-300 rounded-lg p-1 w-20"
                >
                    {weekdays.map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>

                <input
                    type="time"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                    className="border border-gray-300 rounded-lg p-1 w-24"
                    placeholder="С"
                />

                <input
                    type="time"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                    className="border border-gray-300 rounded-lg p-1 w-24"
                    placeholder="До"
                />

                <button
                    onClick={handleAdd}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                >
                    Добавить
                </button>
            </div>

            {/* Список расписания */}
            <ul className="flex flex-col gap-2">
                {schedule.map((item, index) => (
                    <li
                        key={index}
                        className="flex justify-between border-b border-gray-200 pb-1"
                    >
                        <span className="text-gray-700 font-medium">{item.day}</span>
                        <span className="text-gray-600 text-sm">
              {item.from} — {item.to}
            </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Schedule;
