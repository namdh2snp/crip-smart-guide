<!--
Sync Impact Report:
- Version change: 1.0.0 → 1.1.0
- List of modified principles:
  - I. Kiến trúc 100% CMS-Driven & Phân tách Dữ liệu → Nâng cấp tầng lưu trữ trung tâm sang Supabase Cloud + Realtime với LocalStorage offline cache
  - V. Vận hành Độc lập Cục bộ & Khả chuyển → Mở rộng thành Vận hành Đồng bộ Từ xa & Khả chuyển (Remote-Synced via GitHub/Supabase/Vercel + Portable Local Dev)
- Added sections: None
- Removed sections: None
- Follow-up TODOs: None
-->

# CRIP Smart Guide Constitution

Cẩm nang Thông minh Cảng Quốc tế Cam Ranh (Cam Ranh International Port - Smart Guide) phục vụ hành khách tàu du lịch biển quốc tế và nội địa.

## Core Principles

### I. Kiến trúc 100% CMS-Driven & Phân tách Dữ liệu (CMS-Driven & Zero Hardcoding)
- **Bắt buộc tuyệt đối (NON-NEGOTIABLE)**: Không hardcode bất kỳ nội dung tĩnh nào (thông tin cảng, dịch vụ ăn uống, bản đồ, địa điểm tham quan, thông báo, FAQ, lịch trình tàu) trực tiếp trong các React components của giao diện hành khách.
- Mọi dữ liệu hiển thị (cấu hình, báo cáo an toàn, khảo sát hành khách) phải bắt nguồn từ hạt giống cấu hình tại `src/data/defaultConfig.js` / `crip-config.json` và được quản lý qua lớp trừu tượng `src/utils/storage.js`, đồng bộ tập trung qua **Supabase Cloud (`app_config`) + Realtime** và tự động dự phòng bằng `LocalStorage` khi ngoại tuyến.
- Cấu trúc schema dữ liệu phải được module hóa chuẩn mực, cho phép quản trị viên chỉnh sửa trên giao diện `/admin` và đồng bộ tức thời đến mọi thiết bị mà không làm thay đổi hợp đồng giao diện người dùng (UI Contract).

### II. Thiết kế Mobile-First & Sẵn sàng Ngoại tuyến (Mobile-First & Offline PWA)
- **Bắt buộc tuyệt đối (NON-NEGOTIABLE)**: Giao diện người dùng phải được thiết kế và tối ưu hoá ưu tiên tuyệt đối cho thiết bị di động (Mobile-First, độ phân giải cơ sở 360px – 430px), đồng thời co giãn mượt mà trên Tablet và Desktop.
- Ứng dụng phải tích hợp khả năng hoạt động ngoại tuyến (Progressive Web App - PWA): du khách cập cảng thường không có sẵn kết nối Internet di động (SIM/4G/5G). Toàn bộ nội dung cốt lõi, biểu tượng, sơ đồ chỉ dẫn và số điện thoại hỗ trợ phải tải nhanh và khả dụng hoàn toàn khi mất kết nối mạng.

### III. Đa ngôn ngữ Tức thì (Real-time Multilingual Support - VI, EN, ZH, KR)
- **Bắt buộc tuyệt đối (NON-NEGOTIABLE)**: Hỗ trợ đầy đủ 4 ngôn ngữ chính của các tuyến du thuyền quốc tế cập cảng Cam Ranh:
  - Tiếng Việt (VI)
  - Tiếng Anh (EN)
  - Tiếng Trung (ZH)
  - Tiếng Hàn (KR)
- Thao tác chuyển đổi ngôn ngữ phải có hiệu lực ngay lập tức (instant switch) trên toàn bộ ứng dụng mà không yêu cầu reload trang. Ngôn ngữ được chọn phải được đồng bộ và ghi nhớ trong `LocalStorage`. Nếu một trường nội dung chưa có bản dịch tương ứng, hệ thống phải tự động fallback về Tiếng Anh (EN) hoặc Tiếng Việt (VI).

### IV. Nhận diện Thương hiệu & Trải nghiệm Thị giác (Brand Identity & Accessibility)
- **Bắt buộc tuyệt đối (NON-NEGOTIABLE)**: Tuân thủ nghiêm ngặt bảng màu thương hiệu đặc trưng của Cảng Quốc tế Cam Ranh:
  - **Xanh Hải Quân (`#0A2540`)**: Màu chủ đạo (Primary), mang lại cảm giác an tâm, vững chãi của cảng biển quân sự & quốc tế.
  - **Xanh Ngọc Cam Ranh (`#00A896`)**: Màu điểm nhấn (Secondary/Accent), phản ánh màu nước vịnh Cam Ranh tươi sáng, hiện đại.
  - **Nền sáng chống chói (`#F8FAFC`)**: Nền tổng thể (Background), thiết kế đặc thù giúp du khách dễ dàng quan sát thông tin dưới ánh nắng nhiệt đới chói chang của bờ biển.
  - **Đỏ Cam Khẩn cấp (`#E63946`)**: Chỉ định chuyên biệt cho nút bấm SOS, đường dây nóng hỗ trợ khẩn cấp y tế/an ninh và cảnh báo quan trọng.
