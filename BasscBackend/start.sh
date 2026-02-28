#!/bin/sh
# 确保 PORT 从环境变量读取，避免 Railway 上 502
PORT="${PORT:-8000}"
exec python -m gunicorn config.wsgi:application --bind "0.0.0.0:${PORT}"
