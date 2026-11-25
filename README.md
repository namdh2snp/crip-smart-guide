# CRIP Smart Guide — Cẩm nang Thông minh Cảng Quốc tế Cam Ranh

Ứng dụng web PWA đa ngôn ngữ (`VI` / `EN` / `ZH` / `KR`) phục vụ hành khách tàu du lịch biển quốc tế và nội địa cập **Cảng Quốc tế Cam Ranh (Cam Ranh International Port - CRIP)**, gồm 2 giao diện tách biệt:
- **`/` — Giao diện Hành khách (Mobile-First, 8 Tab chức năng)**: Thông tin tàu & đếm ngược All Aboard, Wi-Fi 1 chạm, Phân luồng Tour/Shuttle/Taxi, Bản đồ nhà ga tương tác, Lịch trình 4h/6h/8h, Thẻ giao tiếp tiếng Việt (Web Speech), Máy tính đổi tiền ngoại tuyến, **Báo cáo An toàn (Ảnh + GPS) & Bảng gọi SOS 24/7**, và Khảo sát 30 giây.
- **`/admin` — Trung tâm Quản trị CMS (8 Tab, bảo vệ bằng Mã PIN)**: Xác thực **Mã PIN** (băm SHA-256 đồng bộ Supabase, ghi nhớ phiên 8 giờ, nút **Khóa nhanh**, tạm khóa 30s khi sai 5 lần, đổi PIN trong Tab 8); biên tập 100% nội dung ứng dụng, chấm tọa độ POI trực tiếp trên ảnh sơ đồ, quản lý danh bạ SOS 24/7, tiếp nhận **Báo cáo An toàn (Ảnh + GPS)** & **Khảo sát** theo thời gian thực qua Supabase Realtime, và sao lưu/phục hồi JSON.

---

## Kiến trúc Đồng bộ Từ xa (Remote-Synced Architecture)

Dự án được đồng bộ toàn diện trên 3 lớp để dễ dàng làm việc trên nhiều máy tính và thiết bị cùng lúc:

| Lớp | Nền tảng | Vai trò |
|---|---|---|
| **Mã nguồn & Lịch sử làm việc** | GitHub (`namdh2snp/crip-smart-guide`, nhánh `main`) | Lưu mã nguồn, lịch sử commit, bộ đặc tả `.specify/`, `specs/` và nhật ký tiến độ `PROGRESS.md` |
| **Cơ sở dữ liệu & Realtime** | Supabase Cloud (`public.app_config`, `id = 1`) | Đồng bộ tức thời cấu hình CMS, Báo cáo An toàn (Ảnh + GPS) và Khảo sát khách hàng giữa `/admin` và mọi thiết bị mở `/` (có cache `LocalStorage` dự phòng ngoại tuyến) |
| **Triển khai trực tuyến** | Vercel (`vercel.json`) | Tự động build & deploy mỗi khi `git push` lên nhánh `main`, hỗ trợ SPA rewrite cho `/admin` |

---

## Khởi chạy nhanh trên máy tính mới

Yêu cầu: **Node.js LTS** (v18+) và **Git**.

```bash
# 1. Tải toàn bộ dự án + lịch sử làm việc từ GitHub
git clone https://github.com/namdh2snp/crip-smart-guide.git
cd crip-smart-guide

# 2. Cài đặt thư viện
npm install

# 3. Khởi chạy môi trường phát triển (http://localhost:5173)
npm run dev
```

Các lệnh khác:
```bash
npm run build    # Build bản production (thư mục dist/)
npm run preview  # Xem trước bản production cục bộ
```

> **Lưu ý trên Windows PowerShell**: Nếu PowerShell chặn script `npm.ps1`, dùng `npm.cmd run dev` hoặc chạy một lần:
> `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`

---

## Quy trình đồng bộ khi chuyển giữa nhiều máy tính

- **Trước khi bắt đầu làm việc trên máy khác**:
  ```bash
  git pull origin main
  npm install
  ```
- **Sau khi hoàn thành công việc trên máy hiện tại**:
  ```bash
  git add .
  git commit -m "mo ta thay doi"
  git push origin main
  ```
- **Lưu ý về ngữ cảnh cho AI / thành viên nhóm**: Toàn bộ quy chuẩn kiến trúc, đặc tả và tiến độ mới nhất được lưu trực tiếp trong `.specify/memory/constitution.md`, `specs/001-crip-smart-guide/` và `PROGRESS.md`.

---

## Biến môi trường tùy chọn (`.env`)

Ứng dụng đã cấu hình sẵn kết nối Supabase của dự án trong `src/utils/storage.js` nên có thể chạy ngay sau khi `git clone`. Nếu cần đổi sang dự án Supabase khác, tạo tệp `.env.local` (đã được `.gitignore` loại trừ) theo mẫu `.env.example`:

```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```
