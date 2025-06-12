import { useTheme } from "../hook/useTheme";

export default function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className='fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow'>
            <h1 className='text-xl font-bold'>Tailwind CSS Playground</h1>
            <button
                onClick={toggleTheme}
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
            >
                {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>
        </header>
    );
}
