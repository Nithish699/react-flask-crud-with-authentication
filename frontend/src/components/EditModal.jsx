import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

function EditModal({ open, product, onClose, onSave, isUpdating }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      ...formData,
      price: parseFloat(formData.price)
    };
    onSave(updatedProduct);
  };

  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Product Name"
          type="text"
          fullWidth
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          value={formData.description}
          name="description"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Price"
          type="number"
          fullWidth
          value={formData.price}
          name="price"
          onChange={handleChange}
          inputProps={{ min: 0, step: '0.01' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={isUpdating}>
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={isUpdating}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditModal;
