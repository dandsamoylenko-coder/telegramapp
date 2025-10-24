import React, { useState } from "react";
import StepItem from "./StepItem";
import Modal from "./Modal";
import LinkBlock from "./LinkBlock";
import Calendar from "./Calendar";
import Schedule from "./Schedule";

export default function App() {
    const [modalData, setModalData] = useState(null);

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
        <div className="min-h-screen flex justify-center bg-gray-50 p-6">
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
                </p>
            </div>

            {/* Блок ссылки */}
            <LinkBlock />
            {/* Календарь / окошки для записи */}
            <Calendar />

            <Schedule />
            {modalData && (
                <Modal
                    title={modalData.title}
                    text={modalData.text}
                    onClose={() => setModalData(null)}
                />
            )}
        </div>
    );
}
