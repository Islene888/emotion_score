import React from 'react';
import { Table, Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

export default function AnalysisResult({ result }) {
  // result 结构：{ detail: [...], summary: [...] }
  if (!result) return null;
  const { summary, detail } = result;

  // 1. 柱状图：F1 / Precision / Recall 多模型对比
  const barData = summary.map(item => ({
    model: item.model_version,
    F1: item.f1_avg,
    Precision: item.precision_avg,
    Recall: item.recall_avg
  }));

  // 2. 雷达图：多模型多维度对比
  const radarKeys = [
    { key: 'emotion_slope', label: 'Emotion Uplift' },
    { key: 'cumulative_gain', label: 'Gain' },
    { key: 'avg_bot_sentiment', label: 'Bot Sentiment' },
    { key: 'count', label: 'Conversations' },
  ];
  // 转成雷达格式
  const radarData = radarKeys.map(dim => ({
    metric: dim.label,
    ...Object.fromEntries(summary.map(item => [item.model_version, item[dim.key]]))
  }));

  // 3. 表格列定义
  const columns = [
    { title: 'Model', dataIndex: 'model_version', key: 'model_version' },
    { title: 'F1', dataIndex: 'f1_avg', key: 'f1_avg', render: v => v?.toFixed(4) },
    { title: 'Precision', dataIndex: 'precision_avg', key: 'precision_avg', render: v => v?.toFixed(4) },
    { title: 'Recall', dataIndex: 'recall_avg', key: 'recall_avg', render: v => v?.toFixed(4) },
    { title: 'Emotion Uplift', dataIndex: 'emotion_slope', key: 'emotion_slope', render: v => v?.toFixed(4) },
    { title: 'Gain', dataIndex: 'cumulative_gain', key: 'cumulative_gain', render: v => v?.toFixed(4) },
    { title: 'Bot Sentiment', dataIndex: 'avg_bot_sentiment', key: 'avg_bot_sentiment', render: v => v?.toFixed(4) },
    { title: 'Sessions', dataIndex: 'count', key: 'count' }
  ];

  return (
    <div className="w-full flex flex-wrap gap-6 my-8 justify-center">
      {/* 柱状图 */}
      <Card title="Model Score Bar Chart" className="w-[360px]">
        <BarChart width={320} height={240} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="model" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="F1" fill="#4f46e5" />
          <Bar dataKey="Precision" fill="#06b6d4" />
          <Bar dataKey="Recall" fill="#a78bfa" />
        </BarChart>
      </Card>

      {/* 雷达图 */}
      <Card title="Model Performance Radar" className="w-[360px]">
        <RadarChart outerRadius={90} width={320} height={240} data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis />
          {summary.map((item, idx) => (
            <Radar
              key={item.model_version}
              name={item.model_version}
              dataKey={item.model_version}
              stroke={idx % 2 ? "#f97316" : "#4f46e5"}
              fill={idx % 2 ? "#f97316" : "#4f46e5"}
              fillOpacity={0.4}
            />
          ))}
          <Legend />
        </RadarChart>
      </Card>

      {/* 表格 */}
      <Card title="Model Summary Table" className="w-full">
        <Table
          columns={columns}
          dataSource={summary}
          rowKey="model_version"
          pagination={false}
          bordered
        />
      </Card>
    </div>
  );
}
