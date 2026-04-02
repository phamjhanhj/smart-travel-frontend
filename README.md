# smart-travel-frontend

Angular + Ionic frontend for Smart Travel Recommendation System

## Hướng dẫn build và chạy dự án

### 1. Cài đặt dependencies

```bash
npm install
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
