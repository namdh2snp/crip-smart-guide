# Implementation Plan: CRIP Smart Guide - Cẩm nang Thông minh Cảng Quốc tế Cam Ranh

**Branch**: `001-crip-smart-guide` | **Date**: 2026-11-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-crip-smart-guide/spec.md`

## Summary

Dự án **CRIP Smart Guide** là ứng dụng web cẩm nang thông minh dành cho hành khách tàu du lịch biển cập Cảng Quốc tế Cam Ranh, bao gồm hai giao diện phân định: Giao diện Hành khách (`/`) theo chuẩn Mobile-First, PWA Offline, và Giao diện Quản trị toàn phần (`/admin`) cho Ban điều hành cảng. Toàn bộ hệ thống tuân thủ nghiêm ngặt nguyên tắc **100% CMS-Driven**, mọi nội dung hiển thị đều đọc từ nguồn hạt giống `src/data/defaultConfig.js` và đồng bộ qua lớp trừu tượng `src/utils/storage.js` sử dụng `LocalStorage`. Khi quản trị viên chỉnh sửa tại `/admin`, giao diện hành khách tại `/` tự động cập nhật ngay lập tức qua cơ chế lắng nghe sự kiện `storage` và `CustomEvent`.

## Technical Context

**Language/Version**: JavaScript (ES2022+) / JSX với React 18+

**Primary Dependencies**:
- `react`, `react-dom` (v18+)
- `vite` (v5+ / v6+)
- `react-router-dom` (v6+)
- `tailwindcss` (v3+) + `@tailwindcss/forms`
- `lucide-react` (icon set đồng bộ)

**Storage**: LocalStorage của trình duyệt, được trừu tượng hóa qua `src/utils/storage.js` với fallback về `src/data/defaultConfig.js`. Sẵn sàng nâng cấp lên Supabase BaaS mà không làm vỡ UI contract.

**Testing**: Manual interactive testing, scenario walkthroughs, offline simulation (DevTools Network: Offline), cross-browser Speech Synthesis testing.

**Target Platform**: Trình duyệt di động (Mobile Web / PWA trên iOS Safari, Android Chrome, HarmonyOS, v.v.) và Desktop/Tablet cho giao diện Quản trị.

**Project Type**: Single-Page Application (SPA) + Progressive Web App (PWA) client-side only.

**Performance Goals**:
- First Contentful Paint (FCP) < 1.0s trên mobile cục bộ.
- Time to Interactive (TTI) < 1.5s.
- Thời gian chuyển đổi ngôn ngữ < 100ms.
- Dung lượng bộ nhớ cache offline < 15MB.

**Constraints**:
- Chạy 100% cục bộ (Local-First), không phụ thuộc vào internet hay dịch vụ đám mây bên ngoài.
- Hỗ trợ offline đầy đủ (PWA Service Worker + Manifest).
- Nhận diện thương hiệu chuẩn: Navy `#0A2540`, Teal `#00A896`, Bg `#F8FAFC`, SOS `#E63946`.
- Typography tối thiểu 16px cho body text.

