# Smart Travel Frontend — Hướng dẫn setup

### 1. Cài đặt dependencies

```bash
npm install @capacitor/preferences
npm install @angular/cdk@20.2.14
npm install leaflet
npm install --save-dev @types/leaflet
```

### 2. Chạy ứng dụng web (localhost)

```bash
npm start
# hoặc
ionic serve
```

### 3. Build và chạy app Android

```bash
# Build web assets
npm run build

# Đồng bộ với Android
npx cap sync android

# Mở Android Studio để build/run
npx cap open android
```

Sau khi mở Android Studio, bạn có thể build hoặc chạy app trên thiết bị/emulator.

## 4. Live reload Android

```bash
ionic capacitor run android --livereload --external
```

## 5. Cấu hình API URL

Sửa `src/environments/environment.ts`:
- Dev:  `apiUrl: 'http://localhost:8000/api'`
- Android thật (cùng mạng): `apiUrl: 'http://192.168.x.x:8000/api'`
- Prod: sửa `environment.prod.ts`

## 6. Thứ tự implement feature

1. `features/trips/trip-list` — danh sách chuyến đi
2. `features/trips/trip-create` — tạo chuyến đi mới
3. `features/trips/trip-detail` — chi tiết + tab điều hướng
4. `features/planner/day-plan` — lịch trình từng ngày
5. `features/ai-chat` — chat AI với SSE stream
6. `features/budget` — theo dõi ngân sách
7. `features/location` — tìm địa điểm + bản đồ Leaflet