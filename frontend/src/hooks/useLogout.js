import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogout = () => {
  const [loading, setLoading] = useState(false); 
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true); 
    try {
      const response = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include', 
      });

      const data = await response.json(); 

      if (response.ok) {
        setAuthUser(null);
        localStorage.removeItem('current-user');

        toast.success(data.message || 'Logout successful!');
        return { success: true };
      } else {
        toast.error(data.error || 'Logout failed!');
        return { success: false };
      }
    } catch (error) {
      toast.error(error.message || 'Failed to logout. Please try again.');
      return { success: false };
    } finally {
      setLoading(false); 
    }
  };

  return {
    logout, 
    loading,
  };
};

export default useLogout;
