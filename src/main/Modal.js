import React from "react";
import ReactDOM from "react-dom";
import "../maincss/Modal.css"

const Modal = ({ title, text, onClose }) => {
    return ReactDOM.createPortal(
        <div
            className="modal-overlay"
            onClick={onClose} // закрытие при клике по затемнению
        >
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()} // отменяем закрытие при клике внутрь
            >
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
                <p className="text-sm text-gray-600 mb-4">{text}</p>
                <button
                    onClick={onClose}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                    Закрыть
                </button>
            </div>
        </div>,
        document.querySelector("#modal")
    );
};

export default Modal;