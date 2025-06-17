import React from 'react';
import { Table, Divider } from 'antd';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList
} from 'recharts';

const summaryColumns = [
  { title: '模型', dataIndex: 'model_version', key: 'model_version', align: 'center' },
  { title: '平均F1', dataIndex: 'f1_avg', key: 'f1_avg', align: 'center', render: v => v?.toFixed(4) },
  { title: 'Precision', dataIndex: 'precision_avg', key: 'precision_avg', align: 'center', render: v => v?.toFixed(4) },
  { title: 'Recall', dataIndex: 'recall_avg', key: 'recall_avg', align: 'center', render: v => v?.toFixed(4) },
  { title: '情绪提升', dataIndex: 'emotion_slope', key: 'emotion_slope', align: 'center', render: v => v?.toFixed(4) },
  { title: '增益', dataIndex: 'cumulative_gain', key: 'cumulative_gain', align: 'center', render: v => v?.toFixed(4) },
  { title: '会话数', dataIndex: 'count', key: 'count', align: 'center' },
];

const chartMetrics = [
  { key: 'f1_avg', name: '平均F1', color: '#4a90e2' },
  { key: 'precision_avg', name: 'Precision', color: '#8bc34a' },
  { key: 'recall_avg', name: 'Recall', color: '#ffc107' },
  { key: 'emotion_slope', name: '情绪提升', color: '#ff6f91' },
];

export default function ReportSummary({ summary }) {
  return (
    <>
      <Divider orientation="left">汇总统计</Divider>
      <Table
        columns={summaryColumns}
        dataSource={summary}
        rowKey={r => r.model_version}
        pagination={false}
        bordered
        style={{ marginBottom: 40, background: '#fff', borderRadius: 16 }}
      />
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={summary} margin={{ top: 30, right: 40, left: 10, bottom: 10 }}>
          <XAxis dataKey="model_version" />
          <YAxis />
          <Tooltip />
          <Legend />
          {chartMetrics.map(m => (
            <Bar key={m.key} dataKey={m.key} name={m.name} fill={m.color} barSize={28} radius={[8, 8, 0, 0]}>
              <LabelList dataKey={m.key} position="top" formatter={v => v?.toFixed(2)} />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
