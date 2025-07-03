import React, { useCallback } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload';

const { Dragger } = Upload;

interface ImageUploadProps {
  onUploadSuccess: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess }) => {
  const beforeUpload = useCallback((file: RcFile) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('只能上传图片文件！');
      return false;
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('图片大小不能超过10MB！');
      return false;
    }
    return true;
  }, []);

  const handleChange: UploadProps['onChange'] = useCallback((info) => {
    const { status } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} 上传成功`);
      onUploadSuccess(info.file.originFileObj as File);
    } else if (status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  }, [onUploadSuccess]);

  return (
    <Dragger
      name="file"
      multiple={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      showUploadList={false}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或拖拽图片到此区域上传</p>
      <p className="ant-upload-hint">
        支持单个图片上传，文件大小不超过10MB
      </p>
    </Dragger>
  );
};

export default ImageUpload; 