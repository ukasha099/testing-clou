import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { itemsAPI } from '../services/api';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await itemsAPI.getAll();
      setItems(response.data);
    } catch (err) {
      setError('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      setError('');
      const response = await itemsAPI.create(data);
      setItems([response.data, ...items]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create item');
    }
  };

  const handleUpdate = async (data) => {
    try {
      setError('');
      const response = await itemsAPI.update(editItem.id, data);
      setItems(items.map(item =>
        item.id === editItem.id ? response.data : item
      ));
      setEditItem(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update item');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      setError('');
      await itemsAPI.delete(id);
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete item');
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditItem(null);
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.username}!</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <ItemForm
          onSubmit={editItem ? handleUpdate : handleCreate}
          editItem={editItem}
          onCancel={handleCancelEdit}
        />

        <ItemList
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Dashboard;
