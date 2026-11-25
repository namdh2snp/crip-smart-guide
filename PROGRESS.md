# Tiến độ Dự án: CRIP Smart Guide

**Cẩm nang Thông minh Cảng Quốc tế Cam Ranh (Cam Ranh International Port - Smart Guide)**  
Cập nhật lần cuối: `2026-11-25` | Trạng thái tổng thể: **Hoàn thành 30/30 tác vụ (Phase 1 – Phase 5) • Đã nâng cấp Supabase Cloud + Realtime đa thiết bị, giao diện Hành khách theo Tab & sẵn sàng Deploy Vercel**

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
- **Thanh điều hướng Tab cố định (`PassengerTabs.jsx`)**: Ghim ngay dưới Header (`sticky top-16`), cuộn ngang mượt trên di động, tự căn giữa tab đang chọn, hỗ trợ 4 ngôn ngữ (`navShip`–`navSafety`–`navFeedback`) với 8 Tab chức năng độc lập; biểu ngữ cảnh báo khẩn cấp (khi bật từ Admin) hiển thị xuyên suốt trên mọi Tab:
  1. **Tàu & Wi-Fi** (`ShipStatusCard.jsx` + `WifiBanner.jsx`): Trạng thái tàu, cầu bến, thời tiết Cam Ranh, đếm ngược **All Aboard**, nhắc trước 60 phút và sao chép mật khẩu Wi-Fi 1 chạm.
  2. **Di chuyển** (`LogisticsFlow.jsx`): Tab **Đi theo Tour hãng tàu** (bãi đỗ xe bus đoàn) và Tab **Đi tự túc** (lịch xe Shuttle miễn phí & bảng cước Taxi niêm yết kèm hotline).
  3. **Bản đồ** (`TerminalMap.jsx`): Sơ đồ thực tế `/crip-map.png`, bộ lọc điểm tiện ích POI (ATM/Đổi tiền, SIM 4G, Y tế, Miễn thuế, WC, Shuttle Bus) và thẻ chi tiết khi chạm.
  4. **Lịch trình** (`ItineraryList.jsx`): Gợi ý tour tự túc **4 Giờ / 6 Giờ / 8 Giờ** tại Cam Ranh – Nha Trang kèm mốc giờ an toàn bắt buộc quay về cảng.
  5. **Thẻ nói** (`PhraseCards.jsx`): Các câu tiếng Việt khổ lớn kèm phiên âm quốc tế, bản dịch EN/ZH/KR và phát âm mẫu qua **Web Speech API** (`src/utils/speech.js`).
  6. **Đổi tiền** (`CurrencyCalc.jsx`): Quy đổi 2 chiều ngoại tuyến giữa `VND` và `USD`, `CNY`, `KRW` (`src/utils/currency.js`).
  7. **An toàn & SOS** (`SafetySosPanel.jsx`): **Bảng gọi khẩn cấp SOS 24/7** (gọi nhanh `113`/`114`/`115`, hotline cảng từ CMS, mở thẻ hồi cảng) và **Báo cáo an toàn kèm chụp ảnh hiện trường (tự nén Canvas) + định vị GPS tự động** gửi Realtime về `/admin`.
  8. **Khảo sát** (`FeedbackForm.jsx`): Đánh giá nhanh 30 giây bằng biểu tượng cảm xúc theo 3 tiêu chí, góp ý ngắn và lưu cục bộ.
- **Thanh dock đáy & Modal khẩn cấp (`BottomBar.jsx`, `EmergencyModal.jsx`)**: Luôn cố định trên mọi Tab với nút kích hoạt thẻ toàn màn hình *"LÀM ƠN ĐƯA TÔI VỀ CẢNG QUỐC TẾ CAM RANH"* và danh bạ hotline SOS.

