import React from 'react';
import { UploadCloud, BarChart2, FileSearch } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeatureIntro({ t, cardBg, textMuted }) {
  const icons = [UploadCloud, BarChart2, FileSearch];
  return (
    <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 mb-20">
      {icons.map((Icon, i) => (
        <motion.div key={i} className={`rounded-xl shadow-md p-6 text-center border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${cardBg}`}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 * i }}>
          <Icon className="w-8 h-8 mb-2" />
          <h3 className="text-lg font-semibold mb-1">{t.steps[i]}</h3>
          <p className={`text-sm ${textMuted}`}>{t.guide}</p>
        </motion.div>
      ))}
    </section>
  );
}
