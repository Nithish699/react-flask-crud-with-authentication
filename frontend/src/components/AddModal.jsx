import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

function AddModal({ open, onClose, onSave }) {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();

    if (!productName || !description || !price) {
      setError('All fields are required');
      return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      setError('Please enter a valid price');
      return;
    }

    const newProduct = {
      name: productName,
      description,
      price: parseFloat(price),
    };
    onSave(newProduct);
    setProductName('');
    setDescription('');
    setPrice('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: 'red' }}>{error}</p>} 
        <TextField
          margin="dense"
          label="Product Name"
          name="name"
          type="text"
          fullWidth
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          name="description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
        />
        <TextField
          margin="dense"
          label="Price"
          name="price"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddModal;
