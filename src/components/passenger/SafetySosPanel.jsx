import React, { useState, useRef } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { useLanguage } from '../../context/LanguageContext';
import { submitSafetyReport } from '../../utils/storage';
import {
  ShieldAlert,
  Phone,
  Camera,
  Image as ImageIcon,
  MapPin,
  Crosshair,
  Send,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  X,
  ExternalLink,
  Navigation,
  Flame,
  HeartPulse,
  Siren,
  User
} from 'lucide-react';

const INCIDENT_CATEGORIES = [
  {
    id: 'hazard',
    labels: {
      vi: 'Nguy cơ mất an toàn',
      en: 'Safety Hazard',
      zh: '安全隐患',
      kr: '안전 위험 요소'
    }
  },
  {
    id: 'security',
    labels: {
      vi: 'An ninh / Taxi dù',
      en: 'Security / Taxi',
      zh: '治安 / 出租车问题',
      kr: '보안 / 택시 문제'
    }
  },
  {
    id: 'medical',
    labels: {
      vi: 'Hỗ trợ Y tế',
      en: 'Medical Help',
      zh: '医疗救助',
      kr: '의료 지원'
    }
  },
  {
    id: 'lost',
    labels: {
      vi: 'Thất lạc đồ / người',
      en: 'Lost & Found',
      zh: '物品/人员走失',
      kr: '분실 / 미아'
    }
  },
  {
    id: 'other',
    labels: {
      vi: 'Sự cố khác',
      en: 'Other Issue',
      zh: '其他情况',
      kr: '기타 신고'
    }
  }
];

const NATIONAL_SOS = [
  {
    number: '113',
    icon: Siren,
    labels: { vi: 'Cảnh sát', en: 'Police', zh: '报警', kr: '경찰' }
  },
  {
    number: '114',
    icon: Flame,
    labels: { vi: 'Cứu hỏa', en: 'Fire', zh: '火警', kr: '소방' }
  },
  {
    number: '115',
    icon: HeartPulse,
    labels: { vi: 'Cấp cứu', en: 'Medical', zh: '急救', kr: '구급' }
  }
];

