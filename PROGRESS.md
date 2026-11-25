# Tiến độ Dự án: CRIP Smart Guide

**Cẩm nang Thông minh Cảng Quốc tế Cam Ranh (Cam Ranh International Port - Smart Guide)**  
Cập nhật lần cuối: `2026-11-25` | Trạng thái tổng thể: **Hoàn thành 30/30 tác vụ (Phase 1 – Phase 5) • Đã build & kiểm thử chạy trên máy mới**

---

## 1. Tổng quan & Nguyên tắc Kiến trúc

Ứng dụng web PWA cục bộ phục vụ hành khách tàu du lịch biển quốc tế và nội địa cập Cảng Quốc tế Cam Ranh, tuân thủ 5 nguyên tắc cốt lõi trong `.specify/memory/constitution.md` (v1.0.0):

- **100% CMS-Driven & Zero Hardcoding**: Toàn bộ nội dung hiển thị đọc từ hạt giống dữ liệu `src/data/defaultConfig.js` và đồng bộ qua `src/utils/storage.js` (`LocalStorage`), sẵn sàng nâng cấp lên Backend-as-a-Service (như Supabase).
- **Mobile-First & Offline PWA**: Tối ưu cho màn hình di động (360px–430px), tích hợp Web App Manifest và Service Worker Cache-First hoạt động khi mất kết nối mạng.
- **Đa ngôn ngữ tức thì (VI / EN / ZH / KR)**: Chuyển đổi ngay không reload trang, tự động lưu lựa chọn vào `LocalStorage` và fallback sang EN/VI khi thiếu bản dịch.
- **Nhận diện thương hiệu CRIP**: Xanh Hải Quân (`#0A2540`), Xanh Ngọc Cam Ranh (`#00A896`), Nền sáng chống chói (`#F8FAFC`), Đỏ Cam Khẩn cấp (`#E63946`), font `Inter` & `Noto Sans` (body tối thiểu `16px`).
- **Vận hành độc lập cục bộ (Local-First)**: React 18 + Vite 6 + Tailwind CSS 3 + React Router 6 + Lucide React.

---

## 2. Tiến độ Triển khai theo Giai đoạn (`specs/001-crip-smart-guide/tasks.md`)

| Giai đoạn | Phạm vi | Tiến độ | Trạng thái |
|---|---|---|---|
| **Phase 1: Setup & Frameworks** | Khởi tạo React + Vite + Tailwind + Router + tài nguyên đồ họa (`T001`–`T004`) | 4 / 4 | ✅ Hoàn thành |
| **Phase 2: Data & Storage Layer** | `defaultConfig.js`, `storage.js`, `LanguageContext`, `ConfigContext`, `speech.js`, `currency.js` (`T005`–`T008`) | 4 / 4 | ✅ Hoàn thành |
| **Phase 3: Passenger UI (`/`)** | Giao diện hành khách Mobile-First đầy đủ US1–US4 (`T009`–`T017`) | 9 / 9 | ✅ Hoàn thành |
| **Phase 4: Admin CMS (`/admin`)** | Trung tâm quản trị 8 tab toàn phần US5 (`T018`–`T026`) | 9 / 9 | ✅ Hoàn thành |
| **Phase 5: PWA & Verification** | `manifest.json`, `sw.js`, đồng bộ realtime `/admin` ↔ `/`, build production (`T027`–`T030`) | 4 / 4 | ✅ Hoàn thành |

**Tổng tiến độ**: **30 / 30 tác vụ (100%)**

---

## 3. Các Tính năng Đã Hoàn thành

