// frontend/src/api/client.js

const API_BASE = '/api'; // proxied to http://localhost:4000

function getAuthHeaders(isJson = true) {
  const token = localStorage.getItem('token');
  const headers = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (isJson) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
}

// AUTH

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || data.message || 'Login failed');
  }

  return res.json();
}

export async function register(email, password, name) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || data.message || 'Registration failed');
  }

  return res.json();
}

// TITLE PACKET

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const headers = getAuthHeaders(false);

  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers,
    body: formData
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || data.message || 'Upload failed');
  }

  return res.json();
}

export async function fetchAnalyses() {
  const res = await fetch(`${API_BASE}/analyses`, {
    headers: getAuthHeaders(false)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch analyses');
  }

  return res.json();
}

export async function fetchAnalysis(id) {
  const res = await fetch(`${API_BASE}/analyses/${id}`, {
    headers: getAuthHeaders(false)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch analysis');
  }

  return res.json();
}

export async function updateRequirements(id, requirements, exceptions) {
  const res = await fetch(`${API_BASE}/analyses/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify({ requirements, exceptions })
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || data.message || 'Update failed');
  }

  return res.json();
}

// HEALTH

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) {
    throw new Error('Health check failed');
  }
  return res.json();
}