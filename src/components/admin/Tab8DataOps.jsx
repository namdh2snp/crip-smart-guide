import React, { useState, useEffect } from 'react';
import { useConfig } from '../../context/ConfigContext';
import {
  getFeedbacks,
  exportConfig,
  importConfig,
  updateSafetyReportStatus,
  deleteSafetyReport
} from '../../utils/storage';
import {
  Download,
  Upload,
  RotateCcw,
  MessageSquare,
  ShieldAlert,
  MapPin,
  ExternalLink,
  Trash2,
  X,
  User
} from 'lucide-react';

const CATEGORY_LABELS = {
  hazard: 'Nguy cơ mất an toàn',
  security: 'An ninh / Taxi dù',
  medical: 'Hỗ trợ Y tế',
  lost: 'Thất lạc đồ / người',
  other: 'Sự cố khác'
};

const STATUS_META = {
  new: { label: 'Mới tiếp nhận', cls: 'bg-rose-100 text-sos border-rose-200' },
  processing: { label: 'Đang xử lý', cls: 'bg-amber-100 text-amber-800 border-amber-200' },
  resolved: { label: 'Đã xử lý', cls: 'bg-emerald-100 text-emerald-800 border-emerald-200' }
};

export default function Tab8DataOps() {
  const { config, resetConfig } = useConfig();
  const [feedbacks, setFeedbacks] = useState([]);
  const [importStatus, setImportStatus] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const safetyReports = config.safetyReports || [];

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
    reader.onload = async (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const res = await importConfig(content);
        if (res.success) {
          setImportStatus(
            res.remoteSynced
              ? 'Khôi phục file JSON và đồng bộ lên Supabase thành công!'
              : 'Đã nạp file JSON cục bộ (chưa đồng bộ được lên Supabase).'
          );
          setTimeout(() => setImportStatus(''), 3000);
        } else {
          alert('Lỗi nạp file: ' + res.error);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefault = async () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục toàn bộ cấu hình về mặc định ban đầu của Cảng? Mọi chỉnh sửa sẽ bị xóa.')) {
      await resetConfig();
      alert('Đã khôi phục cấu hình mặc định thành công!');
    }
  };

  const handleStatusChange = async (reportId, nextStatus) => {
    await updateSafetyReportStatus(reportId, nextStatus);
  };

  const handleDeleteReport = async (reportId) => {
    if (window.confirm('Xóa báo cáo an toàn này?')) {
      await deleteSafetyReport(reportId);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Realtime Safety Incident Reports (Photo + GPS) */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-black text-sm text-navy uppercase tracking-wider flex items-center space-x-1.5">
            <ShieldAlert className="w-4 h-4 text-sos" />
            <span>8.1 BÁO CÁO AN TOÀN HIỆN TRƯỜNG — ẢNH + GPS ({safetyReports.length})</span>
          </h3>
          <span className="text-[11px] font-bold text-teal bg-teal/10 px-2.5 py-1 rounded-full">
            Đồng bộ Realtime từ Supabase
          </span>
        </div>

        {safetyReports.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-4 text-center">
            Chưa có báo cáo an toàn nào từ hành khách. Khi hành khách gửi báo cáo kèm ảnh & GPS, dữ liệu sẽ hiện ngay tại đây.
          </p>
        ) : (
          <div className="space-y-3 max-h-[32rem] overflow-y-auto pr-1">
            {safetyReports.map((report) => {
              const statusInfo = STATUS_META[report.status] || STATUS_META.new;
              return (
                <div
                  key={report.id}
                  className={`p-4 rounded-2xl border space-y-3 ${
                    report.severity === 'urgent'
                      ? 'bg-rose-50/70 border-rose-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  {/* Top metadata row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {report.severity === 'urgent' && (
                        <span className="bg-sos text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                          KHẨN CẤP
                        </span>
                      )}
                      <span className="bg-navy text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {CATEGORY_LABELS[report.category] || report.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusInfo.cls}`}>
                        {statusInfo.label}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                      <span className="font-bold text-navy">
                        {new Date(report.timestamp).toLocaleString('vi-VN')}
                      </span>
                      <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 uppercase font-mono font-bold">
                        {report.language || 'vi'}
                      </span>
                    </div>
                  </div>

                  {/* Body: Photo + Info */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {report.photoDataUrl && (
                      <button
                        type="button"
                        onClick={() => setPreviewPhoto(report.photoDataUrl)}
                        className="shrink-0 w-full sm:w-36 h-28 rounded-xl overflow-hidden border border-slate-300 bg-slate-900 hover:opacity-90 transition-opacity"
                        title="Nhấp để phóng to ảnh hiện trường"
                      >
                        <img
                          src={report.photoDataUrl}
                          alt="Ảnh hiện trường"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    )}

                    <div className="flex-1 space-y-2 text-xs min-w-0">
                      {report.description && (
                        <p className="text-slate-900 font-semibold bg-white p-2.5 rounded-xl border border-slate-200 leading-relaxed">
                          {report.description}
                        </p>
                      )}

                      {report.locationNote && (
                        <p className="text-slate-700 font-medium">
                          📍 <strong>Vị trí mô tả:</strong> {report.locationNote}
                        </p>
                      )}

                      {report.gps && (
                        <div className="flex flex-wrap items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-2.5 py-1.5">
                          <MapPin className="w-3.5 h-3.5 text-teal shrink-0" />
                          <span className="font-mono font-bold text-navy">
                            {report.gps.lat}, {report.gps.lng} (±{report.gps.accuracy}m)
                          </span>
                          <a
                            href={`https://maps.google.com/?q=${report.gps.lat},${report.gps.lng}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-1 text-teal-dark hover:underline font-extrabold"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Mở Google Maps</span>
                          </a>
                        </div>
                      )}

                      {report.reporterContact && (
                        <p className="text-slate-600 flex items-center space-x-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span><strong>Liên hệ:</strong> {report.reporterContact}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/70">
                    <div className="flex items-center space-x-1.5">
                      {['new', 'processing', 'resolved'].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleStatusChange(report.id, st)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                            report.status === st
                              ? 'bg-navy text-white border-navy'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {STATUS_META[st].label}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteReport(report.id)}
                      className="text-rose-600 hover:text-rose-800 text-xs font-bold flex items-center space-x-1 px-2 py-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Backup & Restore Operations */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-black text-sm text-navy uppercase tracking-wider">
          8.2 SAO LƯU & KHÔI PHỤC CẤU HÌNH HỆ THỐNG
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

      {/* 3. Customer Feedback Reviews */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-sm text-navy uppercase tracking-wider flex items-center space-x-1.5">
            <MessageSquare className="w-4 h-4 text-teal" />
            <span>8.3 DANH SÁCH PHẢN HỒI CỦA HÀNH KHÁCH ({feedbacks.length})</span>
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

      {/* Fullscreen Photo Preview Modal */}
      {previewPhoto && (
        <div
          onClick={() => setPreviewPhoto(null)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
        >
          <button
            type="button"
            onClick={() => setPreviewPhoto(null)}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={previewPhoto}
            alt="Ảnh hiện trường phóng to"
            className="max-w-full max-h-[88vh] rounded-2xl shadow-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
}
