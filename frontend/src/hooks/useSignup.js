import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (username, password, gender) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          gender,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('current-user', JSON.stringify(data));
        setAuthUser(data);

        toast.success(data.message || 'Registration successful!');
        return { success: true, user: data };
      } else {
        toast.error(data.error || 'Registration failed!');
        return { success: false };
      }
    } catch (error) {
      toast.error(error.message || 'Failed to register. Please try again.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    signup,
    loading,
  };
};

export default useSignup;
