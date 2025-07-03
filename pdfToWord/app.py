from flask import Flask, request, jsonify, send_file, render_template
from werkzeug.utils import secure_filename
import os
import uuid
import threading
import time
from utils.pdf_converter import PDFConverter
from utils.word_converter import WordConverter
from utils.file_validator import FileValidator

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['CONVERSION_FOLDER'] = 'conversions'

# 确保目录存在
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['CONVERSION_FOLDER'], exist_ok=True)

# 转换任务状态
conversion_tasks = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        conversion_type = request.form.get('conversion_type', 'pdf-to-word')
        
        # 验证文件
        validator = FileValidator()
        if not validator.validate_file(file):
            return jsonify({'error': 'Invalid file type or size'}), 400
        
        # 生成任务ID
        task_id = str(uuid.uuid4())
        
        # 保存文件
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{task_id}_{filename}")
        file.save(file_path)
        
        # 初始化任务状态
        conversion_tasks[task_id] = {
            'status': 'pending',
            'progress': 0,
            'file_path': file_path,
            'conversion_type': conversion_type,
            'result_path': None,
            'error': None
        }
        
        # 启动转换任务
        thread = threading.Thread(target=convert_file, args=(task_id,))
        thread.start()
        
        return jsonify({
            'task_id': task_id,
            'status': 'pending'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/conversion/status/<task_id>')
def get_conversion_status(task_id):
    if task_id not in conversion_tasks:
        return jsonify({'error': 'Task not found'}), 404
    
    task = conversion_tasks[task_id]
    response = {
        'task_id': task_id,
        'status': task['status'],
        'progress': task['progress']
    }
    
    if task['status'] == 'completed':
        response['download_url'] = f'/api/download/{task_id}'
        response['file_size'] = os.path.getsize(task['result_path'])
    elif task['status'] == 'failed':
        response['error'] = task['error']
    
    return jsonify(response)

@app.route('/api/download/<task_id>')
def download_file(task_id):
    if task_id not in conversion_tasks:
        return jsonify({'error': 'Task not found'}), 404
    
    task = conversion_tasks[task_id]
    if task['status'] != 'completed':
        return jsonify({'error': 'Conversion not completed'}), 400
    
    return send_file(
        task['result_path'],
        as_attachment=True,
        download_name=os.path.basename(task['result_path'])
    )

def convert_file(task_id):
    """后台转换文件"""
    task = conversion_tasks[task_id]
    
    try:
        task['status'] = 'processing'
        task['progress'] = 10
        
        # 根据转换类型选择转换器
        if task['conversion_type'] == 'pdf-to-word':
            converter = PDFConverter()
            result_path = converter.convert_to_word(task['file_path'])
        else:
            converter = WordConverter()
            result_path = converter.convert_to_pdf(task['file_path'])
        
        task['progress'] = 100
        task['status'] = 'completed'
        task['result_path'] = result_path
        
        # 清理原文件
        os.remove(task['file_path'])
        
    except Exception as e:
        task['status'] = 'failed'
        task['error'] = str(e)
        
        # 清理文件
        if os.path.exists(task['file_path']):
            os.remove(task['file_path'])

if __name__ == '__main__':
    app.run(debug=True) 