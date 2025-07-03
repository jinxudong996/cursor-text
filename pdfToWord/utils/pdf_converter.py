from pdf2docx import Converter
import os

class PDFConverter:
    def convert_to_word(self, pdf_path):
        """将PDF转换为Word文档"""
        output_path = pdf_path.replace('.pdf', '.docx')
        try:
            cv = Converter(pdf_path)
            cv.convert(output_path, start=0, end=None)  # 全部页面
            cv.close()
            return output_path
        except Exception as e:
            raise Exception(f"PDF转换失败: {str(e)}") 