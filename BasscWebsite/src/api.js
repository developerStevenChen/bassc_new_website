/**
 * API 基础地址，必须指向 Django 的 /api 根（例如 http://localhost:8000/api）。
 * 若只填了主机（如 http://localhost:8000），会补上 /api，避免请求打到 /auth/csrf/ 导致 404 HTML。
 */
const _raw = import.meta.env.VITE_API_BASE_URL || '';
const _origin = (_raw.startsWith('http://') || _raw.startsWith('https://'))
  ? _raw.replace(/\/api\/?$/, '').replace(/\/$/, '')
  : 'http://localhost:8000';
export const API_BASE = _origin + '/api';

/** 登录后保存的 Token，请求头带 Authorization: Token <token>，无需 CSRF */
let authToken = '';

function authHeaders() {
  const h = {};
  if (authToken) h['Authorization'] = `Token ${authToken}`;
  return h;
}

/** 带 Token 的 fetch（用于需登录的接口） */
export function authFetch(url, options = {}) {
  const headers = { ...authHeaders(), ...options.headers };
  if (typeof options.body === 'object' && !(options.body instanceof FormData) && !(options.body instanceof URLSearchParams)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }
  return fetch(url, { ...options, headers });
}

/**
 * 获取主页全部素材（轮播、板块、介绍、新闻、导航）
 */
export async function fetchHomepage() {
  const res = await fetch(`${API_BASE}/homepage/`);
  if (!res.ok) throw new Error('Homepage fetch failed');
  const data = await res.json();
  // 兼容后端蛇形命名（如 home_page_pic）与驼峰命名
  const rawHomePagePic = data.homePagePic ?? data.home_page_pic ?? [];
  const rawBoards = data.boards ?? [];
  const rawIntroductions = data.introductions ?? [];
  const rawNewsList = data.news ?? data.news_list ?? [];
  const rawNavItems = data.navItems ?? data.nav_items ?? [];
  // 统一图片字段：后端可能返回 image_url，前端统一用 image
  const normImage = (item) => (item ? { ...item, image: item.image ?? item.image_url ?? '' } : item);
  return {
    homePagePic: rawHomePagePic.map(normImage),
    boards: rawBoards.map(normImage),
    introductions: rawIntroductions.map(normImage),
    newsList: rawNewsList.map((n) => (n ? { ...n, primPic: n.primPic ?? n.prim_pic ?? '', images: (n.images || []).map((img) => (typeof img === 'string' ? img : img?.image_url ?? img)) } : n)),
    navItems: rawNavItems,
  };
}

/** Get single course by slug (for /class/:slug page) */
export async function fetchCourseBySlug(slug) {
  const res = await fetch(`${API_BASE}/courses/by_slug/${encodeURIComponent(slug)}/`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Course fetch failed');
  return res.json();
}

/** Get list of courses (for /class list and dashboard) */
export async function fetchCourses() {
  const res = await fetch(`${API_BASE}/courses/`);
  if (!res.ok) throw new Error('Courses list failed');
  const data = await res.json();
  return Array.isArray(data) ? data : (data.results || []);
}

// ---------- Dashboard 认证（Token，无 CSRF） ----------
export async function login(username, password) {
  const url = `${API_BASE}/auth/login/`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const text = await res.text();
  if (text.trimStart().startsWith('<')) {
    throw new Error('服务器返回了 HTML 而非 JSON，请确认后端已启动（http://127.0.0.1:8000）且 API 地址正确');
  }
  const data = JSON.parse(text);
  if (!res.ok) throw new Error(data.error || '登录失败');
  authToken = data.token || '';
  return data;
}

export async function logout() {
  await authFetch(`${API_BASE}/auth/logout/`, { method: 'POST' });
  authToken = '';
}

export async function fetchMe() {
  const res = await fetch(`${API_BASE}/auth/me/`, { headers: authHeaders() });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error('获取用户失败');
  return res.json();
}

// ---------- Dashboard 上传图片（Railway Bucket） ----------
export async function uploadImage(file) {
  const form = new FormData();
  form.append('image', file);
  const res = await authFetch(`${API_BASE}/upload/`, { method: 'POST', body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || '上传失败');
  return data.url;
}

// ---------- Dashboard CRUD（需已登录） ----------
function listUrl(resource) {
  return `${API_BASE}/${resource}/`;
}
function detailUrl(resource, id) {
  return `${API_BASE}/${resource}/${id}/`;
}

export async function dashboardList(resource) {
  const res = await fetch(listUrl(resource), { headers: authHeaders() });
  if (!res.ok) throw new Error('列表获取失败');
  const data = await res.json();
  return Array.isArray(data) ? data : (data.results || []);
}

export async function dashboardCreate(resource, body) {
  const res = await authFetch(listUrl(resource), {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || err.error || JSON.stringify(err) || '创建失败');
  }
  return res.json();
}

export async function dashboardUpdate(resource, id, body) {
  const res = await authFetch(detailUrl(resource, id), {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || err.error || JSON.stringify(err) || '更新失败');
  }
  return res.json();
}

export async function dashboardDelete(resource, id) {
  const res = await authFetch(detailUrl(resource, id), { method: 'DELETE' });
  if (!res.ok) throw new Error('删除失败');
}
