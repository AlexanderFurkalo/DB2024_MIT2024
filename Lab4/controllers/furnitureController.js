const { ObjectId } = require('mongodb');
const { getClient } = require('../database');


exports.createFurniture = async (req, res) => {
  try {
    const { name, type, material_id, manufacturer_id, price, description } = req.body;
    if (!name || !type || !material_id || !manufacturer_id || !price || !description) {
      return res.status(400).json({ error: 'Missing required fields in request body' });
    }
    const client = getClient();
    const db = client.db('mydatabase');
    const result = await db.collection('furniture').insertOne({
      name,
      type,
      material_id: new ObjectId(material_id),
      manufacturer_id: new ObjectId(manufacturer_id),
      price,
      description
    });
    res.status(201).json(result.ops);
  } catch (error) {
    console.error('Error creating furniture:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllFurniture = async (req, res) => {
  try {
    const client = getClient();
    const db = client.db('mydatabase');
    const furniture = await db.collection('furniture').find().toArray();
    res.json(furniture);
  } catch (error) {
    console.error('Error fetching furniture:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getFurnitureById = async (req, res) => {
  try {
    const furnitureId = req.params.id;
    if (!furnitureId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid furniture ID format' });
    }
    const client = getClient();
    const db = client.db('mydatabase');
    const furniture = await db.collection('furniture').findOne({ _id: new ObjectId(furnitureId) });
    if (!furniture) {
      return res.status(404).json({ error: 'Furniture not found' });
    }
    res.json(furniture);
  } catch (error) {
    console.error('Error fetching furniture by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateFurniture = async (req, res) => {
  try {
    const furnitureId = req.params.id;
    const { name, type, material_id, manufacturer_id, price, description } = req.body;
    const client = getClient();
    const db = client.db('mydatabase');
    const result = await db.collection('furniture').updateOne(
      { _id: new ObjectId(furnitureId) },
      { $set: { name, type, material_id: new ObjectId(material_id), manufacturer_id: new ObjectId(manufacturer_id), price, description } }
    );
    res.json({ message: 'Furniture updated successfully' });
  } catch (error) {
    console.error('Error updating furniture:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteFurniture = async (req, res) => {
  try {
    const furnitureId = req.params.id;
    const client = getClient();
    const db = client.db('mydatabase');
    await db.collection('furniture').deleteOne({ _id: new ObjectId(furnitureId) });
    res.json({ message: 'Furniture deleted successfully' });
  } catch (error) {
    console.error('Error deleting furniture:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};