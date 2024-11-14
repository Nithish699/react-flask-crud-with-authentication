import { useState } from 'react';
import { toast } from 'react-hot-toast';

const useUpdateItem = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const updateItem = async (id, updatedProduct) => {
    setIsUpdating(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || 'Item updated successfully!');
        return result.item;
      } else {
        throw new Error(result.error || 'Failed to update the item');
      }
    } catch (err) {
      toast.error(err.message || 'An error occurred while updating the item');
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateItem, isUpdating, error };
};

export default useUpdateItem;
