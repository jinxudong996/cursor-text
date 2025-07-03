import React from 'react';
import { Form, Slider, InputNumber, Space, Card } from 'antd';

interface CompressionSettingsProps {
  onSettingsChange: (settings: CompressionSettings) => void;
}

export interface CompressionSettings {
  quality: number;
  maxWidth: number;
  maxHeight: number;
}

const CompressionSettings: React.FC<CompressionSettingsProps> = ({
  onSettingsChange,
}) => {
  const [form] = Form.useForm();

  const handleValuesChange = (_: any, allValues: CompressionSettings) => {
    onSettingsChange(allValues);
  };

  return (
    <Card title="压缩设置" style={{ marginBottom: 16 }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          quality: 80,
          maxWidth: 1920,
          maxHeight: 1080,
        }}
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          label="压缩质量"
          name="quality"
          tooltip="值越小，压缩率越高，图片质量越低"
        >
          <Slider
            min={1}
            max={100}
            marks={{
              1: '1%',
              25: '25%',
              50: '50%',
              75: '75%',
              100: '100%',
            }}
          />
        </Form.Item>

        <Form.Item label="最大宽度" name="maxWidth">
          <InputNumber
            min={1}
            max={10000}
            style={{ width: '100%' }}
            placeholder="请输入最大宽度"
          />
        </Form.Item>

        <Form.Item label="最大高度" name="maxHeight">
          <InputNumber
            min={1}
            max={10000}
            style={{ width: '100%' }}
            placeholder="请输入最大高度"
          />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CompressionSettings; 