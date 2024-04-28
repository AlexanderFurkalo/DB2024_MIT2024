const { ObjectId } = require('mongodb');
const { getClient } = require('../database');


exports.createCustomer = async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: 'Missing required fields in request body' });
    }
    const client = getClient();
    const db = client.db('mydatabase');
    const result = await db.collection('customer').insertOne({
      first_name,
      last_name,
      email
    });
    res.status(201).json(result.ops);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getAllCustomers = async (req, res) => {
  try {
    const client = getClient();
    const db = client.db('mydatabase');
    const customers = await db.collection('customer').find().toArray();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    if (!customerId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid customer ID format' });
    }
    const client = getClient();
    const db = client.db('mydatabase');
    const customer = await db.collection('customer').findOne({ _id: new ObjectId(customerId) });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const { first_name, last_name, email } = req.body;
    const client = getClient();
    const db = client.db('mydatabase');
    const result = await db.collection('customer').updateOne(
      { _id: new ObjectId(customerId) },
      { $set: { first_name, last_name, email } }
    );
    res.json({ message: 'Customer updated successfully' });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const client = getClient();
    const db = client.db('mydatabase');
    await db.collection('customer').deleteOne({ _id: new ObjectId(customerId) });
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
