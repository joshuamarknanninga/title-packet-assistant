// frontend/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { login, register } from '../api/client.js';

export default function LoginPage({ onLogin }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let data;
      if (mode === 'login') {
        data = await login(email, password);
      } else {
        data = await register(email, password, name);
      }

      const { token, user } = data;

      // Persist token & user
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      onLogin(user, token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '80px auto' }}>
      <h2>{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {mode === 'register' && (
          <div>
            <label>
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </label>
          </div>
        )}

        <div>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: 8, marginTop: 4 }}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: 8, marginTop: 4 }}
              required
            />
          </label>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '10px 16px', marginTop: 8 }}
        >
          {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Register'}
        </button>
      </form>

      <button
        type="button"
        style={{ marginTop: 16, background: 'none', border: 'none', color: '#4b66f0', cursor: 'pointer' }}
        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
      >
        {mode === 'login'
          ? "Need an account? Register here"
          : "Already have an account? Sign in"}
      </button>
    </div>
  );
}
