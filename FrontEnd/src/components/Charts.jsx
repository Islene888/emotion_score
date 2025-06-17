import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

export default function Charts({ darkMode, t }) {
  const cardBg = darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200';
  const strokeColor = darkMode ? '#aaa' : '#444';
  const gridColor = darkMode ? '#333' : '#ddd';

  const barData = t.barMetrics.map((metric, index) => ({
    metric,
    modelA: [0.83, 0.81, 0.85][index],
    modelB: [0.77, 0.73, 0.82][index],
  }));

  const radarData = t.radarMetrics.map((metric, index) => ({
    metric,
    A: [0.62, 0.76, 0.84][index],
    B: [0.68, 0.62, 0.20][index],
  }));

  return (
    <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6 mb-24">
      {/* Bar Chart */}
      <motion.div className={`rounded-2xl shadow p-6 border ${cardBg}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="text-lg font-semibold mb-4">{t.barTitle}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="metric" stroke={strokeColor} />
            <YAxis domain={[0, 1]} stroke={strokeColor} />
            <Tooltip />
            <Legend />
            <Bar dataKey="modelA" fill="#3b82f6" name={t.modelA} radius={[8, 8, 0, 0]} />
            <Bar dataKey="modelB" fill="#f97316" name={t.modelB} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Radar Chart */}
      <motion.div className={`rounded-2xl shadow p-6 border ${cardBg}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="text-lg font-semibold mb-4">{t.radarTitle}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart outerRadius="80%" data={radarData}>
            <PolarGrid stroke={gridColor} />
            <PolarAngleAxis dataKey="metric" stroke={strokeColor} />
            <PolarRadiusAxis angle={30} domain={[0, 1]} stroke={strokeColor} />
            <Radar name={t.modelA} dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
            <Radar name={t.modelB} dataKey="B" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
            <Tooltip />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
    </section>
  );
}
