import './ItemList.css';

const ItemList = ({ items, onEdit, onDelete, loading }) => {
  if (loading) {
    return <div className="item-list-loading">Loading items...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="item-list-empty">
        <p>No items yet. Create your first item above!</p>
      </div>
    );
  }

  return (
    <div className="item-list">
      <h3>Your Items ({items.length})</h3>
      <div className="items-grid">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <div className="item-content">
              <h4>{item.title}</h4>
              {item.description && <p>{item.description}</p>}
              <span className="item-date">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="item-actions">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onEdit(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
