import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import EditModal from './EditModal';
import AddModal from './AddModal';
import useItems from '../hooks/useItems';
import useDeleteItem from '../hooks/useDeleteItem';
import useAddItem from '../hooks/useAddItem';
import useUpdateItem from '../hooks/useUpdateItem'; 

function ProductCards() {
  const [openEdit, setOpenEdit] = useState(false); 
  const [openAdd, setOpenAdd] = useState(false); 
  const [currentProduct, setCurrentProduct] = useState(null);
  const { items: products, setItems } = useItems();
  const { deleteItem, isDeleting } = useDeleteItem();
  const { addItem, isAdding } = useAddItem();
  const { updateItem, isUpdating } = useUpdateItem();

  const handleClickOpenEdit = (product) => {
    setCurrentProduct(product);
    setOpenEdit(true);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setCurrentProduct(null);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleSaveEdit = async (updatedProduct) => {
    const updatedItem = await updateItem(updatedProduct.id, updatedProduct);
    if (updatedItem) {
      const updatedProducts = products.map((product) =>
        product.id === updatedItem.id ? updatedItem : product
      );
      setItems(updatedProducts);
      setOpenEdit(false);
    }
  };

  const handleSaveAdd = async (newProduct) => {
    const addedProduct = await addItem(newProduct);
    if (addedProduct) {
      setItems([...products, addedProduct]);
      setOpenAdd(false);
    }
  };

  const handleDelete = async (id) => {
    const message = await deleteItem(id);
    if (message) {
      setItems(products.filter((product) => product.id !== id));
    }
  };

  return (
    <div
      style={{
        overflowY: 'auto',
        padding: '10px',
        height: '100%',
        maxHeight: 'none',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={handleClickOpenAdd}
          disabled={isAdding}
        >
          Product
        </Button>
      </Box>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.name}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 2, display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Box>
                  <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleClickOpenEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(product.id)}
                      disabled={isDeleting}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ fontSize: '0.875rem', marginTop: 1 }}>
                  ₱{product.price} 
                </Typography>
                <Box sx={{ marginTop: 'auto' }}>
                  <Typography variant="body2" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                    {product.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AddModal
        open={openAdd}  
        onClose={handleCloseAdd}
        onSave={handleSaveAdd}
      />

      <EditModal
        open={openEdit}
        product={currentProduct}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
      />
    </div>
  );
}

export default ProductCards;

