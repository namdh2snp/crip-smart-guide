import React, { useState, useEffect } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { getFeedbacks, exportConfig, importConfig } from '../../utils/storage';
import { Download, Upload, RotateCcw, MessageSquare, Check, AlertTriangle } from 'lucide-react';

export default function Tab8DataOps() {
  const { config, resetConfig } = useConfig();
  const [feedbacks, setFeedbacks] = useState([]);
  const [importStatus, setImportStatus] = useState('');

  useEffect(() => {
    setFeedbacks(getFeedbacks());
  }, []);

  const handleExport = () => {
    const jsonStr = exportConfig();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CRIP_Config_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const res = importConfig(content);
        if (res.success) {
          setImportStatus('Khôi phục file JSON thành công!');
          setTimeout(() => setImportStatus(''), 3000);
        } else {
          alert('Lỗi nạp file: ' + res.error);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefault = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục toàn bộ cấu hình về mặc định ban đầu của Cảng? Mọi chỉnh sửa sẽ bị xóa.')) {
      resetConfig();
      alert('Đã khôi phục cấu hình mặc định thành công!');
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Backup & Restore Operations */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-black text-sm text-navy uppercase tracking-wider">
          8.1 SAO LƯU & KHÔI PHỤC CẤU HÌNH HỆ THỐNG
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Export */}
          <button
            onClick={handleExport}
            className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-left space-y-1 transition-all"
          >
            <Download className="w-5 h-5 text-teal" />
            <h4 className="font-bold text-xs text-navy">Xuất File JSON Sao Lưu</h4>
            <p className="text-[11px] text-slate-500">Tải toàn bộ cấu hình về máy tính</p>
          </button>

          {/* Import */}
          <label className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-left space-y-1 cursor-pointer transition-all block">
            <Upload className="w-5 h-5 text-teal" />
            <h4 className="font-bold text-xs text-navy">Nhập File JSON Phục Hồi</h4>
            <p className="text-[11px] text-slate-500">Nạp cấu hình từ file đã sao lưu</p>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          {/* Reset */}
          <button
            onClick={handleResetDefault}
            className="p-4 bg-rose-50 hover:bg-rose-100 rounded-2xl border border-rose-200 text-left space-y-1 transition-all"
          >
            <RotateCcw className="w-5 h-5 text-sos" />
            <h4 className="font-bold text-xs text-sos">Khôi Phục Mặc Định</h4>
            <p className="text-[11px] text-rose-600">Đưa về dữ liệu ban đầu của Cảng</p>
          </button>
        </div>

        {importStatus && (
          <div className="p-3 bg-teal/10 border border-teal text-teal-dark rounded-xl text-xs font-bold">
            {importStatus}
          </div>
        )}
      </div>

      {/* 2. Customer Feedback Reviews */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-sm text-navy uppercase tracking-wider flex items-center space-x-1.5">
            <MessageSquare className="w-4 h-4 text-teal" />
            <span>8.2 DANH SÁCH PHẢN HỒI CỦA HÀNH KHÁCH ({feedbacks.length})</span>
          </h3>
        </div>

        {feedbacks.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-4 text-center">
            Chưa có phản hồi nào được ghi nhận từ hành khách.
          </p>
        ) : (
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-bold text-navy">
                    {new Date(fb.timestamp).toLocaleString('vi-VN')}
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200 uppercase font-mono font-bold">
                    {fb.language}
                  </span>
                </div>

                <div className="flex space-x-4 text-[11px] font-semibold text-slate-700">
                  <span>Cơ sở vật chất: <strong>{fb.ratings?.facility}</strong></span>
                  <span>Phục vụ: <strong>{fb.ratings?.service}</strong></span>
                  <span>An ninh: <strong>{fb.ratings?.safety}</strong></span>
                </div>

                {fb.comment && (
                  <p className="text-slate-800 bg-white p-2 rounded-xl border border-slate-200 italic">
                    "{fb.comment}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
