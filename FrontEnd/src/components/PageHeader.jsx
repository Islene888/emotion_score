import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function PageHeader() {
  return (
    <div style={{ textAlign: 'center', marginBottom: 40 }}>
      <Title level={1} style={{ fontWeight: 900, fontSize: 38, color: '#233556' }}>
        多模型对话自动评测平台
      </Title>
      <Paragraph style={{ fontSize: 18, color: '#555' }}>
        一键上传 / 粘贴聊天日志，自动生成模型质量报告
      </Paragraph>
    </div>
  );
}
