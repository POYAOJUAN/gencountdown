# GenCountdown - 倒數計時器產生器

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

</div>

一個簡單易用的倒數計時器產生器，讓你輕鬆建立並匯出倒數計時器小工具，特別適合嵌入到 **Teachify 方案簡介**或其他網站。

## ✨ 功能特色

- 🎨 **三種主題風格** - Light、Dark、Colorful 任你選擇
- 🌈 **自定義配色** - 支援自訂背景色、文字色、漸層效果
- 📱 **精巧尺寸** - 293px × 50px 橫向設計，適合各種嵌入場景
- 🌏 **中文介面** - 天、時、分、秒完整中文顯示
- 💾 **本地儲存** - 使用 localStorage 管理倒數計時器
- 🔗 **一鍵匯出** - 自動產生 iframe 嵌入代碼
- ⚡ **即時更新** - 秒級精準倒數
- 🎯 **無需後端** - 純前端實作，透過 URL 參數傳遞資料
- 🗑️ **自由刪除** - 設定後可刪除資料，不影響已嵌入的顯示

## 🚀 快速開始

### 1. 克隆專案

```bash
git clone https://github.com/POYAOJUAN/gencountdown.git
cd gencountdown
```

### 2. 安裝依賴

使用 pnpm（推薦）：

```bash
pnpm install
```

或使用 npm：

```bash
npm install
```

### 3. 環境變數設定

複製 `.env.example` 為 `.env.local` 並設定你的環境變數：

```bash
cp .env.example .env.local
```

編輯 `.env.local`：

```bash
# 設定你的應用程式網址（用於產生嵌入代碼）
NEXT_PUBLIC_APP_URL=http://localhost:3000  # 開發環境
# NEXT_PUBLIC_APP_URL=https://your-domain.com  # 正式環境
```

### 4. 開發模式

```bash
pnpm dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

### 5. 建置專案

```bash
pnpm build
```

### 6. 執行正式環境

```bash
pnpm start
```

## 📖 使用方法

### 1. 建立倒數計時器

1. 點擊「**建立新的倒數**」按鈕
2. 填寫以下資訊：
   - **標題**: 倒數計時器的名稱（僅供管理用）
   - **小工具標題**: 顯示在倒數計時器上的標題
   - **目標日期**: 倒數的目標時間
   - **主題**: 選擇 Light、Dark 或 Colorful
   - **自定義顏色**（選填）：
     - 背景顏色
     - 文字顏色
     - 漸層起始色 / 結束色
3. 點擊「**儲存**」完成建立

### 2. 管理倒數計時器

- **編輯**: 點擊倒數計時器卡片上的「**編輯**」按鈕
- **刪除**: 點擊「**刪除**」按鈕移除倒數計時器
- **匯出**: 點擊「**匯出**」按鈕取得 iframe 嵌入代碼

> 💡 **提示**: 設定完成後可即時刪除資料，不影響已嵌入網站的倒數計時器顯示。

### 3. 嵌入到網站

複製 iframe 代碼並貼到你的網站 HTML 中（例如：Teachify 方案簡介）：

```html
<iframe
  src="https://your-domain.com/embed?title=新年倒數&date=2025-12-31T23:59:59&theme=colorful"
  width="293"
  height="50"
  style="border:none; overflow:hidden; border-radius:12px; background:transparent;"
  scrolling="no"
  allowtransparency="true">
</iframe>
```

### URL 參數說明

| 參數 | 必填 | 說明 | 範例 |
|------|------|------|------|
| `title` | ✅ | 小工具顯示標題 | `新年倒數` |
| `date` | ✅ | 目標日期（ISO 8601） | `2025-12-31T23:59:59` |
| `theme` | ✅ | 主題 | `light` / `dark` / `colorful` |
| `bg` | ❌ | 自定義背景顏色 | `%23000000` (HEX 編碼) |
| `text` | ❌ | 自定義文字顏色 | `%23ffffff` |
| `gFrom` | ❌ | 漸層起始色 | `%23ff0000` |
| `gTo` | ❌ | 漸層結束色 | `%2300ff00` |

## 🛠️ 技術棧

- [Next.js 15](https://nextjs.org/) - React 框架
- [HeroUI](https://heroui.com/) - UI 組件庫
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [TypeScript](https://www.typescriptlang.org/) - 型別安全
- [Framer Motion](https://www.framer.com/motion/) - 動畫庫

## 📁 專案結構

```
gencountdown/
├── app/
│   ├── embed/               # Embed 頁面（用於 iframe）
│   │   ├── layout.tsx       # Embed layout（無 navbar）
│   │   └── page.tsx         # Embed 倒數顯示頁面
│   ├── page.tsx             # 主頁面（管理介面）
│   ├── layout.tsx           # 根 layout
│   ├── providers.tsx        # Theme Provider
│   └── error.tsx            # 錯誤處理頁面
├── components/
│   ├── CountdownWidget.tsx  # 倒數計時器小工具
│   ├── CountdownForm.tsx    # 建立/編輯表單
│   ├── navbar.tsx           # 導航欄
│   ├── theme-switch.tsx     # 主題切換器
│   └── icons.tsx            # 圖標組件
├── hooks/
│   └── useCountdowns.ts     # localStorage 管理 hook
├── config/
│   ├── site.ts              # 網站設定
│   └── fonts.ts             # 字體設定
├── styles/
│   └── globals.css          # 全域樣式
└── .env.example             # 環境變數範例
```

## 🎯 核心功能說明

### LocalStorage 資料管理

倒數計時器資料儲存在瀏覽器的 localStorage 中，結構如下：

```typescript
interface Countdown {
  id: string;
  title: string;              // 管理用標題
  widgetTitle?: string;        // 小工具顯示標題
  targetDate: string;          // ISO 8601 格式
  theme: 'light' | 'dark' | 'colorful';
  backgroundColor?: string;    // 自定義背景色
  textColor?: string;          // 自定義文字色
  gradientFrom?: string;       // 漸層起始色
  gradientTo?: string;         // 漸層結束色
}
```

### Embed 頁面運作原理

1. 主頁面建立倒數計時器後，點擊「匯出」產生 iframe 代碼
2. iframe 指向 `/embed` 路由，透過 URL 參數傳遞設定
3. Embed 頁面讀取 URL 參數並渲染倒數計時器
4. **無需資料庫**：所有資料透過 URL 傳遞，刪除 localStorage 不影響已嵌入的小工具

## 📝 License

Licensed under the [MIT license](https://github.com/POYAOJUAN/gencountdown/blob/main/LICENSE).

## 👤 作者

[POYAOJUAN](https://github.com/POYAOJUAN)
