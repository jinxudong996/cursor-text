import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import { logger } from "../utils/logger";

interface CompressionOptions {
  quality: number;
  maxWidth: number;
  maxHeight: number;
}

export async function compressImage(
  inputPath: string,
  options: CompressionOptions
): Promise<string> {
  try {
    const { quality, maxWidth, maxHeight } = options;
    const outputPath = path.join(
      path.dirname(inputPath),
      `compressed-${path.basename(inputPath)}`
    );

    // 读取图片信息
    const metadata = await sharp(inputPath).metadata();
    const { width, height } = metadata;

    // 计算新的尺寸
    let newWidth = width;
    let newHeight = height;

    if (width && height) {
      if (width > maxWidth) {
        newWidth = maxWidth;
        newHeight = Math.round((height * maxWidth) / width);
      }

      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = Math.round((newWidth * maxHeight) / newHeight);
      }
    }

    // 压缩图片
    await sharp(inputPath)
      .resize(newWidth, newHeight)
      .jpeg({ quality })
      .toFile(outputPath);

    // 读取压缩后的图片
    const compressedImageBuffer = await fs.readFile(outputPath);
    const base64Image = compressedImageBuffer.toString("base64");

    // 删除临时文件
    await fs.unlink(inputPath);
    await fs.unlink(outputPath);

    return `data:image/jpeg;base64,${base64Image}`;
  } catch (error) {
    logger.error("图片压缩失败:", error);
    throw error;
  }
}
