// 主要JavaScript逻辑
var currentLang = localStorage.getItem("language") || "zh";

// 语言包
var languagePacks = {
  zh: {
    "upload.title": "上传您的文件",
    "upload.dragDrop": "拖拽文件到此处或点击上传",
    "upload.button": "选择文件",
    "option.pdfToWord": "PDF转Word",
    "option.wordToPdf": "Word转PDF",
    "conversion.processing": "转换中...",
    "download.title": "转换完成",
    "download.description": "您的文件已转换完成，点击下方按钮下载",
    "download.button": "下载文件",
    "instructions.title": "使用说明",
    "instructions.step1.title": "选择转换类型",
    "instructions.step1.desc": "选择PDF转Word或Word转PDF",
    "instructions.step2.title": "上传文件",
    "instructions.step2.desc": "拖拽或点击上传您的文件",
    "instructions.step3.title": "下载结果",
    "instructions.step3.desc": "等待转换完成后下载文件",
    "pricing.title": "功能对比",
    "pricing.free.title": "免费版",
    "pricing.free.feature1": "每日3次转换",
    "pricing.free.feature2": "文件大小限制10MB",
    "pricing.free.feature3": "基础转换质量",
    "pricing.premium.title": "付费版",
    "pricing.premium.feature1": "无限次转换",
    "pricing.premium.feature2": "文件大小限制50MB",
    "pricing.premium.feature3": "高质量转换",
    "pricing.premium.button": "立即升级",
    "footer.privacy": "隐私政策",
    "footer.terms": "服务条款",
    "footer.contact": "联系我们",
  },
  en: {
    "upload.title": "Upload Your File",
    "upload.dragDrop": "Drag and drop your file here or click to upload",
    "upload.button": "Choose File",
    "option.pdfToWord": "PDF to Word",
    "option.wordToPdf": "Word to PDF",
    "conversion.processing": "Converting...",
    "download.title": "Conversion Complete",
    "download.description":
      "Your file has been converted successfully. Click the button below to download.",
    "download.button": "Download File",
    "instructions.title": "How to Use",
    "instructions.step1.title": "Choose Conversion Type",
    "instructions.step1.desc": "Select PDF to Word or Word to PDF",
    "instructions.step2.title": "Upload File",
    "instructions.step2.desc": "Drag and drop or click to upload your file",
    "instructions.step3.title": "Download Result",
    "instructions.step3.desc":
      "Wait for conversion to complete and download the file",
    "pricing.title": "Feature Comparison",
    "pricing.free.title": "Free Version",
    "pricing.free.feature1": "3 conversions per day",
    "pricing.free.feature2": "File size limit 10MB",
    "pricing.free.feature3": "Basic conversion quality",
    "pricing.premium.title": "Premium Version",
    "pricing.premium.feature1": "Unlimited conversions",
    "pricing.premium.feature2": "File size limit 50MB",
    "pricing.premium.feature3": "High quality conversion",
    "pricing.premium.button": "Upgrade Now",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.contact": "Contact Us",
  },
};

// 页面加载完成后初始化
$(document).ready(function () {
  // 加载语言包
  loadLanguagePack(currentLang);

  // 初始化转换选项
  initConversionOptions();

  // 添加页面动画
  $(".main-content").addClass("fade-in");
});

// 切换语言
function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("language", lang);
  loadLanguagePack(lang);
}

// 加载语言包
function loadLanguagePack(lang) {
  var pack = languagePacks[lang];
  if (!pack) return;

  // 更新页面文本
  $("[data-i18n]").each(function () {
    var key = $(this).data("i18n");
    if (pack[key]) {
      $(this).text(pack[key]);
    }
  });

  // 更新页面标题和描述
  if (lang === "zh") {
    $("title").text("PDF转Word工具 - 免费在线转换");
    $('meta[name="description"]').attr(
      "content",
      "免费在线PDF转Word工具，支持Word转PDF，无需注册，即用即走"
    );
  } else {
    $("title").text("PDF to Word Converter - Free Online Tool");
    $('meta[name="description"]').attr(
      "content",
      "Free online PDF to Word converter, supports Word to PDF, no registration required"
    );
  }
}

// 初始化转换选项
function initConversionOptions() {
  $(".conversion-options .btn").click(function () {
    $(".conversion-options .btn").removeClass("active");
    $(this).addClass("active");
  });
}

// 显示付费页面
function showPricing() {
  $("html, body").animate(
    {
      scrollTop: $(".pricing").offset().top - 100,
    },
    500
  );
}

// 显示支付页面
function showPayment() {
  alert("支付功能开发中...");
  // 这里可以集成第三方支付接口
}

// 显示错误信息
function showError(message) {
  var errorHtml = '<div class="error-message">' + message + "</div>";
  $(".main-content .container").prepend(errorHtml);

  // 3秒后自动移除
  setTimeout(function () {
    $(".error-message").fadeOut(function () {
      $(this).remove();
    });
  }, 3000);
}

// 显示成功信息
function showSuccess(message) {
  var successHtml = '<div class="success-message">' + message + "</div>";
  $(".main-content .container").prepend(successHtml);

  // 3秒后自动移除
  setTimeout(function () {
    $(".success-message").fadeOut(function () {
      $(this).remove();
    });
  }, 3000);
}

// 获取当前选择的转换类型
function getCurrentConversionType() {
  return $(".conversion-options .btn.active").data("type");
}

// 格式化文件大小
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";

  var k = 1024;
  var sizes = ["Bytes", "KB", "MB", "GB"];
  var i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// 验证文件类型
function validateFileType(file) {
  var allowedTypes = [".pdf", ".doc", ".docx"];
  var fileName = file.name.toLowerCase();

  return allowedTypes.some(function (type) {
    return fileName.endsWith(type);
  });
}

// 验证文件大小
function validateFileSize(file) {
  var maxSize = 50 * 1024 * 1024; // 50MB
  return file.size <= maxSize;
}
