import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { compressImage } from "./services/imageService";
import { logger } from "./utils/logger";

const app = express();
const port = process.env.PORT || 3000;

// 配置中间件
app.use(cors());
app.use(express.json());

// 配置文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// 路由
app.post("/api/compress", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "请上传图片文件" });
    }

    const { quality, maxWidth, maxHeight } = req.body;
    const compressedImage = await compressImage(req.file.path, {
      quality: parseInt(quality),
      maxWidth: parseInt(maxWidth),
      maxHeight: parseInt(maxHeight),
    });

    res.json({
      success: true,
      data: {
        compressedImage,
      },
    });
  } catch (error) {
    logger.error("图片压缩失败:", error);
    res.status(500).json({ error: "图片压缩失败" });
  }
});

// 启动服务器
app.listen(port, () => {
  logger.info(`服务器运行在 http://localhost:${port}`);
});
