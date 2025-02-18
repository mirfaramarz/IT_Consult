import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmailVerification() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/verify-email/${token}/`);
        if (response.data.redirect) {
          setMessage('Your email has been successfully verified!');
          setTimeout(() => navigate('/dashboard'), 2000); // Redirect after 2 seconds
        } else {
          setMessage('Email verification failed. Please try again.');
        }
      } catch (error) {
        console.error('Email verification failed', error);
        setMessage('An error occurred during verification. Please try again later.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>test{message}</h2>
    </div>
  );
}

export default EmailVerification;