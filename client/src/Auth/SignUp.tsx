import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from './AuthContext';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg('Please fill in all required fields');
      return;
    }
    const newUser = {
      _id: Date.now().toString(),
      username,
      password,
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      role: 'USER',
      loginId: '',
      lastActivity: '',
      totalActivity: '',
    };
    const success = await auth.signUp(newUser);
    if (success) {
      navigate('/feed');
    } else {
      setErrorMsg('Sign up failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Sign Up</h1>
      <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        {/* Add other input fields for email, firstName, etc. */}
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
          Sign Up
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-os-darkblue text-white rounded"
          onClick={() => navigate('/signin')}
        >
          Already have an account? Sign In
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

export default SignUp;
