import os
from werkzeug.utils import secure_filename

class FileValidator:
    def __init__(self):
        self.allowed_extensions = {
            'pdf': ['.pdf'],
            'word': ['.doc', '.docx']
        }
        self.max_file_size = 50 * 1024 * 1024  # 50MB
    
    def validate_file(self, file):
        """验证上传的文件"""
        if not file or file.filename == '':
            return False
        
        # 检查文件扩展名
        filename = secure_filename(file.filename)
        ext = os.path.splitext(filename)[1].lower()
        
        allowed_exts = self.allowed_extensions['pdf'] + self.allowed_extensions['word']
        if ext not in allowed_exts:
            return False
        
        # 检查文件大小
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)  # 重置文件指针
        
        if file_size > self.max_file_size:
            return False
        
        return True
    
    def get_file_type(self, filename):
        """获取文件类型"""
        ext = os.path.splitext(filename)[1].lower()
        
        if ext in self.allowed_extensions['pdf']:
            return 'pdf'
        elif ext in self.allowed_extensions['word']:
            return 'word'
        else:
            return None 