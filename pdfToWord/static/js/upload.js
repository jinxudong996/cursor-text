// 文件上传处理
$(document).ready(function () {
  // 拖拽上传
  $("#upload-area").on("dragover", function (e) {
    e.preventDefault();
    $(this).addClass("dragover");
  });

  $("#upload-area").on("dragleave", function (e) {
    e.preventDefault();
    $(this).removeClass("dragover");
  });

  $("#upload-area").on("drop", function (e) {
    e.preventDefault();
    $(this).removeClass("dragover");

    var files = e.originalEvent.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  });

  // 点击上传
  $("#file-input").on("change", function () {
    var file = this.files[0];
    if (file) {
      handleFileUpload(file);
    }
  });
});

// 处理文件上传
function handleFileUpload(file) {
  // 验证文件
  if (!validateFile(file)) {
    return;
  }

  // 显示上传进度
  showUploadProgress();

  // 创建FormData
  var formData = new FormData();
  formData.append("file", file);
  formData.append("conversion_type", getCurrentConversionType());

  // 上传文件
  $.ajax({
    url: "/api/upload",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener(
        "progress",
        function (evt) {
          if (evt.lengthComputable) {
            var percentComplete = (evt.loaded / evt.total) * 100;
            updateUploadProgress(percentComplete);
          }
        },
        false
      );
      return xhr;
    },
    success: function (response) {
      if (response.task_id) {
        // 开始转换
        startConversion(response.task_id);
      } else {
        showError("上传失败，请重试");
        hideUploadProgress();
      }
    },
    error: function (xhr, status, error) {
      var errorMessage = "上传失败";
      if (xhr.responseJSON && xhr.responseJSON.error) {
        errorMessage = xhr.responseJSON.error;
      }
      showError(errorMessage);
      hideUploadProgress();
    },
  });
}

// 验证文件
function validateFile(file) {
  // 检查文件类型
  if (!validateFileType(file)) {
    showError("不支持的文件格式，请上传PDF、DOC或DOCX文件");
    return false;
  }

  // 检查文件大小
  if (!validateFileSize(file)) {
    showError("文件大小超过限制，请上传50MB以内的文件");
    return false;
  }

  return true;
}

// 显示上传进度
function showUploadProgress() {
  $(".conversion-progress").show();
  $(".progress-text").text("上传中...");
  $(".progress-bar").css("width", "0%");
}

// 隐藏上传进度
function hideUploadProgress() {
  $(".conversion-progress").hide();
}

// 更新上传进度
function updateUploadProgress(percent) {
  $(".progress-bar").css("width", percent + "%");
  $(".progress-text").text("上传中... " + Math.round(percent) + "%");
}
