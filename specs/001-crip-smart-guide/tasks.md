---
description: "Task list for CRIP Smart Guide implementation"
---

# Tasks: CRIP Smart Guide - Cẩm nang Thông minh Cảng Quốc tế Cam Ranh

**Input**: Design documents from `specs/001-crip-smart-guide/` (`spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/`)

**Prerequisites**: plan.md (completed), spec.md (completed), data-model.md (completed), storage-contract.md (completed)

**Organization**: Các tác vụ được phân rã thành 5 giai đoạn độc lập, có thứ tự thực thi rõ ràng, sẵn sàng để triển khai tuần tự hoặc song song.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Có thể chạy song song (file độc lập, không phụ thuộc tác vụ trước trong cùng phase)
- **[Story]**: Đánh dấu liên kết User Story từ `spec.md` (US1, US2, US3, US4, US5)
- Đường dẫn file mã nguồn được chỉ định chính xác

---

## Phase 1: Khởi tạo Dự án & Cấu hình Nền tảng (Setup & Frameworks)

**Mục tiêu**: Thiết lập cấu trúc dự án React + Vite, cài đặt Tailwind CSS với bảng màu thương hiệu Cảng Quốc tế Cam Ranh, cấu hình React Router và thư viện Lucide Icons.

- [x] T001 Khởi tạo dự án Vite + React và khai báo đầy đủ dependencies trong `package.json` (`react`, `react-dom`, `react-router-dom`, `lucide-react`, `tailwindcss`, `postcss`, `autoprefixer`).
- [x] T002 [P] Cấu hình bảng màu nhận diện thương hiệu CRIP (`#0A2540`, `#00A896`, `#F8FAFC`, `#E63946`) và phông chữ Inter / Noto Sans trong `tailwind.config.js`, `postcss.config.js` và `src/index.css`.
- [x] T003 [P] Thiết lập khung định tuyến SPA với React Router (`/` cho Hành khách và `/admin` cho Quản trị) trong `src/main.jsx` và `src/App.jsx`.
- [x] T004 [P] Tạo các tài nguyên hình ảnh đồ họa cơ sở tại `public/images/crip-logo.svg` và `public/images/terminal-map.svg`.

**Checkpoint**: Ứng dụng khởi động được dev server `npm run dev`, hiển thị theme màu và định tuyến chuyển qua lại giữa `/` và `/admin`.

---

## Phase 2: Dữ liệu Mẫu & Lớp Lưu trữ Đồng bộ (Foundational Data & Storage Layer)

**Mục tiêu**: Xây dựng kho hạt giống dữ liệu `defaultConfig.js`, lớp lưu trữ trung tâm `storage.js` hỗ trợ đồng bộ sự kiện giữa các tab/cửa sổ, và các Context toàn cục.

- [x] T005 Xây dựng toàn bộ schema dữ liệu mẫu theo quy chuẩn CMS trong `src/data/defaultConfig.js` (Thông tin tàu Spectrum of the Seas, All Aboard 17:30, Wi-Fi, Phân luồng, Bảng giá Taxi, 5 điểm POI bản đồ, Lịch trình 4h/6h/8h, 6 Thẻ tiếng Việt, Tỷ giá ngoại tệ, Danh bạ SOS, và Từ điển đa ngôn ngữ VI/EN/ZH/KR).
- [x] T006 Xây dựng lớp quản lý lưu trữ `src/utils/storage.js` thực thi đầy đủ hợp đồng API (`getConfig`, `saveConfig`, `resetConfig`, `subscribeConfig`, `saveFeedback`, `getFeedbacks`, `exportConfig`, `importConfig`) kết hợp `window.localStorage`, sự kiện `storage` và `CustomEvent`.
- [x] T007 [P] Xây dựng `LanguageContext.jsx` (quản lý 4 ngôn ngữ VI/EN/ZH/KR, lưu nhớ tùy chọn) và `ConfigContext.jsx` (cung cấp live config từ `storage.js`) trong thư mục `src/context/`.
- [x] T008 [P] Xây dựng tiện ích phát âm tiếng Việt qua Web Speech API trong `src/utils/speech.js` và tiện ích tính toán quy đổi tiền tệ ngoại tuyến trong `src/utils/currency.js`.

**Checkpoint**: Tầng dữ liệu hoàn tất, các component có thể đọc/ghi cấu hình và chuyển đổi ngôn ngữ tức thời.

---

## Phase 3: Giao diện Hành khách (`/`) (Passenger Mobile-First Interface)

