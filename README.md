# LiveNews AI

一款面向全公司的每日AI新闻网站，帮助员工快速了解AI领域最新动态。

## 功能特点

- 📰 每日精选10-20条高质量AI新闻
- 🌐 中英对照：左原文、右中文
- 🤖 智能摘要：点击按钮生成简短摘要
- ✅ 真实性验证：S级+多源验证占比≥80%
- 🏷️ 分类标签：AI芯片、工具推荐、行业动态、学术精选
- 📅 7天历史：支持查看7天内每天的新闻

## 技术栈

- 前端：React 18 + Vite + Tailwind CSS
- 后端：Python FastAPI
- 数据库：SQLite
- AI服务：Groq API（免费Llama模型）

## 快速开始

### 前端

```bash
cd frontend
npm install
npm run dev
```

### 后端

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# 编辑 .env 添加你的 GROQ_API_KEY
python main.py
```

### 初始化数据

```bash
cd backend
python fetch_news.py
```

## API 接口

- `GET /api/news` - 获取新闻列表
- `POST /api/news/{id}/summary` - 生成摘要
- `GET /api/categories` - 获取分类列表
- `POST /api/admin/fetch-news` - 手动抓取新闻（管理接口）

## 数据源

### 英文源
- Hacker News
- TechCrunch
- The Verge
- ArXiv
- Reddit

### 中文源
- 机器之心
- 量子位
- 36氪

## 部署

推荐使用 Vercel（前端）+ Railway/Render（后端）

## 免费方案

本项目使用完全免费的方案：
- Groq API：免费Llama模型，无限使用
- Vercel：免费静态网站托管
- Railway/Render：免费后端服务
- SQLite：免费数据库
