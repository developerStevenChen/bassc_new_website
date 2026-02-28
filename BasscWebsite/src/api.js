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
const TOKEN_KEY = 'bassc_admin_token';
const TOKEN_EXP_KEY = 'bassc_admin_token_exp';
// 2 小时
const TOKEN_TTL_MS = 2 * 60 * 60 * 1000;

let authToken = '';

function clearStoredToken() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(TOKEN_EXP_KEY);
    }
  } catch {
    // ignore
  }
  authToken = '';
}

function loadTokenFromStorage() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return '';
    const token = window.localStorage.getItem(TOKEN_KEY) || '';
    const expRaw = window.localStorage.getItem(TOKEN_EXP_KEY);
    const exp = expRaw ? Number(expRaw) : 0;
    if (!token || !exp) {
      return '';
    }
    if (Date.now() > exp) {
      clearStoredToken();
      return '';
    }
    return token;
  } catch {
    return '';
  }
}

function saveTokenToStorage(token) {
  authToken = token || '';
  try {
    if (typeof window !== 'undefined' && window.localStorage && token) {
      const exp = Date.now() + TOKEN_TTL_MS;
      window.localStorage.setItem(TOKEN_KEY, token);
      window.localStorage.setItem(TOKEN_EXP_KEY, String(exp));
    }
  } catch {
    // ignore
  }
}

function authHeaders() {
  const h = {};
  const token = loadTokenFromStorage();
  authToken = token;
  if (token) h['Authorization'] = `Token ${token}`;
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
  const rawPathway = data.pathway ?? null;
  const rawClasses = data.classes ?? [];
  const rawNewsList = data.news ?? data.news_list ?? [];
  const rawNavItems = data.navItems ?? data.nav_items ?? [];
  // 统一图片字段：后端可能返回 image_url，前端统一用 image
  const normImage = (item) => (item ? { ...item, image: item.image ?? item.image_url ?? '' } : item);
  const pathway = rawPathway ? { ...rawPathway, image: rawPathway.image ?? '' } : null;
  return {
    homePagePic: rawHomePagePic.map(normImage),
    boards: rawBoards.map(normImage),
    introductions: rawIntroductions.map(normImage),
    pathway,
    classes: Array.isArray(rawClasses) ? rawClasses : [],
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

/** Get list of class sessions (for class schedule) */
export async function fetchClasses() {
  const res = await fetch(`${API_BASE}/classes/`);
  if (!res.ok) throw new Error('Classes list failed');
  const data = await res.json();
  return Array.isArray(data) ? data : (data.results || []);
}

/** Get list of athletes (for /athlete page) */
export async function fetchAthletes() {
  const res = await fetch(`${API_BASE}/athletes/`);
  if (!res.ok) throw new Error('Athletes list failed');
  const data = await res.json();
  return Array.isArray(data) ? data : (data.results || []);
}

/** Get list of coaches (for /coach page) */
export async function fetchCoaches() {
  const res = await fetch(`${API_BASE}/coaches/`);
  if (!res.ok) throw new Error('Coaches list failed');
  const data = await res.json();
  return Array.isArray(data) ? data : (data.results || []);
}

/** Get list of events (for /event page) */
export async function fetchEvents() {
  const res = await fetch(`${API_BASE}/events/`);
  if (!res.ok) throw new Error('Events list failed');
  const data = await res.json();
  return Array.isArray(data) ? data : (data.results || []);
}

/** Get list of awards (for /award page) */
export async function fetchAwards() {
  const res = await fetch(`${API_BASE}/awards/`);
  if (!res.ok) throw new Error('Awards list failed');
  const data = await res.json();
  return Array.isArray(data) ? data : (data.results || []);
}

/** Get site contact info (single record, for Contact page) */
export async function fetchContactInfo() {
  const res = await fetch(`${API_BASE}/contactinfo/`);
  if (!res.ok) return null;
  const data = await res.json();
  const list = Array.isArray(data) ? data : (data.results || []);
  return list[0] || null;
}

// ---------- Superuser 管理 admin 账号 ----------

export async function listAdmins() {
  const res = await authFetch(`${API_BASE}/auth/admins/`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || '获取 admin 列表失败');
  return data.admins || [];
}

export async function createAdmin(username, password) {
  const res = await authFetch(`${API_BASE}/auth/admins/`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || '创建 admin 失败');
  return data;
}

export async function deactivateAdmin(id) {
  const res = await authFetch(`${API_BASE}/auth/admins/${id}/deactivate/`, {
    method: 'POST',
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || '注销 admin 失败');
  }
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
  saveTokenToStorage(data.token || '');
  return data;
}

export async function logout() {
  await authFetch(`${API_BASE}/auth/logout/`, { method: 'POST' });
  clearStoredToken();
}

export async function fetchMe() {
  const res = await fetch(`${API_BASE}/auth/me/`, { headers: authHeaders() });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error('获取用户失败');
  return res.json();
}

// ---------- Get Start 获客（公开提交，无需登录） ----------
export async function submitIntentClient(data) {
  const res = await fetch(`${API_BASE}/intentclients/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grade: data.grade?.trim() || '',
      student_name: data.student_name?.trim() || '',
      age: data.age ? Number(data.age) : null,
      phone: data.phone?.trim() || '',
      email: data.email?.trim() || '',
      zipcode: data.zipcode?.trim() || '',
    }),
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(result.detail || result.student_name?.[0] || result.email?.[0] || 'Submit failed');
  return result;
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
