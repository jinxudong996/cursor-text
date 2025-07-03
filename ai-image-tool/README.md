# AI 图片压缩工具

一个简单易用的图片压缩工具，支持图片上传、压缩、对比和下载功能。

## 功能特点

- 支持拖拽上传和文件选择上传
- 支持自定义压缩参数（质量、分辨率）
- 实时预览压缩效果
- 显示压缩前后对比
- 支持下载压缩后的图片

## 技术栈

### 前端

- React 18
- TypeScript
- Ant Design
- Vite
- Axios

### 后端

- Node.js
- Express
- Sharp (图片处理)
- Multer (文件上传)
- Winston (日志)

## 开发环境要求

- Node.js 18+
- npm 8+

## 安装和运行

1. 克隆项目

```bash
git clone [项目地址]
cd ai-image-tool
```

2. 安装依赖

```bash
# 安装前端依赖
cd client
npm install

# 安装后端依赖
cd ../server
npm install
```

3. 运行项目

```bash
# 运行前端开发服务器
cd client
npm run dev

# 运行后端服务器
cd ../server
npm run dev
```

4. 访问应用
   打开浏览器访问 http://localhost:5173

## 使用说明

1. 上传图片

   - 点击上传区域或将图片拖拽到上传区域
   - 支持常见图片格式（JPG、PNG、GIF 等）
   - 单个文件大小限制为 10MB

2. 设置压缩参数

   - 调整压缩质量（1-100）
   - 设置最大宽度和高度

3. 预览和下载
   - 查看压缩前后的对比效果
   - 查看压缩率和文件大小变化
   - 点击下载按钮保存压缩后的图片

## 项目结构

```
ai-image-tool/
├── client/                 # 前端项目
│   ├── src/
│   │   ├── components/    # 组件
│   │   ├── pages/        # 页面
│   │   ├── api/          # API接口
│   │   └── utils/        # 工具函数
│   └── public/           # 静态资源
│
├── server/                # 后端项目
│   ├── src/
│   │   ├── controllers/  # 控制器
│   │   ├── services/     # 业务逻辑
│   │   └── utils/        # 工具函数
│   └── uploads/          # 临时文件存储
│
└── docs/                 # 文档
```

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT
