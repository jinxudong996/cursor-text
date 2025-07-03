import subprocess
import os

class WordConverter:
    def convert_to_pdf(self, word_path):
        """用LibreOffice将Word转为PDF，保留全部格式（使用绝对路径）"""
        try:
            word_path = os.path.abspath(word_path)
            output_dir = os.path.dirname(word_path)
            cmd = [
                "soffice",
                "--headless",
                "--convert-to", "pdf",
                "--outdir", output_dir,
                word_path
            ]
            subprocess.run(cmd, check=True)
            base, ext = os.path.splitext(word_path)
            output_path = base + '.pdf'
            if not os.path.exists(output_path):
                # 兼容.doc扩展名
                output_path = word_path.rsplit('.', 1)[0] + '.pdf'
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