### B. Giao diện Quản trị Toàn phần (`/admin`)
- **Xác thực Mã PIN Quản trị (`AdminPinGate.jsx`, `src/utils/adminAuth.js`)**: Khóa truy cập `/admin` bằng mã PIN (băm SHA-256 có salt, không lưu plaintext), hỗ trợ bàn phím số cảm ứng & bàn phím vật lý, ghi nhớ phiên **8 giờ** trên thiết bị (`LocalStorage`, tự thu hồi khi đổi PIN từ thiết bị khác qua Supabase Realtime), nút **Khóa nhanh** trên Header và cơ chế **tạm khóa 30 giây khi nhập sai 5 lần liên tiếp**.
- **Tab 1 (`Tab1Ship.jsx`)**: Cập nhật tên tàu, cầu bến, thời tiết, giờ cập/All Aboard/rời cảng, Wi-Fi và công tắc biểu ngữ cảnh báo khẩn cấp.
- **Tab 2 (`Tab2Logistics.jsx`)**: Quản lý hướng dẫn xe bus đoàn, lịch chạy xe Shuttle và thêm/sửa/xóa bảng giá hãng Taxi.
- **Tab 3 (`Tab3MapPoi.jsx`)**: Quản lý điểm tiện ích POI với cơ chế **click trực tiếp lên ảnh bản đồ `/crip-map.png`** để tự động gán tọa độ `X%`, `Y%` và chọn danh mục/icon.
- **Tab 4 (`Tab4Itinerary.jsx`)**: Biên tập lịch trình khám phá 4h / 6h / 8h, các điểm dừng và cảnh báo giờ quay về cảng.
- **Tab 5 (`Tab5Phrases.jsx`)**: Quản lý bộ thẻ giao tiếp tiếng Việt và cập nhật tỷ giá hối đoái (`USD`, `CNY`, `KRW`).
- **Tab 6 (`Tab6Emergency.jsx`)**: Quản lý (thêm/sửa/xóa) bảng hotline cứu hộ SOS 24/7 và nội dung thẻ *"Đưa tôi về Cảng"*.
- **Tab 7 (`Tab7Dictionary.jsx`)**: Biên tập từ điển giao diện đa ngôn ngữ (key–value cho `VI`, `EN`, `ZH`, `KR`).
- **Tab 8 (`Tab8DataOps.jsx`)**: Tiếp nhận và xử lý **Báo cáo An toàn hiện trường (Ảnh + GPS)** đồng bộ Realtime từ Supabase (phóng to ảnh, mở Google Maps, chuyển trạng thái *Mới / Đang xử lý / Đã xử lý*, huy hiệu đếm trên `AdminTabs.jsx`); **Đổi mã PIN quản trị** (4–8 chữ số, đồng bộ Supabase Cloud); xem phản hồi khảo sát, **Xuất/Nhập file JSON** và **Khôi phục mặc định**.

### C. Supabase Cloud, Realtime Đa thiết bị & PWA Ngoại tuyến
- **Lưu trữ tập trung Supabase (`@supabase/supabase-js`)**: Kết nối bảng `public.app_config` (dòng `id = 1`, cột `data`) tại `src/utils/storage.js`.
  - Khi tải `/` hoặc `/admin`: Ưu tiên đọc dữ liệu từ `app_config (id = 1)`. Nếu bảng đang trống, tự động trộn và đẩy dữ liệu khởi tạo từ `crip-config.json` + `src/data/defaultConfig.js` lên `id = 1`.
  - Khi bấm **Lưu** ở `/admin`: `upsert` trực tiếp lên `app_config (id = 1)`, đồng thời hiển thị thanh trạng thái **Supabase Cloud / Realtime: LIVE** trên `AdminPage.jsx`.
- **Đồng bộ Realtime đa thiết bị**: Lắng nghe `postgres_changes` của Supabase Realtime (`table: app_config`, `filter: id=eq.1`) kết hợp `CustomEvent` + `storage` event để mọi máy tính và điện thoại mở `/` tự động cập nhật ngay lập tức không cần reload.
- **Offline PWA**: Giữ nguyên bộ nhớ đệm `LocalStorage` (`CRIP_CONFIG_V1`) làm lớp fallback ngoại tuyến khi mất mạng; cấu hình `public/manifest.json` và `public/sw.js` (chiến lược Cache-First cho tài nguyên tĩnh bao gồm `/crip-map.png`, bỏ qua cache cho request `supabase.co`).
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
│   │   ├── storage.js             # Supabase (app_config) + Realtime + LocalStorage fallback & JSON I/O
│   │   ├── speech.js              # Phát âm tiếng Việt (Web Speech API)
│   │   └── currency.js            # Quy đổi tiền tệ ngoại tuyến
│   ├── pages/
│   │   ├── PassengerPage.jsx      # Giao diện Hành khách (/) hiển thị theo 8 Tab chức năng
│   │   └── AdminPage.jsx          # Giao diện Quản trị (/admin) kèm trạng thái Supabase Realtime
│   └── components/
│       ├── common/                # Header, BottomBar, EmergencyModal
│       ├── passenger/             # PassengerTabs, ShipStatusCard, WifiBanner, LogisticsFlow,
│       │                          # TerminalMap, ItineraryList, PhraseCards, CurrencyCalc,
│       │                          # SafetySosPanel, FeedbackForm
│       └── admin/                 # AdminTabs, Tab1Ship .. Tab8DataOps
├── crip-config.json               # Tệp cấu hình JSON sao lưu mẫu
├── vercel.json                    # Cấu hình SPA rewrite (/(.*) -> /index.html) cho Vercel
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

---

## 6. Nhật ký Cập nhật (Changelog)

