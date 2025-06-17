import React, { useRef, useState } from 'react';
import { Button, message, Progress } from 'antd';
import axios from 'axios';
import AnalysisResult from './AnalysisResult'; // 确保路径正确

export default function UploadAndAnalyze({ isLoading, setIsLoading, progress, setProgress }) {
  const fileInputRef = useRef();
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);
    setProgress(0);
    setAnalysisResult(null);

    try {
      // 上传文件并自动分析，返回结果
      const res = await axios.post('http://3.145.37.189:8000/evaluate/file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }});

      message.success('上传并分析完成！');
      setProgress(100);
      setAnalysisResult(res.data);  // 保存分析结果用于展示
    } catch (err) {
      message.error('上传或分析失败');
      setProgress(0);
      setAnalysisResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input type="file" hidden ref={fileInputRef} onChange={handleUpload} />
      <Button
        type="primary"
        size="large"
        loading={isLoading}
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
      {/* 进度条 */}
      {/*<div style={{ marginTop: 16, maxWidth: 400 }}>*/}
      {/*  {progress > 0 && <Progress percent={progress} status={progress < 100 ? 'active' : 'success'} />}*/}
      {/*</div>*/}
      {/* 分析结果图表化展示 */}
      {analysisResult && <AnalysisResult result={analysisResult} />}
      {/* 原始 JSON 展示已删除 */}
    </div>
  );
}
