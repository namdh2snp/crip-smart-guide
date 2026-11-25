# Research & Technical Solutions: CRIP Smart Guide

**Feature**: `specs/001-crip-smart-guide`
**Created**: 2026-11-24

## 1. Cơ chế Đồng bộ Dữ liệu Tức thời qua LocalStorage

### Bối cảnh & Thách thức
Theo quy chuẩn của trình duyệt web:
- Sự kiện chuẩn `window.addEventListener('storage', handler)` chỉ kích hoạt trên các **tab hoặc cửa sổ khác** cùng origin khi LocalStorage thay đổi, nhưng **không** tự động bắn sự kiện trên chính tab vừa thực hiện lệnh `setItem`.
- Trong môi trường thực tế tại Cảng, nhân viên trực ban có thể mở `/admin` trên một tab và màn hình hiển thị hoặc tab khác mở `/`; hoặc người dùng chuyển qua lại giữa hai route trên cùng một tab SPA.

### Giải pháp Kỹ thuật
Xây dựng lớp `src/utils/storage.js` với mô hình Publish-Subscribe kết hợp:
1. Khi có thao tác ghi dữ liệu `storage.save(key, value)`:
   - Ghi dữ liệu vào `window.localStorage.setItem(key, JSON.stringify(value))`.
   - Phát sự kiện nội bộ `window.dispatchEvent(new CustomEvent('crip-config-changed', { detail: { key, value } }))` để cập nhật ngay lập tức các component trên cùng tab mà không cần chờ.
2. Khi khởi tạo ứng dụng:
   - Đăng ký đồng thời cả `window.addEventListener('storage', ...)` (đón nhận cập nhật từ tab Admin khác) và `window.addEventListener('crip-config-changed', ...)` (đón nhận cập nhật trong cùng tab).
3. Fallback: Nếu LocalStorage rỗng hoặc bị người dùng xóa cache, tự động nạp dữ liệu gốc từ `defaultConfig.js` và khôi phục vào LocalStorage.

---

## 2. Phát âm Tiếng Việt Ngoại tuyến qua Web Speech API

### Bối cảnh & Thách thức
Du khách quốc tế cập cảng Cam Ranh (Nha Trang) thường không thể phát âm chuẩn các thanh điệu tiếng Việt ("Bao nhiêu tiền", "Đưa tôi về Cảng Quốc tế Cam Ranh"). Ứng dụng cần hỗ trợ phát âm trực tiếp ngay cả khi không có kết nối Internet để gọi Google TTS API hay các dịch vụ đám mây.

### Giải pháp Kỹ thuật
Sử dụng chuẩn `window.speechSynthesis` tích hợp sẵn trong trình duyệt (Chrome, Safari, Edge):
1. Khởi tạo đối tượng `SpeechSynthesisUtterance(text)`.
2. Thiết lập `utterance.lang = 'vi-VN'`.
3. Kiểm tra danh sách giọng đọc cục bộ qua `window.speechSynthesis.getVoices()`. Nếu có giọng đọc tiếng Việt (như "Google Tiếng Việt", "Linh", "An", v.v.), gắn trực tiếp `utterance.voice`.
4. Thiết lập tốc độ đọc vừa phải (`rate: 0.9`) để người nghe bản xứ và tài xế taxi dễ tiếp thu.
5. Xử lý suy biến mềm (Graceful degradation): Nếu thiết bị không hỗ trợ âm thanh tiếng Việt, giao diện hiển thị thẻ chữ lớn siêu nét có phiên âm Latin rõ ràng để tài xế có thể đọc trực tiếp.

---

## 3. Bản đồ Nhà ga Cảng & Cơ chế Chấm Tọa độ Phần trăm (X%, Y%)

### Bối cảnh & Thách thức
Sơ đồ mặt bằng nhà ga cảng có kích thước co giãn theo từng kích cỡ màn hình di động, máy tính bảng hoặc laptop. Nếu lưu tọa độ điểm tiện ích bằng pixel cố định (`px`), vị trí điểm POI sẽ bị lệch khi kích thước ảnh thay đổi.

### Giải pháp Kỹ thuật
1. Sử dụng hệ tọa độ tương đối theo tỉ lệ phần trăm (`0%` đến `100%`) cho cả trục X và trục Y.
2. Trên giao diện Quản trị (`Tab3MapPoi.jsx`):
   - Đặt ảnh sơ đồ nhà ga trong một container có `position: relative`.
   - Bắt sự kiện `onClick(event)` trên ảnh bản đồ:
     ```javascript
     const rect = event.currentTarget.getBoundingClientRect();
     const x = Math.round(((event.clientX - rect.left) / rect.width) * 100);
     const y = Math.round(((event.clientY - rect.top) / rect.height) * 100);
     ```
   - Tự động điền giá trị `x%` và `y%` vào form POI mới.
3. Trên giao diện Hành khách (`TerminalMap.jsx`):
   - Đặt marker với style `left: ${poi.x}%`, `top: ${poi.y}%`, `transform: translate(-50%, -50%)`.
   - Vị trí của các điểm tiện ích (ATM, WC, SIM, Miễn thuế, Y tế, Shuttle Bus) luôn chuẩn xác 100% ở mọi tỉ lệ màn hình.

---

## 4. Kiến trúc Offline PWA & Service Worker

### Bối cảnh & Thách thức
Du khách cập cảng quốc tế Cam Ranh từ tàu du lịch biển thường chưa kích hoạt chuyển vùng dữ liệu (roaming) hoặc chưa mua SIM địa phương, do đó cần truy cập ứng dụng mượt mà không cần mạng.

### Giải pháp Kỹ thuật
1. **Web App Manifest (`public/manifest.json`)**:
   - `display: "standalone"`, `start_url: "/"`.
   - `theme_color: "#0A2540"` (Xanh Hải Quân), `background_color: "#F8FAFC"`.
   - Khai báo bộ icons 192x192 và 512x512.
2. **Service Worker (`public/sw.js`)**:
   - Chiến lược bộ nhớ đệm: **Cache-First** đối với các tài nguyên tĩnh (HTML, CSS, JS, SVG, Web Fonts) và **Stale-While-Revalidate** đối với các tài nguyên cập nhật.
   - Khi mất kết nối mạng hoàn toàn, service worker trả về toàn bộ tài nguyên đã lưu đệm, đảm bảo trải nghiệm không gián đoạn.