**Scale/Scope**:
- 2 Route chính: `/` (Passenger Guide) và `/admin` (Admin Control Center với 8 Tabs).
- 4 Ngôn ngữ: VI (Tiếng Việt), EN (English), ZH (中文), KR (한국어).
- 1 Modal toàn màn hình "Đưa tôi về Cảng" & Danh bạ SOS.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Nguyên tắc Hiến pháp | Tiêu chí Kiểm định | Trạng thái | Đánh giá Tuân thủ |
|---|---|---|---|
| **I. 100% CMS-Driven** | Không hardcode văn bản tĩnh trong component hành khách | **PASS** | Mọi dữ liệu (tàu, taxi, bản đồ, POI, lịch trình, thẻ nói, danh bạ) đọc qua `storage.js` từ `defaultConfig.js`. |
| **II. Mobile-First & Offline PWA** | Tối ưu 360-430px, PWA Service Worker + Web App Manifest | **PASS** | Bố cục container mobile chuẩn, fixed header, bottom SOS bar, service worker cache toàn bộ static assets. |
| **III. Đa ngôn ngữ (VI/EN/ZH/KR)** | 4 ngôn ngữ, switch tức thì, lưu LocalStorage | **PASS** | Context/Hook `useLanguage` chuyển đổi không reload, từ điển chuẩn hóa 4 thứ tiếng. |
| **IV. Nhận diện thương hiệu** | Palette màu (#0A2540, #00A896, #F8FAFC, #E63946), min 16px text | **PASS** | Tích hợp trực tiếp vào cấu hình `tailwind.config.js`, áp dụng đồng bộ toàn ứng dụng. |
| **V. Local-First Execution** | Chạy độc lập trên máy cục bộ, không ép đẩy GitHub | **PASS** | Vite dev server + build cục bộ, file cấu hình và dữ liệu tự trị. |

## Project Structure

### Documentation (this feature)

```text
specs/001-crip-smart-guide/
├── plan.md              # Kế hoạch kỹ thuật tổng thể
├── research.md          # Kết quả nghiên cứu công nghệ & giải pháp
├── data-model.md        # Schema dữ liệu chi tiết defaultConfig.js & storage.js
├── quickstart.md        # Hướng dẫn khởi chạy và vận hành
└── contracts/
    ├── storage-contract.md   # Hợp đồng API tầng lưu trữ storage.js
    └── pwa-contract.md       # Đặc tả Service Worker & Web App Manifest
```

### Source Code (repository root)

```text
D:\CRIP/
├── index.html                     # Entry HTML, nạp font Inter & Noto Sans, manifest link
├── package.json                   # Dependencies & scripts (dev, build, preview)
├── vite.config.js                 # Cấu hình Vite bundler & PWA plugin/assets
├── tailwind.config.js             # Theme màu thương hiệu CRIP & typography
├── postcss.config.js              # PostCSS plugins cho Tailwind CSS
├── public/
│   ├── favicon.ico
│   ├── manifest.json              # Web App Manifest PWA
│   ├── sw.js                      # Service Worker cache tài nguyên offline
│   ├── icons/
│   │   ├── icon-192.png           # PWA App Icon 192x192
│   │   └── icon-512.png           # PWA App Icon 512x512
│   └── images/
│       ├── crip-logo.svg          # Logo Cảng Quốc tế Cam Ranh
│       └── terminal-map.svg       # Sơ đồ mặt bằng đồ họa Nhà ga Cảng
└── src/
    ├── main.jsx                   # Entry point React, BrowserRouter, Service Worker registration
    ├── App.jsx                    # Root component, Route switcher (/ vs /admin)
    ├── index.css                  # Tailwind directives & global font styles
    ├── data/
    │   └── defaultConfig.js       # Hạt giống dữ liệu gốc 100% chuẩn CMS (Tàu, Taxi, POI, Tour, Thẻ, Từ điển)
    ├── utils/
    │   ├── storage.js             # Lớp quản lý LocalStorage, đồng bộ sự kiện giữa các tab/cửa sổ
    │   ├── speech.js              # Utility phát âm tiếng Việt qua Web Speech API
    │   └── currency.js            # Tiện ích tính toán quy đổi ngoại tệ offline
    ├── context/
    │   ├── LanguageContext.jsx    # Quản lý trạng thái ngôn ngữ hiện hành (VI/EN/ZH/KR)
    │   └── ConfigContext.jsx      # Quản lý trạng thái cấu hình CMS trực tiếp cho toàn app
    ├── components/
    │   ├── common/
    │   │   ├── Header.jsx         # Thanh Header cố định: Logo, Chuyển ngôn ngữ, Nút SOS
    │   │   ├── BottomBar.jsx      # Thanh dock nổi dưới đáy: Nút "Đưa tôi về Cảng" & SOS
    │   │   ├── EmergencyModal.jsx # Modal toàn màn hình "Đưa tôi về Cảng" & Danh bạ hotline
    │   │   └── Toast.jsx          # Thông báo tương tác (Copy Wi-Fi, Nhắc nhở)
    │   ├── passenger/
    │   │   ├── ShipStatusCard.jsx # Thẻ trạng thái tàu, thời tiết & đếm ngược All Aboard
    │   │   ├── LogisticsFlow.jsx  # Tab Tour hãng tàu vs Tab Tự túc (Shuttle & Taxi)
    │   │   ├── TerminalMap.jsx    # Bản đồ tương tác, bộ lọc POI, popup thông tin
    │   │   ├── ItineraryList.jsx  # Danh sách tour 4h / 6h / 8h kèm mốc an toàn
    │   │   ├── PhraseCards.jsx    # Thẻ giao tiếp tiếng Việt khổ lớn & phát âm Web Speech
    │   │   ├── CurrencyCalc.jsx   # Máy tính đổi tiền offline VND sang USD/CNY/KRW
    │   │   ├── WifiBanner.jsx     # Banner thông tin Wi-Fi & nút sao chép mật khẩu
    │   │   └── FeedbackForm.jsx   # Khảo sát trải nghiệm 30s với biểu tượng mặt cười
    │   └── admin/
    │       ├── AdminTabs.jsx      # Điều hướng 8 tab quản trị
    │       ├── Tab1Ship.jsx       # Tab 1: Chuyến tàu, All Aboard, Wi-Fi & Cảnh báo khẩn
    │       ├── Tab2Logistics.jsx  # Tab 2: Phân luồng di chuyển & Bảng giá Taxi
    │       ├── Tab3MapPoi.jsx     # Tab 3: Sơ đồ & Điểm tiện ích (Click ảnh lấy tọa độ X%, Y%)
    │       ├── Tab4Itinerary.jsx  # Tab 4: Lịch trình 4h, 6h, 8h
    │       ├── Tab5Phrases.jsx    # Tab 5: Thẻ giao tiếp & Tỷ giá ngoại tệ
    │       ├── Tab6Emergency.jsx  # Tab 6: Danh bạ SOS & Thẻ "Đưa tôi về Cảng"
    │       ├── Tab7Dictionary.jsx # Tab 7: Từ điển 4 ngôn ngữ (VI/EN/ZH/KR)
    │       └── Tab8DataOps.jsx    # Tab 8: Danh sách khảo sát, Xuất/Nhập JSON & Reset
    └── pages/
        ├── PassengerPage.jsx      # Trang chủ khách du lịch (/)
        └── AdminPage.jsx          # Trang quản trị trung tâm (/admin)
```

**Structure Decision**: Chọn mô hình Single-Project SPA với React Router tách biệt rõ ràng giữa `/` (Passenger) và `/admin` (Admin), chia sẻ chung tầng dữ liệu `src/utils/storage.js` và `src/data/defaultConfig.js`. Mô hình này cho phép ứng dụng khởi động tức thì, hoạt động trơn tru ngoại tuyến và quản trị dữ liệu dễ dàng trong cùng một bản đóng gói gọn nhẹ.

## Complexity Tracking

Không có vi phạm nguyên tắc Hiến pháp nào cần biện minh. Toàn bộ thiết kế bám sát nguyên tắc tinh gọn và cục bộ.
