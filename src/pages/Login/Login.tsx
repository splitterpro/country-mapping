import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
//bootstrap
import { Form, Button } from 'react-bootstrap';
//icons
import { FiEye, FiEyeOff } from 'react-icons/fi';
//img
import loginPageImage from '../../assests/images/loginPageImage.png';
//style
import '../../styles/login.scss';

type LoginFormInputs = {
  username: string;
  password: string;
  keepSignedIn: boolean;
};

const Login = () => {
  
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<LoginFormInputs>();

  const passwordValue = watch('password');

  const onSubmit = (data: LoginFormInputs) => {
    navigate('/home');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="form-wrapper">
          <h2>Sign In</h2>
          <p>New user? <a href="/signup">Create an account</a></p>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formUsername">
              <Form.Control
                type="text"
                placeholder="Username or email"
                isInvalid={!!errors.username}
                className={errors.username ? 'error' : ''}
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && (
                <div className="error-message">{errors.username.message}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3 password-group">
              <div className="password-input-wrapper">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  isInvalid={!!errors.password}
                  className={errors.password ? 'error' : ''}
                  {...register('password', {
                    required: 'Password is required',
                    validate: (value) => {
                      const errs: string[] = [];
                      if (value.length < 8) errs.push('Min 8 characters');
                      if (!/[A-Z]/.test(value)) errs.push('1 capital letter');
                      if (!/\d/.test(value)) errs.push('1 number');
                      if (!/[^A-Za-z0-9]/.test(value)) errs.push('1 special character');
                      return errs.length ? errs.join(', ') : true;
                    }
                  })}
                />
                {passwordValue && (
                  <span
                    className={`password-toggle-icon${errors.password ? ' error' : ''}`}
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={0}
                    role="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                )}
              </div>
              {errors.password && (
                <div className="error-message">{errors.password.message as string}</div>
              )}
            </Form.Group>

            <Form.Group controlId="formKeepSignedIn" className="mt-3 keep-signed-in">
              <Form.Check
                type="checkbox"
                label="Keep me signed in"
                {...register('keepSignedIn')}
              />
            </Form.Group>

            <Button type="submit" className="signin-btn mt-3" variant="primary">
              Sign In
            </Button>
          </Form>

          <div className="divider mt-4">Or Sign In With</div>
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

export default memo(Login);