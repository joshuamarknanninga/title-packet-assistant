// frontend/src/components/RequirementsEditor.jsx
import React from 'react';

export default function RequirementsEditor({ title, items, onChange }) {
  const handleItemChange = (index, value) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...items, '']);
  };

  const handleRemove = (index) => {
    const updated = items.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div style={{ marginTop: 16 }}>
      <h3>{title}</h3>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <textarea
            value={item}
            onChange={(e) => handleItemChange(i, e.target.value)}
            rows={2}
            style={{ flex: 1 }}
          />
          <button type="button" onClick={() => handleRemove(i)}>
            ✕
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAdd}>
        + Add {title.slice(0, -1)}
      </button>
    </div>
  );
}