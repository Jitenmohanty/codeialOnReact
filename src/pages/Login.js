import { useState } from 'react';
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../styles/login.module.css';
import { login } from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const { notifications, clear, markAllAsRead, markAsRead } = useNotificationCenter();
  const showToast = () => {

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      return toast.error('Please enter both email and password', {
      });
    }

    const response = await login(email, password);

    if (response.success) {
     return toast.success('Successfully logged in', {
      });
    } else {
      return toast.error("Wrong user and password", {
        
      });
      setLoggingIn(false);
      
    };
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn} onClick={showToast}>
          {loggingIn ? 'Logging in...' : 'Log In'}
        </button>
      </div>
      <ToastContainer />
    </form>

  );
};

export default Login;
