import React from 'react';
import { Moon, Sun } from 'lucide-react';

export default function NavBar({ darkMode, setDarkMode, lang, setLang, t }) {
  const bgClass = darkMode ? 'bg-black border-neutral-800' : 'bg-white border-gray-200';
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <nav
      className={`border-b py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full z-50 ${bgClass}`}
    >
      <h1 className="text-xl font-bold">Model Judge</h1>

      <div className="space-x-4 text-sm flex items-center">
        <a href="#" className={`hover:text-blue-500 ${textMuted}`}>{t.steps[0]}</a>
        <a href="#" className={`hover:text-blue-500 ${textMuted}`}>{t.steps[1]}</a>
        <a href="#" className={`hover:text-blue-500 ${textMuted}`}>{t.steps[2]}</a>
        <a href="#" className={`hover:text-blue-500 ${textMuted}`}>Docs</a>

        {/* 切换语言 */}
      <button
        onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
        className="
          ml-3 px-2 py-1 text-xs border
          rounded
          bg-white dark:bg-neutral-900
          text-black dark:text-white
          border-gray-300 dark:border-neutral-700
          hover:text-blue-500
          transition
        "
      >
        {lang === 'zh' ? 'EN' : '中文'}
      </button>


        {/* 切换黑白主题 */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </button>
      </div>
    </nav>
  );
}
