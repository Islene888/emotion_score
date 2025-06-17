import React from 'react';

export default function Footer({ darkMode }) {
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200';

  return (
    <footer className={`py-6 text-center text-sm ${textMuted} ${cardBg} border-t`}>
      © {new Date().getFullYear()} Model Judge · Powered by <a href="https://github.com/Islene888/EmotionEval" className="text-blue-500 hover:underline">GitHub</a>
    </footer>
  );
}
