import React from 'react';
import UploadAndAnalyze from './UploadAndAnalyze';

export default function Hero({ t, isLoading, setIsLoading, progress, setProgress, darkMode }) {
  // 根据主题决定背景样式
  const bgClass = darkMode
    ? 'bg-gradient-to-br from-[#0f0f1b] via-[#0a0a17] to-black text-white'
    : 'bg-gradient-to-br from-white via-gray-100 to-gray-200 text-black';

  return (
    <header className={`relative overflow-hidden pt-36 pb-32 text-center ${bgClass}`}>
      <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">{t.title}</h2>

      <h3 className="mt-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        {t.subtitle}
      </h3>

      <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
        {t.helper}
      </p>

      <div className="mt-10">
        <UploadAndAnalyze
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          progress={progress}
          setProgress={setProgress}
        />
      </div>

      {isLoading && (
        <div className="mt-4 w-80 mx-auto bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-400 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </header>
  );
}
