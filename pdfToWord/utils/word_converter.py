from docx import Document
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import os

class WordConverter:
    def convert_to_pdf(self, word_path):
        """将Word文档转换为PDF"""
        try:
            # 读取Word文档
            doc = Document(word_path)
            
            # 创建PDF文件
            output_path = word_path.replace('.docx', '.pdf')
            c = canvas.Canvas(output_path, pagesize=letter)
            width, height = letter
            
            y_position = height - 50  # 起始位置
            
            # 提取文本并写入PDF
            for paragraph in doc.paragraphs:
                text = paragraph.text
                if text.strip():
                    # 简单的文本换行处理
                    lines = self.wrap_text(text, width - 100)
                    for line in lines:
                        if y_position < 50:  # 需要新页面
                            c.showPage()
                            y_position = height - 50
                        
                        c.drawString(50, y_position, line)
                        y_position -= 20
            
            c.save()
            return output_path
            
        except Exception as e:
            raise Exception(f"Word转换失败: {str(e)}")
    
    def wrap_text(self, text, max_width):
        """简单的文本换行"""
        words = text.split()
        lines = []
        current_line = ""
        
        for word in words:
            test_line = current_line + " " + word if current_line else word
            if len(test_line) * 6 < max_width:  # 估算字符宽度
                current_line = test_line
            else:
                if current_line:
                    lines.append(current_line)
                current_line = word
        
        if current_line:
            lines.append(current_line)
        
        return lines 