import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import CompareImage from 'react-compare-image';

interface ImageCompareProps {
  originalImage: string;
  compressedImage: string;
  originalSize: number;
  compressedSize: number;
  originalDimensions: {
    width: number;
    height: number;
  };
  compressedDimensions: {
    width: number;
    height: number;
  };
}

const ImageCompare: React.FC<ImageCompareProps> = ({
  originalImage,
  compressedImage,
  originalSize,
  compressedSize,
  originalDimensions,
  compressedDimensions,
}) => {
  const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

  return (
    <Card title="图片对比" style={{ marginBottom: 16 }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div style={{ height: 400, position: 'relative' }}>
            <CompareImage
              leftImage={originalImage}
              rightImage={compressedImage}
              leftImageLabel="原图"
              rightImageLabel="压缩后"
              sliderLineWidth={2}
              sliderLineColor="#fff"
              handleSize={40}
              hover={true}
            />
          </div>
        </Col>
        <Col span={12}>
          <Card title="原图信息" size="small">
            <Statistic
              title="文件大小"
              value={originalSize}
              suffix="bytes"
              precision={0}
            />
            <Statistic
              title="分辨率"
              value={`${originalDimensions.width} x ${originalDimensions.height}`}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="压缩后信息" size="small">
            <Statistic
              title="文件大小"
              value={compressedSize}
              suffix="bytes"
              precision={0}
            />
            <Statistic
              title="分辨率"
              value={`${compressedDimensions.width} x ${compressedDimensions.height}`}
            />
            <Statistic
              title="压缩率"
              value={compressionRatio}
              suffix="%"
              precision={2}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default ImageCompare; 