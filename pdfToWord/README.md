# PDF 转 Word 工具网站

一个简单的在线 PDF 转 Word 和 Word 转 PDF 工具，使用 HTML+jQuery 前端和 Python Flask 后端。

## 功能特点

- 🚀 单页面应用，简单易用
- 📄 支持 PDF 转 Word 和 Word 转 PDF
- 🌍 中英文双语界面
- 💰 简单的付费功能
- 🔍 SEO 友好设计
- 📱 响应式布局，支持移动端

## 技术栈

### 前端

- HTML5 + CSS3
- jQuery
- Bootstrap 5

### 后端

- Python 3.8+
- Flask
- python-docx (Word 处理)
- PyPDF2 (PDF 处理)
- reportlab (PDF 生成)

## 快速开始

### 1. 环境准备

```bash
# 安装Python 3.8+
python --version

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

### 2. 安装依赖

```bash
pip install -r requirements.txt
```

### 3. 运行应用

```bash
python app.py
```

访问 http://localhost:5000 即可使用。

## 项目结构

```
pdfToWord/
├── app.py                 # Flask应用主文件
├── config.py             # 配置文件
├── requirements.txt      # Python依赖
├── static/              # 静态文件
│   ├── css/
│   ├── js/
│   ├── images/
│   └── i18n/
├── templates/           # HTML模板
├── uploads/            # 临时上传目录
├── conversions/        # 临时转换目录
└── utils/             # 工具模块
    ├── pdf_converter.py
    ├── word_converter.py
    └── file_validator.py
```

## 部署

### 使用 Gunicorn

```bash
# 安装Gunicorn
pip install gunicorn

# 运行
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

### 使用 Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static/ {
        alias /path/to/your/app/static/;
        expires 1y;
    }
}
```

## 配置说明

### 文件大小限制

在 `app.py` 中修改：

```python
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB
```

### 支持的文件格式

- PDF 转 Word: .pdf
- Word 转 PDF: .doc, .docx

## 付费功能

### 免费版

- 每日 3 次转换
- 文件大小限制 10MB

### 付费版

- 无限次转换
- 文件大小限制 50MB
- 价格：$9.99/月

## SEO 优化

- 页面标题和描述优化
- 结构化数据标记
- 移动端友好
- 快速加载速度

## 安全考虑

- 文件类型验证
- 文件大小限制
- 临时文件自动清理
- 防止恶意文件上传

## 开发计划

- [x] 基础转换功能
- [x] 中英文界面
- [x] 响应式设计
- [ ] 付费功能集成
- [ ] 性能优化
- [ ] 更多文件格式支持

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
