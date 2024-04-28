const { ObjectId } = require('mongodb');
const { getClient } = require('../database');


exports.createManufacturer = async (req, res) => {
  try {
    const { name, location } = req.body;
    if (!name || !location) {
      return res.status(400).json({ error: 'Manufacturer name and location are required' });
    }
    const client = getClient();
    const db = client.db('mydatabase');
    const result = await db.collection('manufacturer').insertOne({ name, location });
    res.status(201).json(result.ops);
  } catch (error) {
    console.error('Error creating manufacturer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllManufacturers = async (req, res) => {
  try {
    const client = getClient();
    const db = client.db('mydatabase');
    const manufacturers = await db.collection('manufacturer').find().toArray();
    res.json(manufacturers);
  } catch (error) {
    console.error('Error fetching manufacturers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getManufacturerById = async (req, res) => {
  try {
    const manufacturerId = req.params.id;
    if (!manufacturerId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid manufacturer ID format' });
    }
    const client = getClient();
    const db = client.db('mydatabase');
    const manufacturer = await db.collection('manufacturer').findOne({ _id: new ObjectId(manufacturerId) });
    if (!manufacturer) {
      return res.status(404).json({ error: 'Manufacturer not found' });
    }
    res.json(manufacturer);
  } catch (error) {
    console.error('Error fetching manufacturer by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateManufacturer = async (req, res) => {
  try {
    const manufacturerId = req.params.id;
    const { name, location } = req.body;
    if (!name || !location) {
      return res.status(400).json({ error: 'Manufacturer name and location are required' });
    }
    const client = getClient();
    const db = client.db('mydatabase');
    const result = await db.collection('manufacturer').updateOne(
      { _id: new ObjectId(manufacturerId) },
      { $set: { name, location } }
    );
    res.json({ message: 'Manufacturer updated successfully' });
  } catch (error) {
    console.error('Error updating manufacturer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteManufacturer = async (req, res) => {
  try {
    const manufacturerId = req.params.id;
    const client = getClient();
    const db = client.db('mydatabase');
    await db.collection('manufacturer').deleteOne({ _id: new ObjectId(manufacturerId) });
    res.json({ message: 'Manufacturer deleted successfully' });
  } catch (error) {
    console.error('Error deleting manufacturer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};