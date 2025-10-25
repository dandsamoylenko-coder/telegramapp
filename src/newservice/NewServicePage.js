import React, { useState } from "react";

export default function NewServicePage() {
    const [name, setName] = useState("");
    const [duration, setDuration] = useState(30); // в минутах
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    // Кнопка "Сохранить" активна только если есть название, цена и длительность
    const canSave = name.trim() && price && duration;

    const handleSave = () => {
        // Здесь отправка на бэк
        console.log({
            name,
            duration,
            price,
            description,
        });
        alert(`Услуга "${name}" добавлена!`);

        // Сброс формы
        setName("");
        setDuration(30);
        setPrice("");
        setDescription("");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Создать услугу</h1>

                {/* Название */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Название</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите название услуги"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Длительность */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Длительность услуги</label>
                    <input
                        type="range"
                        min={5}
                        max={180}
                        step={5}
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full accent-blue-600"
                    />
                    <p className="text-gray-600 text-sm">
                        Выбрана длительность: <span className="font-medium">{duration} минут</span>
                    </p>
                </div>

                {/* Цена */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Цена</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Введите цену услуги"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {price && <p className="text-gray-600">{price} ₽</p>}
                </div>

                {/* Описание */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Описание</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Введите описание услуги"
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Кнопка сохранить */}
                {canSave && (
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Сохранить
                    </button>
                )}
            </div>
        </div>
    );
}
