import React, {useEffect, useState} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import Modal from "./Modal";
import ReactCalendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import SettingsPage from "../setting/SettingsPage";
import NewServicePage from "../newservice/NewServicePage";
import '../maincss/MyCalendar.css';
import "../maincss/LinkCard.css";
import '../maincss/App.css'


export default function App() {


    const [modalData, setModalData] = useState(null);
    const [user, setUser] = useState(null); // <-- состояние для пользователя

    useEffect(() => {
        let userId = 123456; // тестовый Telegram ID для локалки

        if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
            userId = window.Telegram.WebApp.initDataUnsafe.user.id;
        }

        fetch(`http://localhost:8080/api/users/${userId}`)
            .then(res => res.json())
            .then(user => setUser(user))
            .catch(err => console.error(err));
    }, []);


    // 1. Заголовок
    const StepItem = ({ number, title, onClick }) => {
        return (
            <div className="blockpodskazka">
                {/* Номер шага */}
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full flex-shrink-0">{number}.</span>

                {/* Текст шага */}
                <span className="text-gray-900 font-medium text-base flex-1"> {title} </span>

                {/* Иконка помощи с кликом */}
                <span className="ikonka"
                    onClick={onClick}
                >
                    <ion-icon name="help-circle-outline" className="text-green-600 w-6 h-6"></ion-icon>
                </span>
            </div>
        );
    };

    // 3. Линк блок
    const LinkBlock = () => {
        const [copied, setCopied] = useState(false);
        const link = "https://t.me/precall_bot/book?startapp=5MzNppbQrGK071yP1rnWZC";

        const handleCopy = () => {
            navigator.clipboard.writeText(link);
            setCopied(true);
        };

        return (
            <div>
                <h2 className="link-block-title">Ссылка</h2>
                <p className="link-block-subtitle">На все услуги</p>

                <div className="link-row">
                    <span className="link-text">{link}</span>

                    <button className="link-block-button" onClick={handleCopy}>
                        <ion-icon
                            name={copied ? "checkmark-outline" : "document-text-outline"}
                        ></ion-icon>
                    </button>
                </div>

                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-view"
                >
                    Посмотреть →
                </a>
            </div>
        );
    };

    // 4. Блок Календаря
    const MyCalendar = () => {
        const [date, setDate] = useState(new Date());

        return (
            <div className="mt-6 p-4 bg-white rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Выберите дату и время</h2>
                <p className="text-gray-600 text-sm mb-4">
                    Выберите подходящие окошки для записи.
                </p>
                <div className="calendar-container">
                    <ReactCalendar
                        onChange={setDate}
                        value={date}
                        className="react-calendar"
                    />
                </div>

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

    // 5. Рассписание
    const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    const Schedule = () => {
        const [showDays, setShowDays] = useState(false);
        const [schedule, setSchedule] = useState([]);
        const [selectedDays, setSelectedDays] = useState([]); // теперь массив выбранных дней
        const [fromTime, setFromTime] = useState("");
        const [toTime, setToTime] = useState("");

        const handleToggleDay = (day) => {
            if (selectedDays.includes(day)) {
                setSelectedDays(selectedDays.filter((d) => d !== day));
            } else {
                setSelectedDays([...selectedDays, day]);
            }
        };

        const handleAddTime = () => {
            if (selectedDays.length === 0 || !fromTime || !toTime) return;

            // создаём по записи для каждого выбранного дня
            const newEntries = selectedDays.map((day) => ({
                day,
                from: fromTime,
                to: toTime,
            }));

            setSchedule([...schedule, ...newEntries]);
            setSelectedDays([]);
            setFromTime("");
            setToTime("");
        };

        const handleRemove = (index) => {
            setSchedule(schedule.filter((_, i) => i !== index));
        };

        return (
            <div className="mt-6 p-4 bg-white rounded-2xl shadow-md w-full max-w-md flex flex-col gap-4">
                <h2 className="text-lg font-bold text-gray-900">Расписание</h2>

                {/* Кнопка "Добавить" */}
                {!showDays && (
                    <button
                        onClick={() => setShowDays(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition self-start"
                    >
                        Добавить
                    </button>
                )}

                {/* Блок выбора дней недели */}
                {showDays && (
                    <>
                        <div className="flex justify-between gap-1 flex-wrap">
                            {weekdays.map((day) => (
                                <button
                                    key={day}
                                    onClick={() => handleToggleDay(day)}
                                    className={`day-button ${
                                        selectedDays.includes(day) ? "day-button-active" : ""
                                    }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>

                        {/* Форма выбора времени */}
                        {selectedDays.length > 0 && (
                            <div className="flex items-center gap-2 mt-3 flex-wrap">
                                <input
                                    type="time"
                                    value={fromTime}
                                    onChange={(e) => setFromTime(e.target.value)}
                                    className="border border-gray-300 rounded-lg p-1 w-24"
                                />
                                <input
                                    type="time"
                                    value={toTime}
                                    onChange={(e) => setToTime(e.target.value)}
                                    className="border border-gray-300 rounded-lg p-1 w-24"
                                />
                                <button
                                    onClick={handleAddTime}
                                    className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
                                >
                                    Сохранить
                                </button>
                            </div>
                        )}

                        {/* Список добавленных интервалов */}
                        <ul className="flex flex-col gap-2 mt-2">
                            {schedule.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center border-b border-gray-200 pb-1"
                                >
                                    <span className="text-gray-700 font-medium">{item.day}</span>
                                    <span className="text-gray-600 text-sm">
                  {item.from} — {item.to}
                </span>
                                    <button
                                        onClick={() => handleRemove(index)}
                                        className="text-red-500 hover:text-red-700 font-bold ml-2"
                                    >
                                        ×
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        );
    };


    // 6. Сервис
    const Services = () => {
        const [services, setServices] = useState([]);
        const navigate = useNavigate();

        useEffect(() => {
            // Имитация загрузки данных
            setTimeout(() => setServices(["Бизнес", "Уроки"]), 300);
        }, []);

        const handleAddService = () => {
            // Переход на другую страницу
            navigate("/new-service");
        };

        return (
            <div className="mt-6 bg-white rounded-2xl shadow-md p-4 w-full max-w-md">
                {/* Заголовок */}
                <h2 className="text-lg font-bold text-gray-900 mb-3">Услуги</h2>

                {/* Все в одну строку */}
                <div className="flex items-center gap-3 flex-nowrap overflow-x-auto whitespace-nowrap">
                    {services.map((service, index) => (
                        <span key={index} className="px-3 py-1 border border-gray-300 rounded-lg text-gray-800 text-sm bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
                        > {service} </span>
                    ))}
                    <button
                        onClick={handleAddService}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition flex-shrink-0"
                    >Добавить</button>
                </div>
                {/* Ссылка "Настройки →" */}
                <div className="flex justify-end">
                    <button
                        onClick={() => navigate("/settings")} // ✅ теперь navigate работает
                        className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
                    >
                        Настройки →
                    </button>
                </div>
            </div>
        );
    };

    const steps = [
        {
            number: 1,
            title: "Создайте услугу",
            modalTitle: "Создайте услугу",
            modalText:
                "Добавьте описание и цену вашей услуги, чтобы клиенты могли выбрать подходящий вариант.",
        },
        {
            number: 2,
            title: "Настройте доступность",
            modalTitle: "Настройте доступность",
            modalText:
                "Выберите дни и часы, когда вы готовы принимать клиентов — система покажет только доступные окна.",
        },
        {
            number: 3,
            title: "Поделитесь ссылкой",
            modalTitle: "Поделитесь ссылкой",
            modalText:
                "Скопируйте персональную ссылку и отправьте клиентам, чтобы они могли записаться онлайн.",
        },
    ];

    return (
        <Routes>
            {/* Главная страница */}
            <Route
                path="/"
                element={
                    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6 gap-6">
                        {/* Как начать */}
                        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                Как начать
                            </h1>
                            {steps.map((step) => (
                                <StepItem
                                    key={step.number}
                                    number={step.number}
                                    title={step.title}
                                    onClick={() =>
                                        setModalData({
                                            title: step.modalTitle,
                                            text: step.modalText,
                                        })
                                    }
                                />
                            ))}
                        </div>

                        {/* Мои записи */}
                        <div className="mt-8 p-6 bg-white rounded-2xl shadow-md w-full max-w-md">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Мои записи</h2>
                            <p className="text-gray-600 text-sm">
                                Записей пока нет — поделитесь с кем-нибудь ссылкой!
                                {user ? `Привет, ${user.username}!` : "Загрузка пользователя..."}
                            </p>
                        </div>

                        <LinkBlock />
                        <MyCalendar />
                        <Schedule />
                        <Services />
                        {modalData && (
                            <Modal
                                title={modalData.title}
                                text={modalData.text}
                                onClose={() => setModalData(null)}
                            />
                        )}
                    </div>
                }
            />

            {/* Страница настроек */}
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/new-service" element={<NewServicePage />} />
        </Routes>
    );
}