const UI_TEXT = {
  live247: {
    vi: 'TRỰC BAN 24/7',
    en: '24/7 LIVE DESK',
    zh: '24小时值守',
    kr: '24시간 상시 운영'
  },
  nationalHotlines: {
    vi: 'Đường dây nóng Quốc gia Việt Nam (Bấm 1 chạm để gọi)',
    en: 'Vietnam National Emergency Hotlines (1-Tap Dial)',
    zh: '越南国家紧急热线（一键拨打）',
    kr: '베트남 국가 긴급 전화 (원터치 통화)'
  },
  portHotlines: {
    vi: 'Đường dây nóng Cảng Quốc tế Cam Ranh & Hỗ trợ Tàu',
    en: 'Cam Ranh International Port & Ship Support Hotlines',
    zh: '金兰国际港与游轮支援热线',
    kr: '깜라인 국제항 및 선박 지원 핫라인'
  },
  categoryLabel: {
    vi: 'Loại sự cố an toàn',
    en: 'Incident Category',
    zh: '事件类型',
    kr: '신고 유형'
  },
  severityLabel: {
    vi: 'Mức độ',
    en: 'Priority',
    zh: '紧急程度',
    kr: '긴급도'
  },
  severityNormal: {
    vi: 'Cần kiểm tra',
    en: 'Normal',
    zh: '常规处理',
    kr: '일반'
  },
  severityUrgent: {
    vi: 'Khẩn cấp',
    en: 'Urgent',
    zh: '紧急',
    kr: '긴급'
  },
  photoLabel: {
    vi: 'Ảnh hiện trường (tùy chọn)',
    en: 'Incident Photo (optional)',
    zh: '现场照片（可选）',
    kr: '현장 사진 (선택)'
  },
  gpsLabel: {
    vi: 'Vị trí GPS tự động',
    en: 'Auto GPS Coordinates',
    zh: '自动 GPS 坐标',
    kr: '자동 GPS 좌표'
  },
  gpsGetting: {
    vi: 'Đang định vị GPS...',
    en: 'Acquiring GPS...',
    zh: '正在获取 GPS 定位...',
    kr: 'GPS 위치 확인 중...'
  },
  gpsRefresh: {
    vi: 'Cập nhật lại GPS',
    en: 'Refresh GPS',
    zh: '刷新定位',
    kr: 'GPS 새로고침'
  },
  gpsViewMap: {
    vi: 'Xem trên Google Maps',
    en: 'View on Google Maps',
    zh: '在谷歌地图查看',
    kr: '구글 지도에서 보기'
  },
  gpsUnsupported: {
    vi: 'Trình duyệt không hỗ trợ GPS. Vui lòng nhập vị trí thủ công bên dưới.',
    en: 'GPS is not supported on this browser. Please enter your location below.',
    zh: '当前浏览器不支持 GPS，请在下方手动输入位置。',
    kr: '이 브라우저에서는 GPS를 지원하지 않습니다. 아래에 위치를 직접 입력하세요.'
  },
  gpsDenied: {
    vi: 'Chưa cấp quyền vị trí GPS. Vui lòng bật GPS hoặc nhập vị trí thủ công bên dưới.',
    en: 'GPS permission denied or unavailable. Please enable GPS or type location below.',
    zh: '未授予 GPS 权限或信号不可用，请开启定位或在下方手动填写。',
    kr: 'GPS 권한이 거부되었거나 사용할 수 없습니다. 아래에 위치를 입력하세요.'
  },
  locationPlaceholder: {
    vi: 'Vị trí cụ thể (VD: Cổng kiểm soát số 2, Cầu bến 01, Khu đón xe...)',
    en: 'Specific location (e.g., Gate 2, Berth 01, Shuttle Pick-up...)',
    zh: '具体位置（例如：2号门、1号泊位、穿梭巴士站...）',
    kr: '상세 위치 (예: 제2게이트, 1번 선석, 셔틀 승차장...)'
  },
  descLabel: {
    vi: 'Mô tả sự cố / Yêu cầu hỗ trợ *',
    en: 'Description / Assistance Needed *',
    zh: '情况描述 / 所需帮助 *',
    kr: '상황 설명 / 필요 지원 *'
  },
  descPlaceholder: {
    vi: 'Mô tả ngắn gọn tình huống cần Ban An toàn / An ninh Cảng hỗ trợ...',
    en: 'Briefly describe the safety issue or help you need...',
    zh: '请简要描述需要港口安全/安保协助的情况...',
    kr: '항만 안전/보안팀의 지원이 필요한 내용을 간단히 적어주세요...'
  },
  contactPlaceholder: {
    vi: 'Tên / Số phòng tàu / SĐT liên hệ (tùy chọn)',
    en: 'Name / Cabin No. / Phone (optional)',
    zh: '姓名 / 舱房号 / 联系电话（可选）',
    kr: '이름 / 객실 번호 / 연락처 (선택)'
  },
  needDescOrPhoto: {
    vi: 'Vui lòng nhập mô tả sự cố hoặc chụp ít nhất 1 ảnh hiện trường.',
    en: 'Please enter a description or attach at least one photo.',
    zh: '请填写情况描述或上传至少一张现场照片。',
    kr: '내용을 입력하거나 현장 사진을 1장 이상 첨부해주세요.'
  },
  sending: {
    vi: 'Đang gửi báo cáo...',
    en: 'Submitting report...',
    zh: '正在提交报告...',
    kr: '신고 전송 중...'
  },
  syncedNote: {
    vi: 'Ban Điều hành Cảng đã nhận được thông báo trực tuyến kèm ảnh & tọa độ GPS.',
    en: 'Port Operations has received your live report with photo & GPS location.',
    zh: '港口运营中心已实时收到您的报告、照片及 GPS 位置。',
    kr: '항만 운영센터에 사진 및 GPS 위치와 함께 실시간으로 접수되었습니다.'
  },
  offlineNote: {
    vi: 'Mạng không ổn định: Báo cáo đã được lưu cục bộ. Nếu khẩn cấp hãy bấm gọi SOS ngay ở trên.',
    en: 'Offline mode: Report saved locally. If urgent, tap the SOS Call Board above.',
    zh: '网络不稳定：报告已保存在本地。如遇紧急情况请直接拨打上方 SOS 热线。',
    kr: '오프라인 상태: 기기에 저장되었습니다. 긴급 시 위 SOS 전화를 이용하세요.'
  },
  sendAnother: {
    vi: 'Gửi báo cáo an toàn khác',
    en: 'Submit another safety report',
    zh: '提交另一份安全报告',
    kr: '다른 안전 신고 작성'
  }
};

