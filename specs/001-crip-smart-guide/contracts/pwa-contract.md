# PWA & Offline Specification: `manifest.json` & `sw.js`

**Feature**: `specs/001-crip-smart-guide`
**Created**: 2026-11-24

## 1. Web App Manifest (`public/manifest.json`)
```json
{
  "name": "CRIP Smart Guide - Cảng Quốc tế Cam Ranh",
  "short_name": "CRIP Guide",
  "description": "Cẩm nang thông minh Cảng Quốc tế Cam Ranh dành cho hành khách tàu du lịch biển",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F8FAFC",
  "theme_color": "#0A2540",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 2. Service Worker Strategy (`public/sw.js`)
- **Cache Name**: `crip-cache-v1`
- **Cache Targets**:
  - `index.html`
  - `/`
  - `/manifest.json`
  - Toàn bộ bundled JS & CSS từ Vite output
  - SVG Assets: `crip-logo.svg`, `terminal-map.svg`
- **Lifecycle**:
  - `install`: Nạp trước (pre-cache) các tài nguyên thiết yếu và gọi `skipWaiting()`.
  - `activate`: Dọn dẹp cache cũ không khớp `crip-cache-v1` và gọi `clients.claim()`.
  - `fetch`: Áp dụng chiến lược Cache-First cho static assets; Network-First có fallback về Cache cho navigation requests.
