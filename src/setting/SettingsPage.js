import React, { useState } from "react";

export default function SettingsPage() {
    const [comment, setComment] = useState("");

    // 1. Вложенный компонент: Шаг расписания
    const ScheduleStep = () => {
        const [duration, setDuration] = useState(""); // выбранная длительность

        return (
            <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-4 mt-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Шаг расписания</h2>

                <label className="block text-gray-700 text-sm mb-1" htmlFor="duration">
                    Выберите длительность услуги:
                </label>
                <select
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Выберите...</option>
                    <option value="15">15 минут</option>
                    <option value="30">30 минут</option>
                    <option value="60">1 час</option>
                </select>

                {duration && (
                    <p className="mt-2 text-gray-600 text-sm">
                        Выбрана длительность: <span className="font-medium">{duration} минут</span>
                    </p>
                )}
            </div>
        );
    };

    // 2. Вложенный компонент: Напоминания
    const Reminders = () => {
        const [reminders, setReminders] = useState({
            dayBefore: false,
            threeHours: false,
            oneHour: false,
        });

        const handleChange = (key) => {
            setReminders({ ...reminders, [key]: !reminders[key] });
        };

        return (
            <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-4 mt-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Напоминания клиентам</h2>

                <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        id="dayBefore"
                        checked={reminders.dayBefore}
                        onChange={() => handleChange("dayBefore")}
                        className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="dayBefore" className="text-gray-700 text-sm">
                        за сутки
                    </label>
                </div>

                <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        id="threeHours"
                        checked={reminders.threeHours}
                        onChange={() => handleChange("threeHours")}
                        className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="threeHours" className="text-gray-700 text-sm">
                        за 3 часа
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="oneHour"
                        checked={reminders.oneHour}
                        onChange={() => handleChange("oneHour")}
                        className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="oneHour" className="text-gray-700 text-sm">
                        за час
                    </label>
                </div>
            </div>
        );
    };

    // 3. Вложенный компонент: Подписка
    const Subscription = () => {
        return (
            <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-4 mt-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Подписка</h2>

                <div className="flex flex-col gap-1 mb-4">
                    <p className="text-gray-700 text-sm">
                        Активна до <span className="font-medium">23 ноября</span>
                    </p>
                    <p className="text-gray-700 text-sm">
                        Списания <span className="font-medium">отключены</span>
                    </p>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-2">
                    Привязать карту
                </button>

                <p className="text-gray-900 font-semibold text-sm">500 ₽ / месяц</p>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Настройки</h1>
                <p className="text-gray-600">Комментарий к записи:</p>

                {/* Простейший редактор с contentEditable */}
                <div className="flex gap-2">
                    <button
                        onClick={() => document.execCommand("bold")}
                        className="font-bold px-2 py-1 border rounded"
                    >
                        B
                    </button>
                    <button
                        onClick={() => document.execCommand("italic")}
                        className="italic px-2 py-1 border rounded"
                    >
                        I
                    </button>
                    <button
                        onClick={() => document.execCommand("underline")}
                        className="underline px-2 py-1 border rounded"
                    >
                        U
                    </button>
                </div>

                <div
                    contentEditable
                    className="border border-gray-300 rounded-lg p-2 min-h-[100px] bg-white"
                    placeholder="Напишите комментарий..."
                    onInput={(e) => setComment(e.currentTarget.innerHTML)}
                ></div>

                <button
                    onClick={() => alert(comment)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Сохранить комментарий
                </button>
            </div>

            {/* Вставляем остальные блоки */}
            <ScheduleStep />
            <Reminders />
            <Subscription />
        </div>
    );
}