function compressImageFile(file, maxWidth = 900, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Không thể đọc tệp ảnh'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Tệp ảnh không hợp lệ'));
      img.onload = () => {
        const scale = img.width > maxWidth ? maxWidth / img.width : 1;
        const targetW = Math.round(img.width * scale);
        const targetH = Math.round(img.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, targetW, targetH);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        const approxKb = Math.round((dataUrl.length * 3) / 4 / 1024);
        resolve({ dataUrl, approxKb, width: targetW, height: targetH });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function SafetySosPanel({ onOpenEmergency }) {
  const { config, t } = useConfig();
  const { currentLang } = useLanguage();

  const [category, setCategory] = useState('hazard');
  const [severity, setSeverity] = useState('normal');
  const [description, setDescription] = useState('');
  const [locationNote, setLocationNote] = useState('');
  const [reporterContact, setReporterContact] = useState('');

  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [photoMeta, setPhotoMeta] = useState(null);
  const [photoBusy, setPhotoBusy] = useState(false);

  const [gps, setGps] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [submittedResult, setSubmittedResult] = useState(null);

  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const pick = (obj) => obj?.[currentLang] || obj?.en || obj?.vi || '';
  const contacts = config.emergencyContacts || [];

  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setPhotoBusy(true);
    setFormError('');
    try {
      const compressed = await compressImageFile(file);
      setPhotoDataUrl(compressed.dataUrl);
      setPhotoMeta({ approxKb: compressed.approxKb, name: file.name });
    } catch (err) {
      setFormError(err.message || 'Lỗi xử lý ảnh');
    } finally {
      setPhotoBusy(false);
    }
  };

  const handleGetGps = () => {
    if (!('geolocation' in navigator)) {
      setGpsError(pick(UI_TEXT.gpsUnsupported));
      return;
    }

    setGpsLoading(true);
    setGpsError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGps({
          lat: Number(position.coords.latitude.toFixed(6)),
          lng: Number(position.coords.longitude.toFixed(6)),
          accuracy: Math.round(position.coords.accuracy || 0),
          capturedAt: new Date().toISOString()
        });
        setGpsLoading(false);
      },
      () => {
        setGpsError(pick(UI_TEXT.gpsDenied));
        setGpsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 15000
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!description.trim() && !photoDataUrl) {
      setFormError(pick(UI_TEXT.needDescOrPhoto));
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitSafetyReport({
        category,
        severity,
        description: description.trim(),
        locationNote: locationNote.trim(),
        reporterContact: reporterContact.trim(),
        photoDataUrl,
        gps,
        language: currentLang,
        shipName: config.ship?.name || ''
      });
      setSubmittedResult(res);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedResult(null);
    setCategory('hazard');
    setSeverity('normal');
    setDescription('');
    setLocationNote('');
    setReporterContact('');
    setPhotoDataUrl(null);
    setPhotoMeta(null);
    setGps(null);
    setGpsError('');
    setFormError('');
  };

  return (
    <div className="space-y-4">
      {/* 1. BẢNG GỌI KHẨN CẤP SOS 24/7 */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border-2 border-sos/30">
        {/* SOS Board Header */}
        <div className="bg-gradient-to-r from-sos to-rose-700 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 animate-pulse shrink-0" />
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider">
              {t('sosBoardTitle', currentLang)}
            </h2>
          </div>
          <span className="text-[10px] font-black uppercase bg-white/20 border border-white/30 px-2.5 py-1 rounded-full shrink-0">
            {pick(UI_TEXT.live247)}
          </span>
        </div>

        <div className="p-4 space-y-4">
          {/* National 1-tap hotlines: 113 / 114 / 115 */}
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              {pick(UI_TEXT.nationalHotlines)}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {NATIONAL_SOS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.number}
                    href={`tel:${item.number}`}
                    className="bg-rose-50 hover:bg-sos hover:text-white text-sos border border-rose-200 rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-all active:scale-95 group shadow-sm"
                  >
                    <Icon className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-lg font-black font-mono leading-none">{item.number}</span>
                    <span className="text-[11px] font-bold mt-1 text-slate-700 group-hover:text-white">
                      {pick(item.labels)}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* CMS Port & Maritime Agent Hotlines */}
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              {pick(UI_TEXT.portHotlines)}
            </p>
            <div className="space-y-2">
              {contacts.map((contact, idx) => {
                const roleText = contact.role?.[currentLang] || contact.role?.en || contact.role?.vi || '';
                const dialNumber = (contact.phone || '').replace(/[^0-9+]/g, '');
                return (
                  <div
                    key={contact.id || idx}
                    className="flex items-center justify-between gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200"
                  >
                    <div className="min-w-0">
                      <p className="font-extrabold text-xs sm:text-sm text-navy leading-snug">
                        {roleText}
                      </p>
                      <p className="text-xs font-mono font-bold text-slate-600 mt-0.5">
                        {contact.phone}
                      </p>
                    </div>
                    <a
                      href={`tel:${dialNumber}`}
                      className="bg-sos hover:bg-sos-dark active:scale-95 text-white font-black text-xs px-3.5 py-2.5 rounded-xl flex items-center space-x-1.5 shrink-0 shadow transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{t('sosCallNow', currentLang)}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick trigger for full-screen Taxi Return Card */}
          {onOpenEmergency && (
            <button
              type="button"
              onClick={onOpenEmergency}
              className="w-full bg-navy hover:bg-navy-light active:scale-[0.99] text-white font-black text-xs uppercase py-3 px-4 rounded-2xl shadow flex items-center justify-center space-x-2 transition-all"
            >
              <Navigation className="w-4 h-4 text-teal" />
              <span>{t('takeMeBackBtn', currentLang)}</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. BÁO CÁO AN TOÀN KÈM CHỤP ẢNH + GPS */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xs sm:text-sm font-black uppercase text-navy tracking-wider flex items-center space-x-1.5">
            <Camera className="w-4 h-4 text-teal" />
            <span>{t('safetyReportTitle', currentLang)}</span>
          </h2>
          <span className="text-[10px] font-extrabold text-teal bg-teal/10 px-2.5 py-1 rounded-full">
            LIVE GPS
          </span>
        </div>

        {submittedResult ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-teal mx-auto" />
            <h3 className="font-black text-sm text-navy">
              {t('safetySubmitSuccess', currentLang)}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {submittedResult.remoteSynced ? pick(UI_TEXT.syncedNote) : pick(UI_TEXT.offlineNote)}
            </p>
            {submittedResult.report?.id && (
              <p className="text-[11px] font-mono font-bold text-slate-500">
                ID: {submittedResult.report.id}
              </p>
            )}
            <button
              type="button"
              onClick={handleResetForm}
              className="mt-2 bg-navy hover:bg-navy-light text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
            >
              {pick(UI_TEXT.sendAnother)}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category Pills */}
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-navy">
                {pick(UI_TEXT.categoryLabel)}
              </label>
              <div className="flex flex-wrap gap-2">
                {INCIDENT_CATEGORIES.map((cat) => {
                  const active = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                        active
                          ? 'bg-navy text-white border-navy shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {pick(cat.labels)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Severity Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-navy">
                {pick(UI_TEXT.severityLabel)}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSeverity('normal')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-extrabold border transition-all ${
                    severity === 'normal'
                      ? 'bg-teal text-white border-teal shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  {pick(UI_TEXT.severityNormal)}
                </button>
                <button
                  type="button"
                  onClick={() => setSeverity('urgent')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-extrabold border flex items-center justify-center space-x-1.5 transition-all ${
                    severity === 'urgent'
                      ? 'bg-sos text-white border-sos shadow-sm'
                      : 'bg-rose-50 text-sos border-rose-200'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>{pick(UI_TEXT.severityUrgent)}</span>
                </button>
              </div>
            </div>

            {/* Camera / Photo Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-navy">
                {pick(UI_TEXT.photoLabel)}
              </label>

              {/* Hidden native camera & gallery inputs */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoSelect}
                className="hidden"
              />
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoSelect}
                className="hidden"
              />

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  disabled={photoBusy}
                  className="bg-navy hover:bg-navy-light text-white font-bold text-xs py-3 px-3 rounded-xl flex items-center justify-center space-x-1.5 shadow-sm transition-all active:scale-95"
                >
                  {photoBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4 text-teal" />}
                  <span>{t('safetyTakePhoto', currentLang)}</span>
                </button>
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={photoBusy}
                  className="bg-slate-100 hover:bg-slate-200 text-navy font-bold text-xs py-3 px-3 rounded-xl border border-slate-200 flex items-center justify-center space-x-1.5 transition-all active:scale-95"
                >
                  <ImageIcon className="w-4 h-4 text-teal" />
                  <span>{t('safetyChoosePhoto', currentLang)}</span>
                </button>
              </div>

              {photoDataUrl && (
                <div className="relative rounded-2xl overflow-hidden border-2 border-teal/40 bg-slate-900">
                  <img
                    src={photoDataUrl}
                    alt="Safety incident preview"
                    className="w-full max-h-60 object-contain mx-auto"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoDataUrl(null);
                      setPhotoMeta(null);
                    }}
                    className="absolute top-2 right-2 bg-black/70 hover:bg-sos text-white p-1.5 rounded-full transition-all"
                    title="Xóa ảnh"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {photoMeta && (
                    <div className="bg-black/70 text-white text-[10px] font-mono px-3 py-1">
                      ✓ {photoMeta.name} (~{photoMeta.approxKb} KB)
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Auto GPS Location */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-navy">
                {pick(UI_TEXT.gpsLabel)}
              </label>

              <button
                type="button"
                onClick={handleGetGps}
                disabled={gpsLoading}
                className="w-full bg-teal/10 hover:bg-teal/20 text-navy border border-teal/40 font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-[0.99]"
              >
                {gpsLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 text-teal animate-spin" />
                    <span>{pick(UI_TEXT.gpsGetting)}</span>
                  </>
                ) : (
                  <>
                    <Crosshair className="w-4 h-4 text-teal" />
                    <span>{gps ? pick(UI_TEXT.gpsRefresh) : t('safetyGetGps', currentLang)}</span>
                  </>
                )}
              </button>

              {gps && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-start space-x-2 min-w-0">
                    <MapPin className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="font-mono font-black text-navy">
                        {gps.lat}, {gps.lng}
                      </p>
                      <p className="text-[11px] text-slate-600">
                        GPS ±{gps.accuracy}m
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${gps.lat},${gps.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white hover:bg-slate-50 text-navy border border-slate-200 font-bold text-[11px] px-2.5 py-2 rounded-xl flex items-center space-x-1 shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-teal" />
                    <span>{pick(UI_TEXT.gpsViewMap)}</span>
                  </a>
                </div>
              )}

              {gpsError && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 font-medium">
                  {gpsError}
                </p>
              )}

              <input
                type="text"
                value={locationNote}
                onChange={(e) => setLocationNote(e.target.value)}
                placeholder={pick(UI_TEXT.locationPlaceholder)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-navy">
                {pick(UI_TEXT.descLabel)}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={pick(UI_TEXT.descPlaceholder)}
                rows="3"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            {/* Optional reporter info */}
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={reporterContact}
                onChange={(e) => setReporterContact(e.target.value)}
                placeholder={pick(UI_TEXT.contactPlaceholder)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>

            {formError && (
              <div className="text-xs font-bold text-sos bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
                {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className={`w-full font-black py-3.5 px-4 rounded-2xl text-xs sm:text-sm uppercase shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-[0.99] text-white ${
                severity === 'urgent'
                  ? 'bg-sos hover:bg-sos-dark'
                  : 'bg-navy hover:bg-navy-light'
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{pick(UI_TEXT.sending)}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-teal" />
                  <span>{t('safetySubmitBtn', currentLang)}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
