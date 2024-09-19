"use client";

import InputField from "./components/InputField";
import SelectField from "./components/SelectField";
import DarkModeToggle from "./components/DarkModeToggle";
import CopyableText from "./components/CopyableText";
import handleDarkMode from "./handlers/DarkModeHandler";
import { generatePaymentNumber, validatePaymentData } from "./handlers/PaymentGenHandler";
import React, { useState } from "react";

export default function Home() {
    const currentYear = new Date().getFullYear();

    const { isDarkMode, toggleDarkMode } = handleDarkMode();
    const [indexNumber, setIndexNumber] = useState("");
    const [typeOfStudies, setType] = useState("1");
    const [enrollmentYear, setYear] = useState(currentYear.toString());
    const [paymentPurpose, setPurpose] = useState("1");
    const [paymentNumber, setPaymentNumber] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null); // Generic validation failed warning message at the bottom of the form

    // Generate a list of years, this list WILL include the starting and current year!
    const startYear = 2015;
    const years = Array.from({ length: currentYear - (startYear - 1) }, (_, i) => (startYear + i).toString());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const [isValid, validationMessage] = validatePaymentData(indexNumber, typeOfStudies, enrollmentYear, paymentPurpose);
        if (!isValid) {
            setValidationError(validationMessage);
            return;
        }

        if (validationMessage && validationMessage.length > 0) {
            setValidationError(validationMessage);
        }

        const generatedPaymentNumber = generatePaymentNumber(indexNumber, typeOfStudies, enrollmentYear, paymentPurpose);
        if (generatedPaymentNumber.length > 9) {
            setValidationError("Poziv na broj je prevelik.");
            return;
        }

        if (!validationMessage || validationMessage.length === 0) {
            setValidationError(null);
        }

        setPaymentNumber(generatedPaymentNumber);
    };

    return (
        <div className="min-h-screen flex items-center justify-center transition-colors duration-500">
            {/* Dark mode toggle */}
            <div className="absolute top-4 right-4">
                <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </div>

            {/* Main container - purple shadow*/}
            <div className="p-8 rounded-lg drop-shadow-[0_0px_10px_rgba(128,90,213,0.75)] max-w-md w-full main-container">
                <h1 className="text-2xl font-bold mb-6 text-center">Generator poziva na broj</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        id="indexNumber"
                        label="Broj indeksa"
                        value={indexNumber}
                        onChange={(e) => setIndexNumber(e.target.value)}
                        placeholder="Unesite broj Vašeg indeksa"
                        maxLength={3}
                        pattern="\d{1,3}" // Numbers only, no more than 3, no less than 1
                        required
                    />

                    <SelectField
                        id="typeOfStudies"
                        label="Stepen studija"
                        value={typeOfStudies}
                        options={[
                            { value: "1", label: "Osnovne akademske studije" },
                            { value: "2", label: "Master akademske studije" },
                            { value: "3", label: "Doktorske akademske studije" },
                        ]}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />

                    <SelectField
                        id="enrollmentYear"
                        label="Godina upisa"
                        value={enrollmentYear}
                        options={years.map((y) => ({ value: y, label: y }))}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />

                    <SelectField
                        id="paymentPurpose"
                        label="Namena uplate"
                        value={paymentPurpose}
                        options={[
                            { value: "1", label: "Školarina" },
                            { value: "2", label: "Troškovi semestra" },
                            { value: "3", label: "Troškovi izdavanja nestandardnih potvrda" },
                            { value: "4", label: "Troškovi izdavanja diploma" },
                            { value: "5", label: "Završni rad/završni master rad" },
                            { value: "6", label: "Troškovi ispisa" },
                            { value: "7", label: "Izdavanje overenog plana i programa" },
                            { value: "8", label: "Prijava ispita" },
                            { value: "9", label: "Ostale uplate" },
                        ]}
                        onChange={(e) => setPurpose(e.target.value)}
                        required
                    />

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 submit-button"
                        >
                            Formiraj poziv na broj
                        </button>
                    </div>

                    {/* Display generated payment number */}
                    {paymentNumber && (
                        <div className="mt-6">
                            <p className="text-lg font-semibold">Poziv na broj:</p>
                            <CopyableText text={paymentNumber} className="text-xl font-bold text-purple-300" />
                        </div>
                    )}

                    {/* Display the validation error/warning message if there is one */}
                    {validationError && (
                        <div className="mt-6">
                            <p className="text-sm text-yellow-300">Upozorenje:</p>
                            {/* I don't want to use whitespace-pre-line since it tends to break on some devices */}
                            {validationError.split('\n').map((line, index) => (
                                <p key={index} className="text-s font-italic text-orange-600">
                                    {line}
                                </p>
                            ))}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
