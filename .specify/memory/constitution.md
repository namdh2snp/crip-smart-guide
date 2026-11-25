<!--
Sync Impact Report:
- Version change: none (Template) → 1.0.0
- List of modified principles:
  - [PRINCIPLE_1_NAME] → I. Kiến trúc 100% CMS-Driven & Phân tách Dữ liệu (CMS-Driven & Zero Hardcoding)
  - [PRINCIPLE_2_NAME] → II. Thiết kế Mobile-First & Sẵn sàng Ngoại tuyến (Mobile-First & Offline PWA)
  - [PRINCIPLE_3_NAME] → III. Đa ngôn ngữ Tức thì (Real-time Multilingual Support - VI, EN, ZH, KR)
  - [PRINCIPLE_4_NAME] → IV. Nhận diện Thương hiệu & Trải nghiệm Thị giác (Brand Identity & Accessibility)
  - [PRINCIPLE_5_NAME] → V. Vận hành Độc lập Cục bộ & Khả chuyển (Local-First Execution & Portability)
- Added sections:
  - Tech Stack & Quy chuẩn Kiến trúc Kỹ thuật
  - Tiêu chuẩn Chất lượng & Trải nghiệm Du khách (Quality Gates)
- Removed sections: None
- Follow-up TODOs: None
-->

# CRIP Smart Guide Constitution

Cẩm nang Thông minh Cảng Quốc tế Cam Ranh (Cam Ranh International Port - Smart Guide) phục vụ hành khách tàu du lịch biển quốc tế và nội địa.

## Core Principles

### I. Kiến trúc 100% CMS-Driven & Phân tách Dữ liệu (CMS-Driven & Zero Hardcoding)
- **Bắt buộc tuyệt đối (NON-NEGOTIABLE)**: Không hardcode bất kỳ nội dung tĩnh nào (thông tin cảng, dịch vụ ăn uống, bản đồ, địa điểm tham quan, thông báo, FAQ, lịch trình tàu) trực tiếp trong các React components của giao diện hành khách.
- Mọi dữ liệu hiển thị phải bắt nguồn từ nguồn cấu hình trung tâm tại `src/data/defaultConfig.js` và được truy xuất qua lớp quản lý dữ liệu `src/utils/storage.js` dựa trên `LocalStorage`.
- Cấu trúc schema dữ liệu phải được module hóa chuẩn mực, cho phép quản trị viên chỉnh sửa trên giao diện nội bộ và đảm bảo khả năng nâng cấp lên giải pháp Backend-as-a-Service (như Supabase) trong tương lai mà không làm thay đổi hợp đồng giao diện người dùng (UI Contract).

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

### V. Vận hành Độc lập Cục bộ & Khả chuyển (Local-First Execution & Portability)
- **Bắt buộc tuyệt đối (NON-NEGOTIABLE)**: Ứng dụng vận hành độc lập hoàn toàn trên môi trường máy cục bộ (Local Environment). Mọi scripts, build pipeline và dependencies phải tự cung tự cấp, không yêu cầu bất kỳ ràng buộc nào về việc đẩy mã nguồn lên GitHub hay dịch vụ lưu trữ đám mây.
- Stack công nghệ cốt lõi: `React` + `Vite` + `Tailwind CSS` + `React Router` + `Lucide Icons`. Quá trình build và dev server phải khởi động nhanh, tinh gọn và không phụ thuộc dịch vụ ngoài.

## Tech Stack & Quy chuẩn Kiến trúc Kỹ thuật

1. **Framework & Bundler**: React 18+ cùng Vite nhằm tối ưu tốc độ render, Hot Module Replacement (HMR) và kích thước bundle gọn nhẹ.
2. **Styling**: Tailwind CSS với custom theme cấu hình sẵn toàn bộ mã màu thương hiệu (#0A2540, #00A896, #F8FAFC, #E63946) và font chữ chuẩn.
3. **Routing**: React Router hỗ trợ SPA routing mượt mà, chuyển trang không gián đoạn giữa các danh mục cẩm nang.
4. **Icons**: Bộ biểu tượng `Lucide React` đồng nhất, trực quan, hỗ trợ nhận biết thông tin không cần qua rào cản ngôn ngữ.
5. **Data Layer**:
   - `src/data/defaultConfig.js`: Nguồn dữ liệu hạt giống (seed data) ban đầu cho danh mục, dịch vụ, địa điểm và bản đồ.
   - `src/utils/storage.js`: Adapter trừu tượng hóa việc đọc/ghi dữ liệu vào `LocalStorage`, chuẩn bị sẵn interface để tích hợp Supabase SDK khi có nhu cầu.

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

**Version**: 1.0.0 | **Ratified**: 2026-11-24 | **Last Amended**: 2026-11-24
