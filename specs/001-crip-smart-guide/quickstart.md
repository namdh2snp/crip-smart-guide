# Quickstart Guide: CRIP Smart Guide

**Feature**: `specs/001-crip-smart-guide`
**Created**: 2026-11-24

## 1. Yêu cầu Môi trường
- Node.js version 18.x hoặc 20.x+
- Trình quản lý gói `npm` (hoặc `pnpm` / `yarn`)

## 2. Khởi tạo & Cài đặt Thư viện
```bash
# Cài đặt các dependencies cần thiết
npm install
```

Danh mục dependencies cốt lõi:
- `react`, `react-dom`
- `react-router-dom`
- `lucide-react`
- Dev dependencies: `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`

## 3. Khởi chạy Ứng dụng Cục bộ
```bash
# Chạy máy chủ phát triển Vite dev server
npm run dev
```
Trình duyệt sẽ mở tại: `http://localhost:5173/` (hoặc cổng Vite thông báo).

## 4. Kiểm thử Chức năng
1. **Giao diện Hành khách (`/`)**:
   - Mở `http://localhost:5173/`.
   - Kiểm tra Header: thử bấm chuyển đổi 4 cờ ngôn ngữ (VI, EN, ZH, KR).
   - Xem đồng hồ All Aboard đếm ngược, bấm "Nhắc tôi trước 60 phút".
   - Chuyển tab Tour vs Tự túc, bấm xem chi tiết điểm tiện ích trên sơ đồ nhà ga.
   - Bấm nút Loa phát âm tiếng Việt trên các Thẻ giao tiếp.
   - Thử tính năng quy đổi ngoại tệ sang VND.
   - Bấm nút cố định dưới chân màn hình "Đưa tôi về Cảng" để mở modal khẩn cấp.
2. **Giao diện Quản trị (`/admin`)**:
   - Mở `http://localhost:5173/admin`.
   - Chuyển qua 8 tabs: chỉnh sửa tên tàu hoặc giá cước taxi.
   - Mở lại tab hành khách để quan sát dữ liệu cập nhật tức thời mà không cần reload.
   - Tại Tab 3, nhấp chuột lên ảnh bản đồ để xác nhận tọa độ X%, Y% được tự động điền.
3. **Kiểm thử Ngoại tuyến (PWA Offline)**:
   - Trong Chrome DevTools > Network > chọn **Offline**.
   - Tải lại trang: Ứng dụng vẫn hiển thị đầy đủ thông tin, bản đồ, thẻ tiếng Việt và máy tính đổi tiền.