- **Quy chuẩn Font & Typography**: Sử dụng bộ font `Inter` kết hợp `Noto Sans` (bảo đảm hiển thị sắc nét ký tự có dấu Tiếng Việt, chữ Hán giản thể/phồn thể và Hangeul tiếng Hàn). Cỡ chữ nội dung văn bản (body text) tối thiểu là `16px` để chống mỏi mắt và đảm bảo khả năng đọc nhanh khi du khách đang di chuyển.

### V. Vận hành Đồng bộ Từ xa & Khả chuyển Đa máy (Remote-Synced & Portable Execution)
- **Bắt buộc tuyệt đối (NON-NEGOTIABLE)**: Mã nguồn, lịch sử phát triển, bộ đặc tả (`.specify/`, `specs/`) và tiến độ (`PROGRESS.md`) phải được lưu trữ đồng bộ trên kho **GitHub Remote** (`origin/main`), triển khai tự động trên **Vercel**, và đồng bộ dữ liệu thời gian thực qua **Supabase Cloud**, cho phép clone và làm việc ngay trên bất kỳ máy tính nào chỉ bằng `git clone` → `npm install` → `npm run dev`.
- Stack công nghệ cốt lõi: `React` + `Vite` + `Tailwind CSS` + `React Router` + `Lucide Icons` + `@supabase/supabase-js`. Quá trình build và dev server phải khởi động nhanh, tinh gọn và vẫn giữ đầy đủ chế độ dự phòng ngoại tuyến (PWA).

## Tech Stack & Quy chuẩn Kiến trúc Kỹ thuật

1. **Framework & Bundler**: React 18+ cùng Vite nhằm tối ưu tốc độ render, Hot Module Replacement (HMR) và kích thước bundle gọn nhẹ.
2. **Styling**: Tailwind CSS với custom theme cấu hình sẵn toàn bộ mã màu thương hiệu (#0A2540, #00A896, #F8FAFC, #E63946) và font chữ chuẩn.
3. **Routing**: React Router hỗ trợ SPA routing mượt mà, kèm `vercel.json` rewrite để mọi đường dẫn (`/admin`) hoạt động chuẩn khi deploy.
4. **Icons**: Bộ biểu tượng `Lucide React` đồng nhất, trực quan, hỗ trợ nhận biết thông tin không cần qua rào cản ngôn ngữ.
5. **Data Layer**:
   - `src/data/defaultConfig.js` & `crip-config.json`: Nguồn dữ liệu hạt giống ban đầu cho danh mục, dịch vụ, địa điểm, bản đồ và từ điển 4 ngôn ngữ.
   - `src/utils/storage.js`: Adapter trừu tượng hóa kết nối **Supabase (`app_config`, Realtime `postgres_changes`)** kết hợp lớp cache dự phòng `LocalStorage`.

## Tiêu chuẩn Chất lượng & Trải nghiệm Du khách (Quality Gates)

- **Performance**: Thời gian First Contentful Paint (FCP) dưới 1.2s trên môi trường di động cục bộ.
- **Ergonomics & Touch Targets**: Mọi nút bấm, liên kết và điều hướng tương tác phải có kích thước vùng chạm tối thiểu 44x44px.
- **SOS Accessibility**: Phím gọi khẩn cấp SOS (`#E63946`) phải luôn tiếp cận được trong tối đa 1 thao tác chạm từ mọi màn hình chính.
- **Validation**: Đảm bảo không xảy ra hiện tượng vỡ bố cục khi chuyển đổi giữa các chuỗi văn bản có độ dài khác nhau giữa 4 ngôn ngữ (đặc biệt là tiếng Đức/Anh dài hơn so với tiếng Trung/Hàn).

## Governance

- **Hiến pháp là văn bản quy định tối cao**: Mọi kế hoạch kỹ thuật (`spec.md`, `plan.md`), danh sách công việc (`tasks.md`) và mã nguồn thực thi phải tuân thủ nghiêm ngặt các nguyên tắc được định nghĩa tại đây.
- **Quy trình sửa đổi**: Mọi sửa đổi nguyên tắc phải được ghi nhận vào tài liệu này, giải thích rõ nguyên nhân và nâng cấp số phiên bản tương ứng:
  - **MAJOR (X.0.0)**: Thay đổi căn bản về công nghệ nền tảng, loại bỏ nguyên tắc cốt lõi hoặc phá vỡ cấu trúc dữ liệu.
  - **MINOR (1.X.0)**: Bổ sung nguyên tắc mới, mở rộng hỗ trợ ngôn ngữ hoặc bổ sung module kiến trúc.
  - **PATCH (1.0.X)**: Hiệu chỉnh câu chữ, làm rõ hướng dẫn, sửa lỗi chính tả mà không làm thay đổi ý nghĩa quy định.

**Version**: 1.1.0 | **Ratified**: 2026-11-24 | **Last Amended**: 2026-11-25
