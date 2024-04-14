
const API_BASE_URL = import.meta.env.VITE_API_URL;



export const registerUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || 'Registration failed');
    }
    return responseData;
  } catch (error) {
    console.error('Error in registerUser:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || 'Login failed');
    }
    // Store the token in local storage or a state management library
    localStorage.setItem('token', responseData.token);
    console.log('Stored token:', localStorage.getItem('token')); 
    return responseData;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getAccountDetails = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/account`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Account details endpoint not found');
      } else {
        throw new Error('Error fetching account details');
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting account details:', error);
    throw error;
  }
};

export const getOrders = async () => {
  const token = localStorage.getItem('token');
  console.log('Retrieved token:', token); 
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const responseData = await response.json();
    console.log("Orders response:", responseData); 
    if (!response.ok) {
      throw new Error('Error fetching orders');
    }
    return responseData;
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};

// Removes the authentication token from localStorage and redirects to the login page
export const logout = () => {
  try {
      // Attempt to remove the stored token
      localStorage.removeItem('token');
      // Redirect to the login page
      window.location.href = '/login';
  } catch (error) {
      // Log any errors that occur during the logout process
      console.error('Error during logout:', error);
  }
};


export const updateAccount = async (accountDetails, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/account`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(accountDetails),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error('Error updating account');
    }
    return responseData;
  } catch (error) {
    console.error('Error updating account:', error);
    throw error;
  }
};
