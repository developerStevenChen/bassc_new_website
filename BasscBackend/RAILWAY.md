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

## 出现 502 / "Application failed to respond" 时

1. **必须设置 Root Directory**  
   该服务 **Settings → Root Directory** 必须填 `BasscBackend`。  
   若未设置，Railway 会从仓库根目录构建，找不到 `config.wsgi` 和 `requirements.txt`，导致 502。

2. **看 Deploy Logs**  
   Railway 项目 → 该服务 → **Deployments** → 点最新一次部署 → **View Logs**。  
   看是否有 Python 报错、`ModuleNotFoundError`、数据库连接错误、或 gunicorn 启动失败。

3. **启动命令**  
   仓库内已提供 `BasscBackend/railway.toml` 和 `Procfile`，会使用：  
   `python -m gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`  
   若在 Dashboard 手动填了 **Start Command**，请与此一致并确保带 `--bind 0.0.0.0:$PORT`。

4. **确认 ALLOWED_HOSTS**  
   当存在环境变量 `PORT` 时，`config/settings.py` 已自动把 `'.railway.app'` 加入 `ALLOWED_HOSTS`。  
   若仍被拒绝，可在 **Variables** 添加：  
   `ALLOWED_HOSTS=basscnewwebsite-production.up.railway.app`

5. **数据库**  
   若使用 MySQL（`USE_MYSQL=1`），请配置好 `DB_HOST`、`DB_NAME`、`DB_USER`、`DB_PASSWORD` 等，并执行 `python manage.py migrate`（可在 Deploy 前或 Shell 里执行）。  
   未配置数据库时保持默认 SQLite 即可。

6. **依赖**  
   `requirements.txt` 已包含 `gunicorn`；构建命令见 `railway.toml` 或使用 `pip install -r requirements.txt`。

7. **若仍 502：改用 Docker 部署**  
   在服务 **Settings → Build → Builder** 里选 **Dockerfile**（仓库内 `BasscBackend/Dockerfile` 已配好），保存后重新部署。  
   同时请到 **Deployments → 最新部署 → View Logs** 把报错内容复制下来，便于排查（如数据库连接失败、模块找不到等）。
