// src/components/UsageSteps.jsx
import React from 'react';
import { Steps, Divider } from 'antd';

const { Step } = Steps;

export default function UsageSteps({ currentStep = 0 }) {
  return (
    <>
      <Divider orientation="left">使用流程</Divider>
      <Steps current={currentStep} style={{ marginBottom: 40 }}>
        <Step title="上传或粘贴数据" description="支持 JSON / CSV 文件上传，或直接粘贴聊天内容" />
        <Step title="自动分析" description="平台自动解析并生成对比结果" />
        <Step title="查看报告" description="可视化呈现 F1、Precision、情绪趋势等指标" />
      </Steps>
    </>
  );
}
