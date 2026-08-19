import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendor = async () => {
      const token = localStorage.getItem('vendorToken');
      if (token) {
        try {
          const res = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await res.json();
          if (data.success) {
            setVendor(data.vendor);
          } else {
            localStorage.removeItem('vendorToken');
          }
        } catch (error) {
          console.error("Failed to authenticate token");
          localStorage.removeItem('vendorToken');
        }
      }
      setLoading(false);
    };

    fetchVendor();
  }, []);

  const login = (token, vendorData) => {
    localStorage.setItem('vendorToken', token);
    setVendor(vendorData);
  };

  const logout = () => {
    localStorage.removeItem('vendorToken');
    setVendor(null);
  };

  return (
    <AuthContext.Provider value={{ vendor, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