**Mục tiêu**: Xây dựng giao diện hành khách hoàn chỉnh, chuẩn Mobile-First, tích hợp đầy đủ tính năng tra cứu tàu, phân luồng, sơ đồ bản đồ, lịch trình tour, thẻ phát âm tiếng Việt, đổi tiền và SOS khẩn cấp.

- [x] T009 [P] [US1] Xây dựng thanh `src/components/common/Header.jsx` cố định trên cùng gồm Logo CRIP, bộ nút chuyển đổi nhanh 4 ngôn ngữ (VI/EN/ZH/KR) và nút gọi cứu trợ SOS.
- [x] T010 [P] [US1] Xây dựng thẻ trạng thái chuyến tàu `src/components/passenger/ShipStatusCard.jsx` hiển thị tên tàu, số hiệu cầu bến, thời tiết Cam Ranh, đồng hồ đếm ngược giờ All Aboard thời gian thực và nút "Nhắc tôi trước 60 phút".
- [x] T011 [P] [US1] Xây dựng thanh dock cố định dưới đáy `src/components/common/BottomBar.jsx` và modal khẩn cấp `src/components/common/EmergencyModal.jsx` hiển thị thẻ khổ lớn "LÀM ƠN ĐƯA TÔI VỀ CẢNG QUỐC TẾ CAM RANH" kèm danh bạ hotline SOS.
- [x] T012 [P] [US2] Xây dựng component phân luồng `src/components/passenger/LogisticsFlow.jsx` gồm Tab "Đi theo Tour hãng tàu" (hướng dẫn bãi đỗ xe bus) và Tab "Đi tự túc" (lịch xe Shuttle miễn phí & bảng giá Taxi niêm yết).
- [x] T013 [P] [US2] Xây dựng bản đồ mặt bằng nhà ga tương tác `src/components/passenger/TerminalMap.jsx` có bộ lọc tiện ích POI (ATM, SIM 4G, WC, Miễn thuế, Y tế, Shuttle Bus) và popup hiển thị chỉ dẫn lối đi.
- [x] T014 [P] [US3] Xây dựng danh mục lịch trình tham quan `src/components/passenger/ItineraryList.jsx` hiển thị gợi ý 4 Giờ, 6 Giờ, 8 Giờ tại Cam Ranh và Nha Trang kèm cảnh báo mốc giờ an toàn phải quay về cảng.
- [x] T015 [P] [US3] Xây dựng bộ thẻ giao tiếp bản địa `src/components/passenger/PhraseCards.jsx` khổ lớn với phiên âm và nút bấm phát âm giọng đọc tiếng Việt qua Web Speech API.
- [x] T016 [P] [US3] Xây dựng máy tính quy đổi tiền tệ ngoại tuyến `src/components/passenger/CurrencyCalc.jsx` chuyển đổi 2 chiều giữa VND và USD/CNY/KRW.
- [x] T017 [US4] Xây dựng `src/components/passenger/WifiBanner.jsx` (sao chép mật khẩu Wi-Fi 1-chạm), `src/components/passenger/FeedbackForm.jsx` (khảo sát trải nghiệm 30 giây với biểu tượng mặt cười) và tổng hợp toàn bộ trong `src/pages/PassengerPage.jsx`.

**Checkpoint**: Giao diện hành khách tại `/` hoạt động hoàn chỉnh, đáp ứng 100% các tiêu chí User Story 1, 2, 3, 4.

---

## Phase 4: Giao diện Quản trị Toàn phần (`/admin`) (Full CMS Admin Interface)

**Mục tiêu**: Xây dựng trung tâm điều hành `/admin` với 8 tab chuyên biệt, hỗ trợ cập nhật 100% dữ liệu hiển thị trên ứng dụng và tính năng click chuột trực tiếp lên ảnh sơ đồ để chấm tọa độ X%, Y%.

