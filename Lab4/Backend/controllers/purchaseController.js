const { ObjectId } = require('mongodb');
const { getClient } = require('../database');

exports.createPurchase = async (req, res) => {
  try {
    const { customer_id, furniture_id, purchase_date, quantity, total_price } = req.body;
    if (!customer_id || !furniture_id || !purchase_date || !quantity || !total_price) {
      return res.status(400).json({ error: 'Missing required fields in request body' });
    }
    const client = getClient();
    const db = client.db('mydatabase');
    const result = await db.collection('purchase').insertOne({
      customer_id: new ObjectId(customer_id),
      furniture_id: new ObjectId(furniture_id),
      purchase_date,
      quantity,
      total_price
    });
    res.status(201).json(result.ops);
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllPurchases = async (req, res) => {
  try {
    const client = getClient();
    const db = client.db('mydatabase');
    const purchases = await db.collection('purchase').find().toArray();
    res.json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getPurchaseById = async (req, res) => {
  try {
    const purchaseId = req.params.id;
    if (!purchaseId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid purchase ID format' });
    }
    const client = getClient();
    const db = client.db('mydatabase');
    const purchase = await db.collection('purchase').findOne({ _id: new ObjectId(purchaseId) });
    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }
    res.json(purchase);
  } catch (error) {
    console.error('Error fetching purchase by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updatePurchase = async (req, res) => {
  try {
    const purchaseId = req.params.id;
    const { customer_id, furniture_id, purchase_date, quantity, total_price } = req.body;
    const client = getClient();
    const db = client.db('mydatabase');
    const result = await db.collection('purchase').updateOne(
      { _id: new ObjectId(purchaseId) },
      { $set: { customer_id: new ObjectId(customer_id), furniture_id: new ObjectId(furniture_id), purchase_date, quantity, total_price } }
    );
    res.json({ message: 'Purchase updated successfully' });
  } catch (error) {
    console.error('Error updating purchase:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deletePurchase = async (req, res) => {
  try {
    const purchaseId = req.params.id;
    const client = getClient();
    const db = client.db('mydatabase');
    await db.collection('purchase').deleteOne({ _id: new ObjectId(purchaseId) });
    res.json({ message: 'Purchase deleted successfully' });
  } catch (error) {
    console.error('Error deleting purchase:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};