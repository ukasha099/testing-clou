const { Item } = require('../models');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']]
    });

    res.json(items);
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({ message: 'Error fetching items' });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Get item error:', error);
    res.status(500).json({ message: 'Error fetching item' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const item = await Item.create({
      title,
      description,
      userId: req.userId
    });

    res.status(201).json(item);
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({ message: 'Error creating item' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { title, description } = req.body;

    const item = await Item.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.update({
      title: title || item.title,
      description: description !== undefined ? description : item.description
    });

    res.json(item);
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({ message: 'Error updating item' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.destroy();

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({ message: 'Error deleting item' });
  }
};
