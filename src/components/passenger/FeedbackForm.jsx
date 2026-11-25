import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { useLanguage } from '../../context/LanguageContext';
import { saveFeedback } from '../../utils/storage';
import { Smile, Meh, Frown, Send, CheckCircle2 } from 'lucide-react';

export default function FeedbackForm() {
  const { t } = useConfig();
  const { currentLang } = useLanguage();

  const [ratings, setRatings] = useState({
    facility: 'happy',  // happy, neutral, unhappy
    service: 'happy',
    safety: 'happy'
  });
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const criteria = [
    { key: 'facility', label: 'Cơ sở vật chất nhà ga cảng (Facilities)' },
    { key: 'service', label: 'Thái độ phục vụ & hướng dẫn (Staff & Guidance)' },
    { key: 'safety', label: 'An ninh trật tự & xe đưa đón (Transport & Security)' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await saveFeedback({
        ratings,
        comment,
        language: currentLang
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-black uppercase text-navy tracking-wider flex items-center space-x-1.5">
          <Smile className="w-4 h-4 text-teal" />
          <span>{t('surveyTitle', currentLang)}</span>
        </h2>
        <span className="text-[10px] text-teal font-bold bg-teal/10 px-2 py-0.5 rounded-full">
          30 Giây
        </span>
      </div>

      {submitted ? (
        <div className="bg-teal/10 border border-teal/40 rounded-2xl p-5 text-center space-y-2 animate-fadeIn">
          <CheckCircle2 className="w-8 h-8 text-teal mx-auto" />
          <h3 className="font-black text-sm text-navy">CẢM ƠN QUÝ KHÁCH ĐÃ ĐÓNG GÓP Ý KIẾN!</h3>
          <p className="text-xs text-slate-600">
            Ý kiến của bạn là động lực để Cảng Quốc tế Cam Ranh nâng cao chất lượng phục vụ ngày một tốt hơn.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {criteria.map((item) => (
              <div key={item.key} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-navy pr-2">{item.label}</span>
                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setRatings(prev => ({ ...prev, [item.key]: 'happy' }))}
                    className={`p-1.5 rounded-xl transition-all ${
                      ratings[item.key] === 'happy' ? 'bg-teal text-white shadow-sm scale-110' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="Hài lòng"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setRatings(prev => ({ ...prev, [item.key]: 'neutral' }))}
                    className={`p-1.5 rounded-xl transition-all ${
                      ratings[item.key] === 'neutral' ? 'bg-amber-500 text-white shadow-sm scale-110' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="Bình thường"
                  >
                    <Meh className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setRatings(prev => ({ ...prev, [item.key]: 'unhappy' }))}
                    className={`p-1.5 rounded-xl transition-all ${
                      ratings[item.key] === 'unhappy' ? 'bg-sos text-white shadow-sm scale-110' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="Chưa hài lòng"
                  >
                    <Frown className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Góp ý thêm cho Cảng Quốc tế Cam Ranh (nếu có)..."
              rows="2"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-navy hover:bg-navy-light disabled:opacity-60 text-white font-black py-2.5 px-4 rounded-xl text-xs uppercase shadow transition-all flex items-center justify-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5 text-teal" />
            <span>{submitting ? '...' : t('submitFeedback', currentLang)}</span>
          </button>
        </form>
      )}
    </div>
  );
}
