import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from './AuthContext';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await auth.signIn(username, password);
    if (success) {
      navigate('/feed');
    } else {
      setErrorMsg('Invalid username or password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Sign In</h1>
      <form onSubmit={handleSignIn} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <button
          type="submit"
          className="px-4 py-2 bg-os-blue text-white rounded"
        >
          Sign In
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-os-darkblue text-white rounded"
          onClick={() => navigate('/signup')}
        >
          Don't have an account? Sign Up!
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-os-yellow text-white rounded"
          onClick={() => navigate('/')}
        >
          Back to Home Screen
        </button>
      </form>
    </div>
  );
};

export default SignIn;
