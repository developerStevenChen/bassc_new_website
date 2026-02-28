# 前端 Railway 部署

## 1. 新建服务并设置根目录

- 在同一个 Railway 项目里 **Add Service** → **GitHub Repo** → 选 `bassc_new_website`。
- 进入该服务 **Settings** → **Root Directory** 填：`BasscWebsite`。

## 2. 构建与启动

- 仓库内已提供 **railpack.json**，指定了 `startCommand: "npm run start"`，Railpack 会识别，不再报 “No start command was found”。
- 若仍报错，可在该服务 **Variables** 里加一条：**RAILPACK_SPA_OUTPUT_DIR** = **dist**，让 Railpack 按静态站点托管（无需 start，用 Caddy 直接托管 dist）。
- 或手动配置：**Build Command** = `npm ci && npm run build`，**Start Command** = `npm run start`。

## 3. 环境变量（必填）

在 **Variables** 里添加：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `VITE_API_BASE_URL` | 后端域名（构建时写入前端），不要带 `/api` | `https://你的后端.up.railway.app` |

例如后端域名为 `https://basscbackend-production.up.railway.app`，则：

```env
VITE_API_BASE_URL=https://basscbackend-production.up.railway.app
```

## 4. 生成前端域名

- **Settings** → **Networking** → **Generate Domain**，得到前端访问地址。
- 把**前端完整地址**填到**后端**服务的 `CORS_ALLOWED_ORIGINS`（逗号分隔），保存后后端会重新部署，跨域才能用。

## 5. 端口

若出现 502，在 **Networking** 里确认 **Target Port** 与 Railway 提供的 `PORT` 一致（通常 8080），或留空自动检测。

---

部署完成后用**前端域名**访问；接口请求会发往后端域名（由 `VITE_API_BASE_URL` 决定）。
