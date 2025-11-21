# GenCountdown - 倒數計時器產生器

一個簡單易用的倒數計時器產生器，讓你輕鬆建立並匯出倒數計時器小工具。

## ✨ 功能特色

- 🎨 **三種主題** - Light、Dark、Colorful
- 📱 **橫向顯示** - 293px x 50px 的精巧設計
- 🌏 **中文介面** - 天、時、分、秒顯示
- 💾 **本地儲存** - 使用 localStorage 儲存倒數計時器
- 🔗 **iframe 匯出** - 一鍵產生嵌入代碼
- ⚡ **即時更新** - 秒級更新倒數計時
- 🎯 **無需後端** - 純前端實作，透過 URL 參數傳遞資料

## 🚀 快速開始

### 安裝依賴

使用 pnpm（推薦）：

```bash
pnpm install
```

或使用 npm：

```bash
npm install
```

### 開發模式

```bash
pnpm dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

### 建置專案

```bash
pnpm build
```

### 執行正式環境

```bash
pnpm start
```

## 📖 使用方法

### 1. 建立倒數計時器

1. 點擊「Create New Countdown」按鈕
2. 輸入標題、選擇目標日期和主題
3. 點擊「Save」儲存

### 2. 管理倒數計時器

- **編輯**: 點擊倒數計時器卡片上的「Edit」按鈕
- **刪除**: 點擊「Delete」按鈕移除倒數計時器
- **匯出**: 點擊「Export」按鈕取得 iframe 嵌入代碼

### 3. 嵌入到網站

複製 iframe 代碼並貼到你的網站 HTML 中：

```html
<iframe 
  src="https://your-domain.com/embed?title=新年倒數&date=2025-12-31T23:59:59&theme=colorful" 
  width="293" 
  height="50" 
  style="border:none; overflow:hidden;" 
  scrolling="no">
</iframe>
```

### URL 參數

- `title`: 倒數計時器標題
- `date`: 目標日期（ISO 8601 格式）
- `theme`: 主題（`light`、`dark`、`colorful`）

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
│   ├── embed/          # Embed 頁面（用於 iframe）
│   ├── page.tsx        # 主頁面（管理介面）
│   └── layout.tsx      # 根 layout
├── components/
│   ├── CountdownWidget.tsx  # 倒數計時器元件
│   ├── CountdownForm.tsx    # 表單元件
│   └── ...
├── hooks/
│   └── useCountdowns.ts     # localStorage 管理 hook
└── config/
    └── site.ts              # 網站設定
```

## 📝 License

Licensed under the [MIT license](https://github.com/POYAOJUAN/gencountdown/blob/main/LICENSE).

## 👤 作者

[POYAOJUAN](https://github.com/POYAOJUAN)
