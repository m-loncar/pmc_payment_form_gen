import { useEffect, useState } from "react";

export default function HandleDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode will be enabled by default

    useEffect(() => {
        // Switched to using if else so I can set the default
        // document.body.classList.toggle("dark-mode");
        if (isDarkMode) {
            document.body.classList.add("dark-mode");
        }
        else {
            document.body.classList.remove("dark-mode");
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    return { isDarkMode, toggleDarkMode };
}
