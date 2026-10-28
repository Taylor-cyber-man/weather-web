# 多城市天气预报（Web）

原生 HTML / CSS / JavaScript 实现的天气页面，使用 jQuery 与高德天气接口，支持多城市切换、当前天气与三天预报。

## 功能

- 城市列表选择与切换，城市数据由 `cities.json` 提供
- 当前天气：温度、天气状况、湿度、风向风速
- 三天天气预报
- 中英文界面切换
- 请求失败自动降级到本地缓存（天气 10 分钟、预报 1 小时）
- 加载态、错误提示与超时处理

## 技术栈

- HTML5 / CSS3 / 原生 JavaScript
- jQuery 3.7（CDN）
- 高德开放平台天气 API

## 运行

1. 在 [高德开放平台](https://console.amap.com/dev/key/app) 申请 Web 服务 Key
2. 打开 `script.js`，把 Key 填入：

```js
const AMAP_KEY = '你的Key';
```

3. 直接用浏览器打开 `index.html`，或用任意静态服务器托管

> 仓库中的 Key 为空，请使用自己的 Key。

## 目录结构

```
├── index.html    # 页面结构
├── css/style.css # 样式
├── script.js     # 城市、天气请求与渲染逻辑
├── cities.json   # 城市数据
└── img/          # 天气图标与背景图
```
