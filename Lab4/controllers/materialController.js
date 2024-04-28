const { ObjectId } = require('mongodb');
const { getClient } = require('../database');


exports.createMaterial = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Material name is required' });
    }
    const client = getClient();
    const db = client.db('mydatabase');
    const result = await db.collection('material').insertOne({ name });
    res.status(201).json(result.ops);
  } catch (error) {
    console.error('Error creating material:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllMaterials = async (req, res) => {
  try {
    const client = getClient();
    const db = client.db('mydatabase');
    const materials = await db.collection('material').find().toArray();
    res.json(materials);
  } catch (error) {
    console.error('Error fetching materials:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getMaterialById = async (req, res) => {
  try {
    const materialId = req.params.id;
    if (!materialId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid material ID format' });
    }
    const client = getClient();
    const db = client.db('mydatabase');
    const material = await db.collection('material').findOne({ _id: new ObjectId(materialId) });
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.json(material);
  } catch (error) {
    console.error('Error fetching material by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateMaterial = async (req, res) => {
  try {
    const materialId = req.params.id;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Material name is required' });
    }
    const client = getClient();
    const db = client.db('mydatabase');
    const result = await db.collection('material').updateOne(
      { _id: new ObjectId(materialId) },
      { $set: { name } }
    );
    res.json({ message: 'Material updated successfully' });
  } catch (error) {
    console.error('Error updating material:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteMaterial = async (req, res) => {
  try {
    const materialId = req.params.id;
    const client = getClient();
    const db = client.db('mydatabase');
    await db.collection('material').deleteOne({ _id: new ObjectId(materialId) });
    res.json({ message: 'Material deleted successfully' });
  } catch (error) {
    console.error('Error deleting material:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};