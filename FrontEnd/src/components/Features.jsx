import React from 'react';
import { UploadCloud, BarChart2, FileSearch } from 'lucide-react';

export default function Features({ darkMode, t }) {
  const cardBg = darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-gray-100 border-gray-200';
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <section className="px-6 max-w-5xl mx-auto text-center my-16">
      <h2 className="text-2xl font-bold mb-4">{t.featureIntro}</h2>
      <p className={`text-sm mb-10 ${textMuted}`}>{t.featureDesc}</p>

      <div className="grid md:grid-cols-3 gap-6">
        {[UploadCloud, BarChart2, FileSearch].map((Icon, i) => (
          <div key={i} className={`rounded-xl p-6 border ${cardBg}`}>
            <Icon className="w-8 h-8 mb-3 mx-auto" />
            <h4 className="font-semibold text-lg">{t.steps[i]}</h4>
            <p className={`text-sm mt-1 ${textMuted}`}>Step-by-step guidance through evaluation</p>
          </div>
        ))}
      </div>
    </section>
  );
}
