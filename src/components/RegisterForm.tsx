'use client';

import { useState, useEffect } from 'react';
import {
  auth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from '../../lib/firebaseClient';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('seller');
  const [message, setMessage] = useState('');

  const actionCodeSettings = {
    url: typeof window !== 'undefined' ? `${window.location.origin}/verify` : '',
    handleCodeInApp: true,
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const url = window.location.href;
    if (isSignInWithEmailLink(auth, url)) {
      const storedEmail = window.localStorage.getItem('emailForSignIn');

      if (!storedEmail) {
        setMessage('No email found. Please register again.');
        return;
      }

      signInWithEmailLink(auth, storedEmail, url)
        .then((result) => {
          const savedRole = window.localStorage.getItem('userRole');
          alert(`Signed in as ${result.user.email} with role: ${savedRole}`);
          window.localStorage.removeItem('emailForSignIn');
          window.localStorage.removeItem('userRole');
        })
        .catch((error) => {
          console.error('Sign-in error:', error);
          setMessage(`Error signing in: ${error.message}`);
        });
    }
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      window.localStorage.setItem('userRole', role);
      setMessage(`Verification link sent to ${email}. Check your inbox or spam folder.`);
    } catch (error: any) {
      console.error('Send link error:', error);
      setMessage(`Error sending link: ${error.message}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border p-2 w-full"
        />
        <select
        className="bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full"
      >
        <option value="seller">🛒 Seller</option>
        <option value="buyer">🛍️ Buyer</option>
        <option value="contractor">🚚 Driver</option>
      </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Send Sign-In Link
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
