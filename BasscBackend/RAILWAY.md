# Railway 部署说明

## 后端 API 地址

若后端服务的 Public Domain 为：

**`https://basscnewwebsite-production.up.railway.app`**

则 API 根路径为：

- **API 根**：`https://basscnewwebsite-production.up.railway.app/api/`
- **健康检查**：`https://basscnewwebsite-production.up.railway.app/api/health/`
- **主页数据**：`https://basscnewwebsite-production.up.railway.app/api/homepage/`
- **登录**：`https://basscnewwebsite-production.up.railway.app/api/auth/login/`

前端在环境变量中设置：

```env
VITE_API_BASE_URL=https://basscnewwebsite-production.up.railway.app
```

（前端会拼成 `VITE_API_BASE_URL + '/api'` 请求后端。）

## 出现 "Application failed to respond" 时

1. **看 Deploy Logs**  
   Railway 项目 → 该服务 → **Deployments** → 点最新一次部署 → **View Logs**。  
   看是否有 Python 报错、`ModuleNotFoundError`、数据库连接错误等。

2. **确认 ALLOWED_HOSTS**  
   本仓库已在 `config/settings.py` 中：当存在环境变量 `PORT`（Railway 会注入）时，自动把 `'.railway.app'` 加入 `ALLOWED_HOSTS`。  
   一般无需再设。若仍被拒绝，可在 Railway 的 **Variables** 里添加：  
   `ALLOWED_HOSTS=basscnewwebsite-production.up.railway.app`

3. **确认启动命令与根目录**  
   - **Root Directory**：设为 `BasscBackend`（或你放 Django 项目的目录）。  
   - **Start Command**：若不使用 Procfile，可填  
     `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`  
     且需在 **Variables** 中由 Railway 自动提供 `PORT`（通常已存在）。

4. **数据库**  
   若使用 MySQL/PostgreSQL，在 Variables 中配置好 `USE_MYSQL`、`DB_HOST`、`DB_NAME`、`DB_USER`、`DB_PASSWORD` 等，并确保部署前已执行 `python manage.py migrate`（可在 Build 或 Deploy 命令里执行）。

5. **依赖**  
   确保 `requirements.txt` 包含 `gunicorn`，Railway 会执行 `pip install -r requirements.txt`。
