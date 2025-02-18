import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmailVerification() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/verify-email/${token}/`);
        if (response.data.redirect) {
          navigate('/dashboard'); // Redirect to dashboard after verification
        }
      } catch (error) {
        console.error('Email verification failed', error);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div>
      <h2>Verifying your email...</h2>
    </div>
  );
}

export default EmailVerification;