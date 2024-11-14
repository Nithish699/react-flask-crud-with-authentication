// import { useState } from 'react';
// import { toast } from 'react-hot-toast';
// import { useAuthContext } from '../context/AuthContext';

// const useLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const { setAuthUser } = useAuthContext();

//   const login = async (username, password) => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem('current-user', JSON.stringify(data));
//         setAuthUser(data);

//         toast.success(data.message || 'Login successful!');
//         return { success: true, user: data };
//       } else {
//         toast.error(data.error || 'Login failed!');
//         return { success: false };
//       }
//     } catch (error) {
//       toast.error(error.message || 'Failed to login. Please try again.');
//       return { success: false };
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     login,
//     loading,
//   };
// };

// export default useLogin;
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('current-user', JSON.stringify(data));
        setAuthUser(data); 

        toast.success(data.message || 'Login successful!');
        return { success: true, user: data };
      } else {
        toast.error(data.error || 'Login failed!');
        return { success: false };
      }
    } catch (error) {
      toast.error(error.message || 'Failed to login. Please try again.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
};

export default useLogin;
