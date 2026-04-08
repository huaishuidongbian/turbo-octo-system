import { useState } from "react";
import { Accessibility, X, ZoomIn, ZoomOut, Contrast, Eye, Type, RotateCcw, Heart } from "lucide-react";
import { useAccessibility, type FontSize } from "./AccessibilityContext";

const fontSizeLabels: Record<FontSize, string> = {
  normal: "标准",
  large: "大号",
  xlarge: "超大",
};

const fontSizeOrder: FontSize[] = ["normal", "large", "xlarge"];

export default function AccessibilityToolbar() {
  const [open, setOpen] = useState(false);
  const { fontSize, setFontSize, colorMode, setColorMode, elderlyMode, setElderlyMode } =
    useAccessibility();

  const increaseFontSize = () => {
    const idx = fontSizeOrder.indexOf(fontSize);
    if (idx < fontSizeOrder.length - 1) setFontSize(fontSizeOrder[idx + 1]);
  };

  const decreaseFontSize = () => {
    const idx = fontSizeOrder.indexOf(fontSize);
    if (idx > 0) setFontSize(fontSizeOrder[idx - 1]);
  };

  const resetAll = () => {
    setFontSize("normal");
    setColorMode("normal");
    setElderlyMode(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border p-5 w-80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2 text-blue-700">
              <Accessibility className="w-5 h-5" /> 无障碍设置
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
              aria-label="关闭无障碍设置"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Elderly Mode Toggle */}
          <button
            onClick={() => setElderlyMode(!elderlyMode)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl mb-3 transition-colors ${
              elderlyMode
                ? "bg-red-600 text-white"
                : "bg-red-50 text-red-700 border-2 border-red-200 hover:bg-red-100"
            }`}
          >
            <Heart className="w-6 h-6" />
            <div className="text-left">
              <div style={{ fontWeight: 600 }}>
                {elderlyMode ? "✓ 长辈模式已开启" : "一键开启长辈模式"}
              </div>
              <div className={`text-xs mt-0.5 ${elderlyMode ? "text-red-200" : "text-red-400"}`}>
                放大字体 · 高对比度 · 大按钮
              </div>
            </div>
          </button>

          <div className="space-y-3">
            {/* Font Size */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3 text-gray-700">
                <Type className="w-4 h-4" />
                <span style={{ fontWeight: 500 }}>字体大小</span>
                <span className="ml-auto text-sm text-blue-600" style={{ fontWeight: 600 }}>
                  {fontSizeLabels[fontSize]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseFontSize}
                  disabled={fontSize === "normal"}
                  className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="缩小字体"
                >
                  <ZoomOut className="w-5 h-5" />
                  <span className="text-sm">缩小</span>
                </button>
                <button
                  onClick={increaseFontSize}
                  disabled={fontSize === "xlarge"}
                  className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="放大字体"
                >
                  <ZoomIn className="w-5 h-5" />
                  <span className="text-sm">放大</span>
                </button>
              </div>
              {/* Size Preview */}
              <div className="flex items-end justify-center gap-3 mt-3 pt-3 border-t border-gray-200">
                {fontSizeOrder.map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                      fontSize === size ? "bg-blue-100 text-blue-700" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <span
                      style={{
                        fontSize: size === "normal" ? 14 : size === "large" ? 18 : 22,
                        fontWeight: fontSize === size ? 700 : 400,
                      }}
                    >
                      文
                    </span>
                    <span className="text-xs">{fontSizeLabels[size]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3 text-gray-700">
                <Contrast className="w-4 h-4" />
                <span style={{ fontWeight: 500 }}>高对比度</span>
              </div>
              <button
                onClick={() =>
                  setColorMode(colorMode === "normal" ? "highContrast" : "normal")
                }
                className={`w-full py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  colorMode === "highContrast"
                    ? "bg-gray-900 text-white"
                    : "border bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Eye className="w-5 h-5" />
                {colorMode === "highContrast" ? "✓ 已开启高对比度" : "开启高对比度"}
              </button>
            </div>

            {/* Reset */}
            <button
              onClick={resetAll}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm">恢复默认设置</span>
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
          open
            ? "bg-gray-600 hover:bg-gray-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        aria-label="无障碍设置"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Accessibility className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