- [x] T018 Xây dựng layout trang quản trị `src/pages/AdminPage.jsx` và thanh điều hướng 8 phân hệ `src/components/admin/AdminTabs.jsx`.
- [x] T019 [P] [US5] Xây dựng `src/components/admin/Tab1Ship.jsx` biên tập thông tin tàu, cầu bến, giờ All Aboard, cấu hình Wi-Fi và công tắc kích hoạt biểu ngữ cảnh báo khẩn cấp.
- [x] T020 [P] [US5] Xây dựng `src/components/admin/Tab2Logistics.jsx` quản lý thông tin xe bus tour đoàn, lịch trình xe Shuttle và biểu mẫu Thêm/Sửa/Xóa các hãng taxi niêm yết.
- [x] T021 [P] [US5] Xây dựng `src/components/admin/Tab3MapPoi.jsx` quản lý điểm tiện ích POI tích hợp cơ chế click trực tiếp lên ảnh bản đồ để tự động lấy tọa độ phần trăm X%, Y% và chọn biểu tượng Lucide.
- [x] T022 [P] [US5] Xây dựng `src/components/admin/Tab4Itinerary.jsx` quản lý các tour lịch trình 4h/6h/8h, các điểm dừng chân và mốc giờ quay về cảng.
- [x] T023 [P] [US5] Xây dựng `src/components/admin/Tab5Phrases.jsx` quản lý danh sách câu giao tiếp và điều chỉnh tỷ giá hối đoái ngoại tệ (USD, CNY, KRW).
- [x] T024 [P] [US5] Xây dựng `src/components/admin/Tab6Emergency.jsx` quản lý danh bạ số hotline cứu hộ SOS và thông tin địa chỉ hiển thị trên thẻ "Đưa tôi về Cảng".
- [x] T025 [P] [US5] Xây dựng `src/components/admin/Tab7Dictionary.jsx` biên tập các khóa từ điển đa ngôn ngữ cho 4 thứ tiếng (VI, EN, ZH, KR).
- [x] T026 [P] [US5] Xây dựng `src/components/admin/Tab8DataOps.jsx` hiển thị bảng phản hồi khảo sát của du khách, tính năng Xuất file cấu hình JSON, Nhập file JSON khôi phục và nút Khôi phục mặc định ban đầu.

**Checkpoint**: Giao diện Quản trị `/admin` vận hành trơn tru, cho phép chỉnh sửa 100% nội dung và tương tác chấm tọa độ POI trực quan.

---

## Phase 5: Cấu hình PWA Ngoại tuyến & Kiểm thử Đồng bộ Dữ liệu (PWA, Verification & Polish)

**Mục tiêu**: Hoàn thiện cấu hình PWA cho phép sử dụng ngoại tuyến, xác nhận đồng bộ dữ liệu hai chiều tức thời giữa `/admin` và `/`, và kiểm định chất lượng tổng thể.

- [x] T027 Thiết lập cấu hình Web App Manifest tại `public/manifest.json` (tên ứng dụng, theme color `#0A2540`, background `#F8FAFC`, icon sizes 192/512) và liên kết trong `index.html`.
- [x] T028 Xây dựng Service Worker tại `public/sw.js` áp dụng chiến lược Cache-First cho static assets và đăng ký Service Worker trong `src/main.jsx`.
- [x] T029 Kiểm thử cơ chế đồng bộ tức thời: mở đồng thời `/admin` và `/` trên hai tab/cửa sổ, thay đổi tên tàu hoặc giờ All Aboard tại `/admin`, xác nhận trang `/` cập nhật ngay lập tức mà không cần reload.
- [x] T030 Thực hiện build production (`npm run build`), kiểm tra preview cục bộ (`npm run preview`), kiểm thử chế độ DevTools Offline và đánh giá độ phản hồi trên màn hình di động (360px - 430px).

---

## Dependencies & Execution Order

```
[Phase 1: Setup]
       │
       ▼
[Phase 2: Foundation (defaultConfig + storage.js)]
       │
       ├────────────────────────┐
       ▼                        ▼
[Phase 3: Passenger (/)]  [Phase 4: Admin (/admin)]
       │                        │
       └────────────────────────┘
                   │
                   ▼
[Phase 5: PWA Offline, Sync Testing & Polish]
```

### Opportunities for Parallel Execution
- Trong Phase 1: T002, T003, T004 có thể thực thi độc lập sau khi T001 hoàn thành.
- Trong Phase 2: T007 (Contexts) và T008 (Speech/Currency utilities) có thể làm song song sau khi có T005 và T006.
- Phase 3 và Phase 4 có thể triển khai song song hoặc nối tiếp vì cả hai đều dựa trên tầng dữ liệu thống nhất của Phase 2.
- Trong Phase 4: Các tab từ T019 đến T026 là các component con độc lập có thể triển khai song song.

---

## Implementation Strategy: MVP to Full Product

1. **MVP (Phát hành cốt lõi)**: Hoàn thành Phase 1 + Phase 2 + Phase 3 (Hành khách có thể xem giờ tàu, đếm ngược All Aboard, mở thẻ Đưa tôi về Cảng, xem bản đồ và nghe phát âm tiếng Việt).
2. **Full CMS & Admin**: Hoàn thành Phase 4 (Ban quản lý cảng có thể tùy biến toàn bộ dữ liệu, chấm tọa độ bản đồ trực quan, sao lưu dữ liệu JSON).
3. **PWA & Production Ready**: Hoàn thành Phase 5 (Sẵn sàng phục vụ du khách khi tàu cập bến mà không cần mạng internet).
