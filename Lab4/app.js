const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');
const customerRoutes = require('./routes/customerRoutes');
const furnitureRoutes = require('./routes/furnitureRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');
const materialRoutes = require('./routes/materialRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');

const app = express();

app.use(bodyParser.json());

database.connect();

app.use('/api/customer', customerRoutes);
app.use('/api/furniture', furnitureRoutes);
app.use('/api/manufacturer', manufacturerRoutes);
app.use('/api/material', materialRoutes);
app.use('/api/purchase', purchaseRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});