// 转换进度处理
function startConversion(taskId) {
  // 显示转换进度
  showConversionProgress();

  // 轮询转换状态
  var interval = setInterval(function () {
    $.ajax({
      url: "/api/conversion/status/" + taskId,
      method: "GET",
      success: function (response) {
        updateConversionProgress(response.progress);

        if (response.status === "completed") {
          clearInterval(interval);
          showDownloadButton(response.download_url);
          showSuccess("转换完成！");
        } else if (response.status === "failed") {
          clearInterval(interval);
          showError(response.error || "转换失败，请重试");
          hideConversionProgress();
        }
      },
      error: function () {
        clearInterval(interval);
        showError("获取转换状态失败");
        hideConversionProgress();
      },
    });
  }, 2000); // 每2秒检查一次
}

// 显示转换进度
function showConversionProgress() {
  $(".conversion-progress").show();
  $(".progress-text").text("转换中...");
  $(".progress-bar").css("width", "0%");
}

// 隐藏转换进度
function hideConversionProgress() {
  $(".conversion-progress").hide();
}

// 更新转换进度
function updateConversionProgress(percent) {
  $(".progress-bar").css("width", percent + "%");
  $(".progress-text").text("转换中... " + percent + "%");
}

// 显示下载按钮
function showDownloadButton(downloadUrl) {
  // 隐藏转换进度
  hideConversionProgress();

  // 显示下载区域
  $(".download-section").show();

  // 设置下载链接
  $("#download-btn").attr("href", downloadUrl);

  // 添加下载事件
  $("#download-btn")
    .off("click")
    .on("click", function (e) {
      e.preventDefault();

      // 创建隐藏的下载链接
      var link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 显示成功消息
      showSuccess("文件下载已开始");

      // 重置页面状态
      setTimeout(function () {
        resetPage();
      }, 3000);
    });
}

// 重置页面状态
function resetPage() {
  // 隐藏下载区域
  $(".download-section").hide();

  // 重置文件输入
  $("#file-input").val("");

  // 重置上传区域
  $("#upload-area").removeClass("dragover");

  // 滚动到顶部
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    500
  );
}

// 自动清理任务状态
function cleanupTask(taskId) {
  // 这里可以添加清理逻辑
  // 比如在下载完成后清理服务器端的临时文件
  console.log("清理任务:", taskId);
}
