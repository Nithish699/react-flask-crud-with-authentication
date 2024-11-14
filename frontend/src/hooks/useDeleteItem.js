import { useState } from 'react';
import { toast } from 'react-hot-toast';

const useDeleteItem = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteItem = async (id) => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        // Show success toast
        toast.success(result.message || 'Item deleted successfully!');
        return result.message;
      } else {
        throw new Error(result.error || 'Failed to delete the item');
      }
    } catch (err) {
      // Show error toast
      toast.error(err.message || 'An error occurred while deleting the item');
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteItem, isDeleting, error };
};

export default useDeleteItem;
