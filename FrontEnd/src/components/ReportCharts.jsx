import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

export default function ReportCharts({ t, cardBg, darkMode, barData, radarData }) {
  return (
    <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6 mb-24">
      <motion.div className={`rounded-2xl shadow p-6 border ${cardBg}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="text-lg font-semibold mb-4">{t.barTitle}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#333' : '#ddd'} />
            <XAxis dataKey="metric" stroke={darkMode ? '#aaa' : '#444'} />
            <YAxis domain={[0, 1]} stroke={darkMode ? '#aaa' : '#444'} />
            <Tooltip />
            <Legend />
            <Bar dataKey="modelA" fill="#3b82f6" name="模型A" radius={[8, 8, 0, 0]} />
            <Bar dataKey="modelB" fill="#f97316" name="模型B" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div className={`rounded-2xl shadow p-6 border ${cardBg}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="text-lg font-semibold mb-4">{t.radarTitle}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart outerRadius={100} data={radarData}>
            <PolarGrid stroke={darkMode ? '#333' : '#ddd'} />
            <PolarAngleAxis dataKey="metric" stroke={darkMode ? '#aaa' : '#444'} />
            <PolarRadiusAxis angle={30} domain={[0, 1]} stroke={darkMode ? '#aaa' : '#444'} />
            <Radar name="模型A" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
            <Radar name="模型B" dataKey="B" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
    </section>
  );
}
