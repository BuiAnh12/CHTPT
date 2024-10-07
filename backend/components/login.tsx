import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../util/firebase";

function Login({ loginStage, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(loginStage);

  useEffect(() => {
    setIsLoggedIn(loginStage);
  }, [loginStage]);

  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      if (onLoginSuccess) {
        onLoginSuccess(result);
      }
      console.log(result);
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        {isLoggedIn ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">Welcome back!</h2>
            <p className="mt-4 text-gray-600">You are already logged in.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to your account</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-colors"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
