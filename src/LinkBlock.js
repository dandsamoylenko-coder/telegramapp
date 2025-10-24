import React, { useState } from "react";

const LinkBlock = () => {
    const [copied, setCopied] = useState(false);
    const link = "https://t.me/precall_bot/book?startapp=5MzNppbQrGK071yP1rnWZC";

    const handleCopy = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-6 p-4 bg-white rounded-2xl shadow-md w-full max-w-md flex flex-col gap-2">
            <h2 className="text-lg font-bold text-gray-900">Ссылка</h2>
            <p className="text-gray-600 text-sm mb-2">На все услуги</p>
            <div className="flex items-center justify-between border border-gray-300 rounded-lg p-2">
                <span className="text-blue-600 truncate">{link}</span>
                <button
                    className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                    onClick={handleCopy}
                >
                    {copied ? "Скопировано" : "Копировать"}
                </button>
            </div>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-blue-600 text-sm font-medium hover:underline"
            >
                Посмотреть →
            </a>
        </div>
    );
};

export default LinkBlock;