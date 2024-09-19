import React, { useState } from 'react';

interface CopyableTextProperties {
    text: string;
    className?: string;
}

const CopyableText: React.FC<CopyableTextProperties> = ({ text, className = "" }) => {
    const [copied, setCopied] = useState<boolean>(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000); // Hide notif after 2s
        } catch (err) {
            console.error("Unable to copy to clipboard: ", err);
        }
    };

    // Notification at the top center of the screen
    return (
        <div>
            <p
                className={`cursor-pointer ${className}`}
                onClick={copyToClipboard}
            >
                {text}
            </p>

            {copied && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 p-2 bg-green-500 text-white text-sm rounded-lg z-50">
                    Tekst kopiran
                </div>
            )}
        </div>
    );
};

export default CopyableText;
