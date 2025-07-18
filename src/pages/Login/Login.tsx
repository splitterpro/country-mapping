import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validatePassword } from '../../utils/validation';
import '../../styles/login.scss';
import loginPageImage from '../../assests/images/loginPageImage.png';

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ username: '', password: '', keepSignedIn: false});
  
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string[];
    general?: string;
  }>({});
  
  const [touched, setTouched] = useState({
    username: false,
    password: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    // Password validation
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      navigate('/home');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="form-wrapper">
          <h2>Sign In</h2>
          <p>
            New user? <a href="/signup">Create an account</a>
          </p>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username or email"
              value={formData.username}
              onChange={handleInputChange}
              onBlur={() => handleBlur('username')}
              className={touched.username && errors.username ? 'error' : ''}
            />
            {touched.username && errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={() => handleBlur('password')}
              className={touched.password && errors.password ? 'error' : ''}
            />
            {touched.password && errors.password && (
              <div className="error-messages">
                {errors.password.map((error, index) => (
                  <div key={index} className="error-message">{error}</div>
                ))}
              </div>
            )}
            
            <div className="keep-signed-in">
              <input
                type="checkbox"
                id="keepSignedIn"
                name="keepSignedIn"
                checked={formData.keepSignedIn}
                onChange={handleInputChange}
              />
              <label htmlFor="keepSignedIn">Keep me signed in</label>
            </div>
            
            <button type="submit" className="signin-btn">Sign In</button>
          </form>

          <div className="divider">Or Sign In With</div>

          <div className="social-icons">
            <button type="button"><i className="fab fa-google"></i></button>
            <button type="button"><i className="fab fa-facebook-f"></i></button>
            <button type="button"><i className="fab fa-linkedin-in"></i></button>
            <button type="button"><i className="fab fa-twitter"></i></button>
          </div>
        </div>

        <div className="illustration-wrapper">
          <img src={loginPageImage} alt="Walking illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
