import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const initialState = { name: '', email: '', password: '' };

export default function AuthCard() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      if (mode === 'register') {
        await register(form);
      } else {
        await login(form);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="auth-card">
      <h2>{mode === 'login' ? 'Welcome back' : 'Create an account'}</h2>
      <p>Secure access to your AI tutor workspace.</p>
      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <input
            placeholder="Full name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">{mode === 'login' ? 'Sign in' : 'Create account'}</button>
      </form>
      <button className="link" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
        {mode === 'login' ? 'Need an account? Register' : 'Already have an account? Sign in'}
      </button>
    </div>
  );
}
