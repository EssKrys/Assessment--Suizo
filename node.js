const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.use(cors()); 
app.use(express.json()); 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminKdo',
    database: 'dbproduct'
});
db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.post('/api/suppliers', (req, res) => {
    const { supplierName, supplierAddress } = req.body;

 const query = 'INSERT INTO tbl_suppliers (supplierName, supplierAddress) VALUES (?,?)';
    db.query(query, [supplierName, supplierAddress], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Supplier created successfully', supplierId: result.insertId });
    });
});

app.post('/api/products', (req, res) => {
    const { productname, productqty, componentname, componentdescription } = req.body;

 const query = 'INSERT INTO tbl_products (productname, productqty, componentname, componentdescription) VALUES (?,?,?,?)';
    db.query(query, [productname, productqty, componentname, componentdescription], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Product created successfully', createprodId: result.insertId });
    });
});

app.put('/api/suppliers/:prod_id', async (req, res) => {
    const prod_id = req.params.prod_id;
    const { productname, productqty } = req.body;
  
    try {
      const query = 'UPDATE tbl_products SET productname =? , productqty =? WHERE prod_id= ? ';
      const [result] = await db.promise().query(query, [productname, productqty, prod_id]);
  
      if (result.affectedRows === 0) { 
        return res.status(404).json({ error: 'Product not found',  });
      }
  
      res.status(200).json({ message: 'Updated successfully!', updateId: result.insertId });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
  });
  
app.delete('/api/suppliers/:supplier_id', async (req, res) => {
    const supplier_id = req.params.supplier_id;

    try {
        const query = 'DELETE FROM tbl_suppliers WHERE supplier_id = ?';
        const [result] = await db.promise().query(query, [supplier_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        res.status(200).json({ message: 'Deleted successfully!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'frontend.html'));
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});