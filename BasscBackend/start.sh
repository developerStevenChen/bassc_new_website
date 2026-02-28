#!/bin/sh
# 确保 PORT 从环境变量读取，避免 Railway 上 502
PORT="${PORT:-8000}"

# 在 Railway Variables 里设 USE_MINIMAL_SERVER=1 可临时用极简服务排查 502（不改 Start Command）
if [ "$USE_MINIMAL_SERVER" = "1" ]; then
  exec python server_minimal.py
fi

exec python -m gunicorn config.wsgi:application --bind "0.0.0.0:${PORT}"