### A. Giao diện Hành khách (`/`)
- **Thanh Header cố định (`Header.jsx`)**: Logo Cảng Quốc tế Cam Ranh, nút chuyển nhanh 4 ngôn ngữ (`VI`, `EN`, `ZH`, `KR`), nút truy cập khẩn cấp **SOS** 1 chạm.
- **Thẻ trạng thái chuyến tàu (`ShipStatusCard.jsx`)**: Hiển thị tên tàu, cầu bến, thời tiết Cam Ranh, đồng hồ đếm ngược thời gian thực đến giờ **All Aboard**, cảnh báo quá giờ và nút *"Nhắc tôi trước 60 phút"*.
- **Wi-Fi nhà ga 1 chạm (`WifiBanner.jsx`)**: Hiển thị SSID/mật khẩu Wi-Fi miễn phí và sao chép nhanh vào clipboard.
- **Phân luồng di chuyển (`LogisticsFlow.jsx`)**:
  - Tab **Đi theo Tour hãng tàu**: Hướng dẫn khu vực tập kết và bãi đỗ xe bus đoàn.
  - Tab **Đi tự túc**: Lịch trình xe Shuttle miễn phí ra cổng cảng và bảng cước Taxi niêm yết chính hãng kèm hotline.
- **Bản đồ nhà ga tương tác (`TerminalMap.jsx`)**: Hiển thị sơ đồ thực tế `/crip-map.png`, bộ lọc điểm tiện ích POI (ATM/Đổi tiền, SIM 4G, Y tế, Miễn thuế, WC, Shuttle Bus) và thẻ thông tin chi tiết khi chạm vào từng điểm.
- **Lịch trình khám phá (`ItineraryList.jsx`)**: Gợi ý tour tự túc theo 3 mốc thời gian **4 Giờ / 6 Giờ / 8 Giờ** tại Cam Ranh – Nha Trang kèm mốc giờ an toàn bắt buộc quay về cảng.
- **Thẻ giao tiếp bản địa (`PhraseCards.jsx`)**: Các câu tiếng Việt khổ lớn kèm phiên âm quốc tế, bản dịch EN/ZH/KR và phát âm mẫu tiếng Việt qua **Web Speech API** (`src/utils/speech.js`).
- **Máy tính đổi tiền ngoại tuyến (`CurrencyCalc.jsx`)**: Quy đổi 2 chiều không cần mạng giữa `VND` và `USD`, `CNY`, `KRW` (`src/utils/currency.js`).
- **Khảo sát trải nghiệm 30 giây (`FeedbackForm.jsx`)**: Đánh giá nhanh bằng biểu tượng cảm xúc theo 3 tiêu chí, góp ý ngắn và lưu cục bộ.
- **Thanh dock đáy & Modal khẩn cấp (`BottomBar.jsx`, `EmergencyModal.jsx`)**: Thẻ toàn màn hình khổ lớn *"LÀM ƠN ĐƯA TÔI VỀ CẢNG QUỐC TẾ CAM RANH"* kèm địa chỉ/chỉ dẫn cho tài xế và danh bạ hotline SOS.

### B. Giao diện Quản trị Toàn phần (`/admin`)
- **Tab 1 (`Tab1Ship.jsx`)**: Cập nhật tên tàu, cầu bến, thời tiết, giờ cập/All Aboard/rời cảng, Wi-Fi và công tắc biểu ngữ cảnh báo khẩn cấp.
- **Tab 2 (`Tab2Logistics.jsx`)**: Quản lý hướng dẫn xe bus đoàn, lịch chạy xe Shuttle và thêm/sửa/xóa bảng giá hãng Taxi.
- **Tab 3 (`Tab3MapPoi.jsx`)**: Quản lý điểm tiện ích POI với cơ chế **click trực tiếp lên ảnh bản đồ `/crip-map.png`** để tự động gán tọa độ `X%`, `Y%` và chọn danh mục/icon.
- **Tab 4 (`Tab4Itinerary.jsx`)**: Biên tập lịch trình khám phá 4h / 6h / 8h, các điểm dừng và cảnh báo giờ quay về cảng.
- **Tab 5 (`Tab5Phrases.jsx`)**: Quản lý bộ thẻ giao tiếp tiếng Việt và cập nhật tỷ giá hối đoái (`USD`, `CNY`, `KRW`).
- **Tab 6 (`Tab6Emergency.jsx`)**: Quản lý danh bạ hotline cứu hộ SOS và nội dung thẻ *"Đưa tôi về Cảng"*.
- **Tab 7 (`Tab7Dictionary.jsx`)**: Biên tập từ điển giao diện đa ngôn ngữ (key–value cho `VI`, `EN`, `ZH`, `KR`).
- **Tab 8 (`Tab8DataOps.jsx`)**: Xem danh sách phản hồi khảo sát hành khách, **Xuất file JSON** sao lưu, **Nhập file JSON** khôi phục và **Khôi phục mặc định ban đầu**.

