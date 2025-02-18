import { useState } from 'react';
import axios from 'axios';


function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('free'); // Default user type
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:8000/register/', {
        username,
        password,
        email,
        user_type: userType, // Include user type in the request
      });
      setSuccessMessage(response.data.message); // Show success message
      // Optionally, redirect to login or another page
      // navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
      setError(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="registerContainer">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="free">Free User</option>
          <option value="premium">Premium User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
}

export default Register;