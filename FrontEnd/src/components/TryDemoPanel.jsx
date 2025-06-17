import React, { useState } from 'react';
import { Button, message } from 'antd';
import { CodeOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import AnalysisResult from './AnalysisResult'; // 顶部导入

const sampleJson = {
  session_id: 'demo-001',
  model_version: 'v1',
  dialogue: [
    { user_input: 'Hi, how are you?', bot_reply: "I'm good! How can I assist?" },
    { user_input: 'Can you help me with my order?', bot_reply: 'Sure, please provide the order number.' }
  ]
};

export default function TryDemoPanel({ t }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setAnalysisResult(null);
    try {
      const json = JSON.parse(input);
      const res = await axios.post('http://3.145.37.189:8000/evaluate/json', { data: json });
      message.success(t.analyzeSuccess || '分析完成！');
      setAnalysisResult(res.data);
    } catch (err) {
      message.error(t.analyzeError || '请检查 JSON 格式是否正确');
      setAnalysisResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInsertSample = () => {
    setInput(JSON.stringify(sampleJson, null, 2));
    message.info(t.sampleInserted || '已插入示例代码');
  };

  return (
    <section className="mt-10 mb-16 px-4 flex justify-center">
      <div className="w-full max-w-6xl bg-white dark:bg-neutral-900 text-black dark:text-white p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-800">

        {/* 标题行 */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            🧪 {t.demoPanelTitle}
          </h2>
          <Button
            type="dashed"
            size="small"
            icon={<CodeOutlined />}
            onClick={handleInsertSample}
          >
            {t.insertSample}
          </Button>
        </div>

        {/* 引导文字 */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {t.demoPanelDesc}
        </p>

        {/* 自定义 TextArea */}
        <textarea
          rows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.demoPanelPlaceholder || "请输入聊天 JSON 对话日志..."}
          className="w-full font-mono text-sm leading-relaxed rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 p-3 resize-none"
        />

        {/* 按钮 */}
        <div className="mt-6 text-center">
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={handleAnalyze}
            icon={loading ? <LoadingOutlined /> : null}
            className="px-10 rounded-xl"
          >
            {t.analyzeBtn}
          </Button>
        </div>

        {/* 分析结果展示（只显示图表和表格，不显示 JSON） */}
        {analysisResult && <AnalysisResult result={analysisResult} />}
      </div>
    </section>
  );
}
