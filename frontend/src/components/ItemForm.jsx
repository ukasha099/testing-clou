import { useState, useEffect } from 'react';
import './ItemForm.css';

const ItemForm = ({ onSubmit, editItem, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
      setDescription(editItem.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({ title, description });
      if (!editItem) {
        setTitle('');
        setDescription('');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h3>{editItem ? 'Edit Item' : 'Add New Item'}</h3>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter item title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter item description (optional)"
          rows={3}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : editItem ? 'Update Item' : 'Add Item'}
        </button>
        {editItem && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ItemForm;
