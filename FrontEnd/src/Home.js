import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Features from './components/Features';
import Steps from './components/Steps';
import Charts from './components/Charts';
import Footer from './components/Footer';
import TryDemoPanel from './components/TryDemoPanel';

// === labels 放到函数外部！===
const labels = {
  zh: {
    title: '多模型对话自动评估平台',
    desc: '上传日志，生成对比报告，洞察模型表现',
    uploadNow: '立即上传日志 →',
    steps: ['上传数据', '自动分析', '查看报告'],
    guide: '系统将指导你逐步完成评估流程',
    barTitle: '模型指标柱状图',
    radarTitle: '模型表现雷达图',
    featureIntro: '平台功能介绍',
    featureDesc: '本平台支持上传 JSON / CSV 聊天日志，自动接入数仓系统分析用户行为，生成模型表现图表、关键词覆盖率、情绪提升趋势等报告。同时提供试用样例，适配 A/B 测试数据结构。',
    subtitle: '直观理解模型表现',
    helper: '上传聊天日志，快速生成指标图表、情绪提升趋势、关键词覆盖报告',
    radarMetrics: ['情绪提升', '增益', '会话数'],
    demoPanelTitle: '在线体验评估系统',
    demoPanelDesc: '粘贴一段对话日志 JSON，或使用右上角按钮。',
    insertSample: '插入示例',
    analyzeBtn: '开始分析',
    barMetrics: ['F1', 'Precision', 'Recall']
  },
  en: {
    title: 'Multi-Model Dialogue Evaluation Platform',
    desc: 'Upload logs, auto-generate visual reports and insights',
    uploadNow: 'Upload Now →',
    steps: ['Upload Logs', 'Auto Analysis', 'View Report'],
    guide: 'Step-by-step guidance through evaluation',
    barTitle: 'Model Score Bar Chart',
    radarTitle: 'Model Performance Radar',
    featureIntro: 'Platform Function Overview',
    featureDesc: 'This platform supports uploading JSON/CSV chat logs, automatically connects to data warehouse systems for user behavior analysis, and generates reports such as model performance charts, keyword coverage, and sentiment improvement trends. Trial samples are provided and A/B test data structures are supported.',
    subtitle: 'Understand Model Performance Intuitively',
    helper: 'Upload your dialogue logs. Instantly visualize performance metrics, emotional uplift, and keyword coverage.',
    radarMetrics: ['Emotion Uplift', 'Gain', 'Conversations'],
    demoPanelTitle: 'Online Evaluation System',
    demoPanelDesc: 'Paste a dialogue log in JSON, or use the button in the top right.',
    insertSample: 'Insert Example',
    analyzeBtn: 'Analyze',
    barMetrics: ['F1', 'Precision', 'Recall']
  }
};

export default function Home() {
  const initLang = localStorage.getItem('lang') || 'zh';
  const initMode = localStorage.getItem('darkMode') !== 'false'; // true 默认黑色主题

  const [lang, setLang] = useState(initLang);
  const [darkMode, setDarkMode] = useState(initMode);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const t = labels[lang];

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // 重点：切换 dark mode 时，操作 <html class="dark">
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    let timer;
    if (isLoading && progress < 100) {
      timer = setInterval(() => {
        setProgress((prev) => Math.min(100, prev + Math.random() * 10));
      }, 800);
    }
    return () => clearInterval(timer);
  }, [isLoading, progress]);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <NavBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        lang={lang}
        setLang={setLang}
        t={t}
      />
      <Hero
        t={t}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        progress={progress}
        setProgress={setProgress}
        darkMode={darkMode}
      />
      <Steps darkMode={darkMode} t={t} />
      <TryDemoPanel t={t} />
      <Charts darkMode={darkMode} t={t} />
      <Footer darkMode={darkMode} />
    </div>
  );
}
