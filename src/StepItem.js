import React from "react";

const StepItem = ({ number, title, onClick }) => {
    return (
        <div className="flex items-center justify-start gap-3 mb-4">
            {/* Номер шага */}
            <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full flex-shrink-0">{number}.</span>

            {/* Текст шага */}
            <span className="text-gray-900 font-medium text-base flex-1"> {title} </span>

            {/* Кнопка ? */}
            <button
                className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 text-xs font-bold hover:bg-gray-100"
                onClick={onClick}
            >?</button>
        </div>
    );
};

export default StepItem;
