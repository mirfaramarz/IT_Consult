import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Make sure to create this CSS file
import backgroundImage from '../../assets/img/contact-1.png';  // Add this line
import TopNavbar from '../../components/Nav/TopNavbar';  // Add this import

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!username || !password) {
        throw new Error('Please fill in all fields');
      }
      await login(username, password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Implement signup logic here
  };

  const toggleForm = () => {
    document.querySelector('.cont').classList.toggle('s--signup');
  };

  useEffect(() => {
    // Add click handler for toggle button
    const imgBtn = document.querySelector('.img__btn');
    if (imgBtn) {
      imgBtn.addEventListener('click', function() {
        document.querySelector('.cont').classList.toggle('s--signup');
      });
    }

    // Set background image dynamically
    const imgElement = document.querySelector('.img:before');
    if (imgElement) {
      imgElement.style.backgroundImage = `url(${backgroundImage})`;
    }
  }, []);

  return (
    <>
      <TopNavbar />
      <div style={{ paddingTop: "100px" }}> {/* Add padding to account for fixed navbar */}
        <div className="cont">
          <div className="form sign-in">
            <h2>Welcome Back</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSignIn}>
              <label>
                <span>Username</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </label>
              <label>
                <span>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </label>
              <p className="forgot-pass">Forgot password?</p>
              <button type="submit" className="submit" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Wrap toggle button in a container */}
          <div className="toggle-container">
            <button className="mobile-toggle" onClick={toggleForm}>
              Switch to {document.querySelector('.cont')?.classList.contains('s--signup') ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          <div className="sub-cont">
            <div className="img">
              <div className="img__text m--up">
                <h3>Don't have an account? Please Sign up!</h3>
              </div>
              <div className="img__text m--in">
                <h3>If you already have an account, just sign in.</h3>
              </div>
              <div className="img__btn">
                <span className="m--up">Sign Up</span>
                <span className="m--in">Sign In</span>
              </div>
            </div>

            <div className="form sign-up">
              <h2>Create your Account</h2>
              <form onSubmit={handleSignUp}>
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </label>
                <label>
                  <span>Password</span>
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </label>
                <button type="submit" className="submit">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;