### C. PWA Ngoại tuyến & Đồng bộ Dữ liệu
- **Đồng bộ thời gian thực**: Mọi thay đổi ở `/admin` lưu vào `LocalStorage` (`CRIP_CONFIG_V1`) và phát đồng thời `CustomEvent` (cùng tab) + sự kiện `storage` (đa tab) để trang `/` cập nhật ngay lập tức.
- **Offline PWA**: Cấu hình `public/manifest.json` và `public/sw.js` (chiến lược Cache-First cho tài nguyên tĩnh bao gồm `/crip-map.png`, đăng ký trong `src/main.jsx` ở môi trường production).
- **Cấu hình sao lưu mẫu**: Có sẵn tệp `crip-config.json` tại thư mục gốc để kiểm thử nhập/xuất dữ liệu thực tế.

---

## 4. Cấu trúc Dự án Hiện tại

```text
CRIP-Smart-Guide/
├── .specify/                      # Spec Kit: constitution, templates, scripts, workflows
│   ├── memory/constitution.md
│   ├── scripts/powershell/
│   ├── templates/
│   └── workflows/
├── specs/001-crip-smart-guide/    # Bộ đặc tả chi tiết dự án
│   ├── spec.md
│   ├── plan.md
│   ├── tasks.md
│   ├── data-model.md
│   ├── research.md
│   ├── quickstart.md
│   ├── checklists/requirements.md
│   └── contracts/
│       ├── pwa-contract.md
│       └── storage-contract.md
├── public/
│   ├── crip-map.png               # Sơ đồ mặt bằng nhà ga cảng (đang sử dụng)
│   ├── manifest.json              # Web App Manifest (PWA)
│   ├── sw.js                      # Service Worker cache ngoại tuyến
│   └── images/
│       ├── crip-logo.svg
│       └── terminal-map.svg
├── src/
│   ├── main.jsx                   # Entry point & đăng ký Service Worker
│   ├── App.jsx                    # Router chính (/ và /admin)
│   ├── index.css                  # Tailwind directives & global styles
│   ├── context/
│   │   ├── ConfigContext.jsx      # State cấu hình CMS & helper dịch t()
│   │   └── LanguageContext.jsx    # State 4 ngôn ngữ (VI/EN/ZH/KR)
│   ├── data/
│   │   └── defaultConfig.js       # Hạt giống dữ liệu gốc 100% CMS
│   ├── utils/
│   │   ├── storage.js             # LocalStorage adapter, realtime sync, JSON import/export
│   │   ├── speech.js              # Phát âm tiếng Việt (Web Speech API)
│   │   └── currency.js            # Quy đổi tiền tệ ngoại tuyến
│   ├── pages/
│   │   ├── PassengerPage.jsx      # Giao diện Hành khách (/)
│   │   └── AdminPage.jsx          # Giao diện Quản trị (/admin)
│   └── components/
│       ├── common/                # Header, BottomBar, EmergencyModal
│       ├── passenger/             # ShipStatusCard, WifiBanner, LogisticsFlow, TerminalMap,
│       │                          # ItineraryList, PhraseCards, CurrencyCalc, FeedbackForm
│       └── admin/                 # AdminTabs, Tab1Ship .. Tab8DataOps
├── crip-config.json               # Tệp cấu hình JSON sao lưu mẫu
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── PROGRESS.md                    # Tài liệu tổng hợp tiến độ dự án
```

---

## 5. Hướng dẫn Chạy Cục bộ

```bash
# Cài đặt dependencies (nếu cần)
npm install

# Khởi chạy môi trường phát triển (http://localhost:5173)
npm run dev

# Build bản production (thư mục dist/)
npm run build

# Xem trước bản production cục bộ
npm run preview
```

> Lưu ý trên Windows PowerShell: nếu gặp lỗi ExecutionPolicy khi chạy `npm`, dùng `npm.cmd run dev` hoặc chạy một lần `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`.
