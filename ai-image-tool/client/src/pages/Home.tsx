import React, { useState } from 'react';
import { Layout, Button, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import ImageUpload from '../components/ImageUpload';
import CompressionSettings from '../components/CompressionSettings';
import type { CompressionSettings as Settings } from '../components/CompressionSettings';
import ImageCompare from '../components/ImageCompare';
import { compressImage } from '../api/imageApi';

const { Content } = Layout;

const Home: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [compressedImage, setCompressedImage] = useState<string>('');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [compressedDimensions, setCompressedDimensions] = useState({ width: 0, height: 0 });
  const [compressionSettings, setCompressionSettings] = useState<Settings>({
    quality: 80,
    maxWidth: 1920,
    maxHeight: 1080,
  });
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUploadSuccess = async (file: File) => {
    try {
      setCurrentFile(file);
      // 创建原图预览URL
      const originalUrl = URL.createObjectURL(file);
      setOriginalImage(originalUrl);
      setOriginalSize(file.size);

      // 获取图片尺寸
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({
          width: img.width,
          height: img.height,
        });
      };
      img.src = originalUrl;

      // 压缩图片
      await handleCompress(file, compressionSettings);
    } catch (error: unknown) {
      console.error('图片处理失败:', error);
      message.error('图片处理失败');
    }
  };

  const handleSettingsChange = async (settings: Settings) => {
    setCompressionSettings(settings);
    if (currentFile) {
      await handleCompress(currentFile, settings);
    }
  };

  const handleCompress = async (file: File, settings: Settings) => {
    try {
      setLoading(true);
      const compressedImageUrl = await compressImage(file, settings);
      setCompressedImage(compressedImageUrl);

      // 获取压缩后图片的尺寸
      const img = new Image();
      img.onload = () => {
        setCompressedDimensions({
          width: img.width,
          height: img.height,
        });
      };
      img.src = compressedImageUrl;

      // 计算压缩后图片的大小
      const response = await fetch(compressedImageUrl);
      const blob = await response.blob();
      setCompressedSize(blob.size);
    } catch (error: unknown) {
      console.error('图片压缩失败:', error);
      message.error('图片压缩失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!compressedImage) {
      message.warning('请先上传并压缩图片');
      return;
    }

    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = 'compressed-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout style={{ minHeight: '100vh', padding: '24px' }}>
      <Content style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <ImageUpload onUploadSuccess={handleUploadSuccess} />
        <CompressionSettings onSettingsChange={handleSettingsChange} />
        {originalImage && compressedImage && (
          <>
            <ImageCompare
              originalImage={originalImage}
              compressedImage={compressedImage}
              originalSize={originalSize}
              compressedSize={compressedSize}
              originalDimensions={originalDimensions}
              compressedDimensions={compressedDimensions}
            />
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              loading={loading}
              style={{ marginTop: 16 }}
            >
              下载压缩后的图片
            </Button>
          </>
        )}
      </Content>
    </Layout>
  );
};

export default Home; 