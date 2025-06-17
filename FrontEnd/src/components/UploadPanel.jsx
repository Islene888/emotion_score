// src/components/UploadAndAnalyze.jsx
import React, { useRef, useState } from 'react';
import { Button, message, Progress } from 'antd';
import axios from 'axios';

export default function UploadAndAnalyze() {
  const fileInputRef = useRef();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/api/upload', formData);
      message.success('上传成功，开始分析...');
      triggerAnalysis();
    } catch (err) {
      message.error('上传失败');
    }
  };

  const triggerAnalysis = async () => {
    setIsAnalyzing(true);
    setProgress(0);

    try {
      await axios.post('/api/analyze');
      const timer = setInterval(async () => {
        const res = await axios.get('/api/progress');
        setProgress(res.data.progress);
        if (res.data.progress >= 100) {
          clearInterval(timer);
          message.success('分析完成');
          setIsAnalyzing(false);
        }
      }, 1000);
    } catch (err) {
      message.error('分析失败');
      setIsAnalyzing(false);
    }
  };

  return (
    <div>
      <input type="file" hidden ref={fileInputRef} onChange={handleUpload} />
      <Button
        type="primary"
        size="large"
        onClick={() => fileInputRef.current.click()}
        style={{
          background: 'linear-gradient(to right, #4f46e5, #9333ea)',
          border: 'none',
          borderRadius: '12px',
          fontWeight: 'bold'
        }}
      >
        Upload Now →
      </Button>
      {isAnalyzing && (
        <Progress percent={progress} status={progress < 100 ? 'active' : 'success'} />
      )}
    </div>
  );
}
