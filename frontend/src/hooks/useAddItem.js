import { useState } from 'react';
import { toast } from 'react-hot-toast';

const useAddItem = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);

  const addItem = async (newProduct) => {
    setIsAdding(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || 'Item added successfully!');
        return result.item;
      } else {
        throw new Error(result.error || 'Failed to add the item');
      }
    } catch (err) {
      toast.error(err.message || 'An error occurred while adding the item');
      setError(err.message);
    } finally {
      setIsAdding(false);
    }
  };

  return { addItem, isAdding, error };
};

export default useAddItem;