### 2026-11-25
- **Thiết lập môi trường máy mới & GitHub (`02c8ac3`)**: Cài đặt Node.js LTS v26.13.1, kiểm thử `npm run build` & Vite dev server, khởi tạo Git nhánh `main`, tạo `PROGRESS.md` và đẩy toàn bộ dự án (kèm `.specify/`, `specs/`) lên `https://github.com/namdh2snp/crip-smart-guide`.
- **Nâng cấp lưu trữ Supabase Cloud & Realtime (`a719a1c`)**:
  - Cài `@supabase/supabase-js` và kết nối bảng `public.app_config` (`id = 1`, cột `data`).
  - Tự động đọc từ Supabase khi mở `/` hoặc `/admin`; tự khởi tạo dữ liệu mẫu từ `crip-config.json` + `defaultConfig.js` nếu bảng đang trống.
  - Ghi trực tiếp lên `app_config (id = 1)` khi lưu ở `/admin`, bật Supabase Realtime (`SUBSCRIBED`) đồng bộ tức thời sang mọi thiết bị mở `/`, đồng bộ state 8 tab Admin, thêm thanh trạng thái Cloud/Realtime trên `AdminPage.jsx`, và giữ `LocalStorage` + `sw.js` hoạt động ngoại tuyến.
- **Cấu hình Deploy Vercel (`692dddf`)**: Thêm `vercel.json` cấu hình rewrite mọi đường dẫn về `/index.html` để tránh lỗi 404 khi truy cập trực tiếp `/admin`.
- **Tái cấu trúc giao diện Hành khách theo Tab (`00ddbdf`)**:
  - Tạo thanh Tab cố định `PassengerTabs.jsx` chia các chức năng độc lập, bổ sung khóa từ điển 4 ngôn ngữ (`navShip`–`navFeedback`) trong `defaultConfig.js` và hiển thị cảnh báo khẩn cấp xuyên suốt mọi Tab.
- **Bổ sung Báo cáo An toàn (Chụp ảnh + GPS) & Bảng gọi khẩn cấp SOS 24/7 (`3833b62`)**:
  - Xây dựng `SafetySosPanel.jsx` tích hợp Tab thứ 8 (**An toàn & SOS**): Bảng gọi SOS 24/7 1 chạm (`113`/`114`/`115`, hotline cảng từ CMS, nút thẻ hồi cảng) và biểu mẫu báo cáo an toàn kèm chụp ảnh camera/thư viện (tự nén Canvas), định vị GPS tự động (kèm link Google Maps), phân loại sự cố & mức độ khẩn cấp đa ngôn ngữ VI/EN/ZH/KR.
  - Bổ sung API `submitSafetyReport`, `updateSafetyReportStatus`, `deleteSafetyReport` đồng bộ Realtime qua Supabase `app_config (id = 1)` (có cơ chế dự phòng chống tràn bộ nhớ `LocalStorage`).
  - Nâng cấp `/admin`: thêm bảng quản lý Báo cáo An toàn (phóng to ảnh, mở Google Maps, đổi trạng thái xử lý) ở `Tab8DataOps.jsx`, thêm huy hiệu số báo cáo mới trên `AdminTabs.jsx`, thêm chức năng thêm/xóa Hotline ở `Tab6Emergency.jsx`, và sửa lỗi thiếu import `ShieldAlert` trong `EmergencyModal.jsx`.
- **Hoàn thiện chuyển đổi sang Dự án Remote-Synced đa máy (`9a4de2c`)**:
  - Chuyển nốt dữ liệu **Khảo sát hành khách (`feedbacks`)** từ `LocalStorage` cục bộ lên đồng bộ **Supabase Cloud + Realtime** (`app_config id = 1`), bảo đảm 100% dữ liệu (Cấu hình + Báo cáo An toàn + Khảo sát) đồng bộ mọi máy.
  - Cập nhật Hiến pháp dự án `.specify/memory/constitution.md` lên **v1.1.0** phản ánh kiến trúc Remote-Synced (GitHub + Supabase + Vercel + Offline PWA).
  - Bổ sung `README.md` và `.env.example` hướng dẫn quy trình `git clone` / `git pull` / `git push` để làm việc liền mạch trên nhiều máy tính.
- **Cài đặt Mã PIN truy cập hệ thống quản trị (`/admin`)**:
  - Xây dựng tầng xác thực `src/utils/adminAuth.js` (băm SHA-256 có salt kèm fallback thuần JS cho mạng LAN/HTTP, không lưu plaintext PIN) và màn hình khóa `src/components/admin/AdminPinGate.jsx` (bàn phím số cảm ứng + hỗ trợ gõ phím vật lý).
  - Ghi nhớ phiên quản trị **8 giờ** trên thiết bị (`LocalStorage`), tự động thu hồi phiên trên các thiết bị khác khi đổi PIN qua Supabase Realtime, tích hợp nút **Khóa nhanh** trên Header của `AdminPage.jsx`, và khóa tạm **30 giây** khi nhập sai **5 lần liên tiếp**.
  - Bổ sung mục **8.2 Bảo mật & Đổi mã PIN quản trị** trong `Tab8DataOps.jsx` (cho phép đổi PIN 4–8 chữ số đồng bộ Supabase Cloud) và giữ nguyên mã PIN khi khôi phục dữ liệu mặc định hoặc nhập file backup cũ.
