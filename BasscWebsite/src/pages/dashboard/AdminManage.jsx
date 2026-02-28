import { useState, useEffect } from 'react';
import { listAdmins, createAdmin, deactivateAdmin } from '../../api';

export default function AdminManage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ username: '', password: '', password2: '' });
  const [submitError, setSubmitError] = useState('');

  function load() {
    setLoading(true);
    listAdmins()
      .then(setList)
      .catch((err) => {
        console.error(err);
        setList([]);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setSubmitError('');
    if (!form.username.trim() || !form.password) {
      setSubmitError('用户名和密码不能为空');
      return;
    }
    if (form.password !== form.password2) {
      setSubmitError('两次输入的密码不一致');
      return;
    }
    setCreating(true);
    try {
      await createAdmin(form.username.trim(), form.password);
      setForm({ username: '', password: '', password2: '' });
      load();
    } catch (err) {
      setSubmitError(err.message || '创建失败');
    } finally {
      setCreating(false);
    }
  }

  async function handleDeactivate(id, username) {
    if (!window.confirm(`注销 admin 账号 "${username}"? 该账号将无法再登录。`)) return;
    try {
      await deactivateAdmin(id);
      load();
    } catch (err) {
      alert(err.message || '注销失败');
    }
  }

  return (
    <div className="dashboard-section">
      <h2>Admin Accounts</h2>
      <p className="dashboard-subtitle">
        仅 superuser 可见。用于创建 / 注销 admin 账号。admin 可登录 Dashboard，但不能管理其它 admin。
      </p>

      <div className="dashboard-grid-two">
        <div className="dashboard-card">
          <h3>Create new admin</h3>
          <form onSubmit={handleCreate} className="dashboard-form">
            {submitError && <div className="login-error">{submitError}</div>}
            <label>
              Username
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                required
              />
            </label>
            <label>
              Confirm password
              <input
                type="password"
                value={form.password2}
                onChange={(e) => setForm((f) => ({ ...f, password2: e.target.value }))}
                required
              />
            </label>
            <button type="submit" className="dashboard-btn" disabled={creating}>
              {creating ? 'Creating…' : 'Create admin'}
            </button>
          </form>
        </div>

        <div className="dashboard-card">
          <h3>Existing admins</h3>
          <div className="dashboard-table-wrap">
            {loading ? (
              <div className="dashboard-empty">Loading…</div>
            ) : list.length === 0 ? (
              <div className="dashboard-empty">No admin accounts yet.</div>
            ) : (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Active</th>
                    <th className="actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((row) => (
                    <tr key={row.id}>
                      <td>{row.username}</td>
                      <td>{row.is_active ? 'Yes' : 'No'}</td>
                      <td className="actions">
                        <button
                          type="button"
                          className="delete"
                          onClick={() => handleDeactivate(row.id, row.username)}
                          title="Deactivate"
                        >
                          Deactivate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

