# Storage Layer Contract: `src/utils/storage.js`

**Feature**: `specs/001-crip-smart-guide`
**Created**: 2026-11-24

Lớp `storage.js` chịu trách nhiệm đóng vai trò làm Data Access Layer (DAL) trung tâm cho toàn bộ ứng dụng CRIP Smart Guide.

## Key Constants
- `STORAGE_KEY = 'CRIP_CONFIG_V1'`
- `FEEDBACK_KEY = 'CRIP_FEEDBACK_V1'`
- `CUSTOM_EVENT_NAME = 'crip-config-changed'`

## Public Methods

### 1. `getConfig(): AppConfig`
- **Mục đích**: Trả về toàn bộ đối tượng cấu hình hiện tại.
- **Thuật toán**:
  - Đọc chuỗi JSON từ `localStorage.getItem(STORAGE_KEY)`.
  - Nếu tồn tại và parse thành công, merge với `defaultConfig` (đảm bảo không bị thiếu key mới nếu có cập nhật code).
  - Nếu không tồn tại hoặc lỗi cú pháp JSON: ghi `defaultConfig` vào `localStorage` và trả về `defaultConfig`.

### 2. `saveConfig(newConfig: AppConfig): void`
- **Mục đích**: Lưu cấu hình đã chỉnh sửa từ `/admin`.
- **Thuật toán**:
  - `localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig))`.
  - Bắn sự kiện nội bộ: `window.dispatchEvent(new CustomEvent(CUSTOM_EVENT_NAME, { detail: newConfig }))`.
  - Đồng thời cập nhật trạng thái runtime.

### 3. `resetConfig(): AppConfig`
- **Mục đích**: Khôi phục cấu hình về giá trị ban đầu của cảng (`defaultConfig`).
- **Thuật toán**:
  - Xóa khóa `STORAGE_KEY` hoặc ghi đè bằng `defaultConfig`.
  - Bắn sự kiện `CUSTOM_EVENT_NAME`.
  - Trả về `defaultConfig`.

### 4. `subscribeConfig(listener: (config: AppConfig) => void): () => void`
- **Mục đích**: Cho phép các component React đăng ký lắng nghe thay đổi cấu hình.
- **Thuật toán**:
  - Lắng nghe cả 2 sự kiện:
    1. `window.addEventListener('storage', (e) => { if (e.key === STORAGE_KEY) listener(getConfig()); })` (nghe từ tab khác).
    2. `window.addEventListener(CUSTOM_EVENT_NAME, (e) => listener(e.detail))` (nghe trong cùng tab).
  - Trả về hàm cleanup `unsubscribe()`.

### 5. `saveFeedback(feedbackItem: FeedbackRecord): void`
- **Mục đích**: Lưu trữ phản hồi khảo sát 30 giây của du khách vào danh sách `CRIP_FEEDBACK_V1`.

### 6. `getFeedbacks(): FeedbackRecord[]`
- **Mục đích**: Đọc danh sách tất cả phản hồi khảo sát để hiển thị tại Tab 8 trên `/admin`.

### 7. `exportConfig(): string` & `importConfig(jsonString: string): boolean`
- **Mục đích**: Xuất file JSON sao lưu và nạp phục hồi cấu hình từ file tải lên.
